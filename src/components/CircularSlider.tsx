import React, { Component } from 'react';
import { PanResponder, StyleSheet, View } from 'react-native';
import Svg, {
  Circle,
  Defs,
  G,
  LinearGradient,
  Linecap,
  Path,
  Stop,
  Text
} from 'react-native-svg';

export interface Props {
  value?: number;
  dialRadius?: number;
  btnRadius?: number;
  startCoord?: number;
  startGradient?: string;
  endGradient?: string;
  dialWidth?: number;
  cap?: Linecap;
  dialBgWidth?: number;
  backgroundColor?: string;
  textSize?: number;
  textFont?: string;
  textColor?: string;
  showValue?: boolean;
  btnFill?: string;
  maxAngle?: number;
  rotationOffset?: number;
  labelString?: string;
  disabled?: boolean;
  onValueChange? (angle: number, maxAngle: number): void;
  onRelease? (): void;
}

interface State {
  angle: number;
  xCenter: number;
  yCenter: number;
}

export default class CircularSlider extends Component<Props, State> {
  static defaultProps = {
    btnRadius: 10,
    dialRadius: 80,
    dialWidth: 20,
    textColor: 'white',
    textSize: 30,
    value: 0,
    showValue: true,
    startGradient: '#12D8FA',
    endGradient: '#12D8FA',
    backgroundColor: 'white',
    startCoord: 0,
    cap: 'butt',
    btnFill: 'transparent',
    dialBgWidth: 20,
    maxAngle: 360,
    rotationOffset: 0,
    disabled: false,
    onValueChange: () => { /* */ },
    onRelease: () => { /* */ }
  };

  _panResponder: any;
  circleSlider: any;
  container: any;

  yOrigin: number;
  initialAngle: number;

  constructor (props: any) {
    super(props);

    const {
      value,
      dialRadius,
      btnRadius,
      rotationOffset,
      maxAngle
    } = props;
    this.state = {
      angle: value,
      xCenter: 0,
      yCenter: 0
    };

    this.yOrigin = 0;
    this.initialAngle = 0;

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gs) => true,
      onStartShouldSetPanResponderCapture: (e, gs) => true,
      onMoveShouldSetPanResponder: (e, gs) => true,
      onMoveShouldSetPanResponderCapture: (e, gs) => true,
      onPanResponderGrant: (e, gs) => {
        this.yOrigin = gs.dy;
        this.initialAngle = this.state.angle;
      },
      onPanResponderMove: (e, gs) => {
        if (!this.props.disabled) {
          const multiplier = Math.min(100, Math.abs(gs.dy)) / 100;
          const upperRange = maxAngle - this.initialAngle;
          let angle = 0;
          if (gs.dy < this.yOrigin) {
            angle = this.initialAngle + (upperRange * multiplier);
          } else {
            angle = this.initialAngle * (1 - multiplier);
          }
          this.setState({ angle });
          this.props.onValueChange!(angle, this.props.maxAngle!);
        }
      },
      onPanResponderTerminationRequest: (e, gs) => true,
      onPanResponderRelease: (e, gs) => this.props.onRelease && this.props.onRelease(),
      onPanResponderTerminate: (e, gs) => this.props.onRelease && this.props.onRelease()
    });
  }

  polarToCartesian (angle: number) {
    let r = this.props.dialRadius!;
    let hC = this.props.dialRadius! + this.props.btnRadius!;
    let a = ((angle - 90) * Math.PI) / 180.0;

    let x = hC + r * Math.cos(a);
    let y = hC + r * Math.sin(a);
    return { x, y };
  }

  cartesianToPolar (x: number, y: number) {
    let hC = this.props.dialRadius! + this.props.btnRadius!;
    if (x === 0) {
      return y > hC ? 0 : 180;
    } else if (y === 0) {
      return x > hC ? 90 : 270;
    } else {
      return (
        Math.round((Math.atan((y - hC) / (x - hC)) * 180) / Math.PI) +
        (x >= hC ? 90 : 270)
      );
    }
  }

  handleMeasure = (ox: number, oy: number, width: number, height: number, px: number, py: number) => {
    this.setState({
      xCenter: px,
      yCenter: py
    });
  }

  handleOnLayout = () => {
    this.circleSlider.measure(this.handleMeasure);
  }

  render () {
    let {
      btnRadius,
      dialRadius,
      dialWidth,
      rotationOffset,
      textFont,
      textSize,
      startGradient,
      endGradient,
      textColor,
      backgroundColor,
      cap,
      btnFill
    } = this.props;
    let width = (dialRadius! + btnRadius!) * 2;
    let startCoord = this.polarToCartesian(this.props.startCoord ? this.props.startCoord : 0);
    let endCoord = this.polarToCartesian(this.state.angle);
    let maxAngle = this.polarToCartesian(this.props.maxAngle!);
    const maxAngleY = maxAngle.y.toPrecision(4);
    return (
      <View
        ref={r => this.container = r }
        style={{ alignItems: 'center', overflow: 'hidden' }}
        {...this._panResponder.panHandlers}
      >
        <Svg
          onLayout={this.handleOnLayout}
          ref={r => this.circleSlider = r}
          width={width}
          height={width}
        >
          <Defs>
            <LinearGradient id='gradient1' x1='0%' y1='0%' x2='100%' y2='0%'>
              <Stop offset='0%' stopColor={startGradient} />
              <Stop offset='100%' stopColor={endGradient} />
            </LinearGradient>
          </Defs>
          <Text
            x={width / 2}
            y={width / 2 + 6}
            fontSize={textSize}
            fontFamily={textFont ? textFont : ''}
            fill={textColor}
            textAnchor='middle'
          >
            {this.props.showValue &&
              this.props.labelString ? this.props.labelString : ''}
          </Text>
          <G transform={`rotate(${rotationOffset} ${width / 2} ${width / 2})`}>
            <Path
              stroke={backgroundColor}
              strokeWidth={dialWidth}
              fill='none'
              strokeLinecap={cap}
              strokeLinejoin='round'
              d={`M ${startCoord.x} ${startCoord.y} A ${dialRadius} ${dialRadius} 0 ${
                  (this.props.startCoord! + 180) % 360 > this.props.maxAngle! ? 0 : 1
                } 1 ${maxAngle.x} ${maxAngleY}`}
            />
            <Path
              stroke={'url(#gradient1)'}
              strokeWidth={dialWidth}
              fill='none'
              strokeLinecap={cap}
              strokeLinejoin='round'
              d={`M ${startCoord.x} ${startCoord.y} A ${dialRadius} ${dialRadius} 0 ${
                (this.props.startCoord! + 180) % 360 > this.state.angle ? 0 : 1
              } 1 ${endCoord.x} ${endCoord.y}`}
            />
            <G x={endCoord.x - btnRadius!} y={endCoord.y - btnRadius!}>
              <Circle
                r={btnRadius}
                cx={btnRadius}
                cy={btnRadius}
                fill={btnFill}
              />
            </G>
          </G>
        </Svg>
      </View>
    );
  }
}
