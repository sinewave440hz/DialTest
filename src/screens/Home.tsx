import React, { Component } from 'react';
import {
  Dimensions,
  StatusBar,
  TextStyle,
  View
} from 'react-native';

import {
  DialGrid
} from '../components';

const DIAL_GRID_PARAM_1_1 = 'dialGridParam1_1';
const DIAL_GRID_PARAM_2_1 = 'dialGridParam2_1';
const DIAL_GRID_PARAM_3_1 = 'dialGridParam3_1';
const DIAL_GRID_PARAM_4_1 = 'dialGridParam4_1';
const DIAL_GRID_PARAM_1_2 = 'dialGridParam1_2';
const DIAL_GRID_PARAM_2_2 = 'dialGridParam2_2';
const DIAL_GRID_PARAM_3_2 = 'dialGridParam3_2';
const DIAL_GRID_PARAM_4_2 = 'dialGridParam4_2';
const DIAL_GRID_PARAM_1_3 = 'dialGridParam1_3';
const DIAL_GRID_PARAM_2_3 = 'dialGridParam2_3';
const DIAL_GRID_PARAM_3_3 = 'dialGridParam3_3';
const DIAL_GRID_PARAM_4_3 = 'dialGridParam4_3';
const DIAL_GRID_PARAM_1_4 = 'dialGridParam1_4';
const DIAL_GRID_PARAM_2_4 = 'dialGridParam2_4';
const DIAL_GRID_PARAM_3_4 = 'dialGridParam3_4';
const DIAL_GRID_PARAM_4_4 = 'dialGridParam4_4';
export interface HomeProps {
  navigation: any;
}

export interface HomeState {
  statusDisplay: string;
  dialGridParam1_1: string;
  dialGridParam2_1: string;
  dialGridParam3_1: string;
  dialGridParam4_1: string;
  dialGridParam1_2: string;
  dialGridParam2_2: string;
  dialGridParam3_2: string;
  dialGridParam4_2: string;
  dialGridParam1_3: string;
  dialGridParam2_3: string;
  dialGridParam3_3: string;
  dialGridParam4_3: string;
  dialGridParam1_4: string;
  dialGridParam2_4: string;
  dialGridParam3_4: string;
  dialGridParam4_4: string;
}

export default class Home extends Component<HomeProps, HomeState> {
  width: number = Dimensions.get('window').width;
  constructor (props: HomeProps) {
    super(props);

    const initToTen = this.scaleDisplayToTen(0);

    this.state = {
      statusDisplay: '_ _',
      dialGridParam1_1: initToTen,
      dialGridParam2_1: initToTen,
      dialGridParam3_1: initToTen,
      dialGridParam4_1: initToTen,
      dialGridParam1_2: initToTen,
      dialGridParam2_2: initToTen,
      dialGridParam3_2: initToTen,
      dialGridParam4_2: initToTen,
      dialGridParam1_3: initToTen,
      dialGridParam2_3: initToTen,
      dialGridParam3_3: initToTen,
      dialGridParam4_3: initToTen,
      dialGridParam1_4: initToTen,
      dialGridParam2_4: initToTen,
      dialGridParam3_4: initToTen,
      dialGridParam4_4: initToTen
    };
    StatusBar.setHidden(true);
  }

  private scaleDisplayToTen (angle: number, maxAngle: number = 360) {
    const scaleToTen = Array.from(Array(11), (_, x) => `${x}`);
    const multiplier = angle / maxAngle;
    const length = multiplier < 1 ? scaleToTen.length : scaleToTen.length - 1;
    return scaleToTen[Math.floor(multiplier * length)];
  }

  private onDialRelease () {
    console.log('onDialRelease');
  }

  private statusDisplayUpdater (func: any, angle: number, maxAngle: number, stateField: string, statusDisplayStyle?: TextStyle | TextStyle[]) {
    const value = func(angle, maxAngle);
    this.setState({
      statusDisplay: value,
      ...{ [`${stateField}`]: value }
    });
  }

  public render () {
    return (
      <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'black' }}>
        <DialGrid
          numRows={4}
          dialPropsList={[
            [
              {
                onValueChange: (angle, maxAngle) => this.statusDisplayUpdater(this.scaleDisplayToTen, angle, maxAngle, DIAL_GRID_PARAM_1_1),
                circularSliderProps: { labelString: this.state[DIAL_GRID_PARAM_1_1], onRelease: () => this.onDialRelease() }
              },
              {
                onValueChange: (angle, maxAngle) => this.statusDisplayUpdater(this.scaleDisplayToTen, angle, maxAngle, DIAL_GRID_PARAM_2_1),
                circularSliderProps: { labelString: this.state[DIAL_GRID_PARAM_2_1], onRelease: () => this.onDialRelease() }
              },
              {
                onValueChange: (angle, maxAngle) => this.statusDisplayUpdater(this.scaleDisplayToTen, angle, maxAngle, DIAL_GRID_PARAM_3_1),
                circularSliderProps: { labelString: this.state[DIAL_GRID_PARAM_3_1], onRelease: () => this.onDialRelease() }
              },
              {
                onValueChange: (angle, maxAngle) => this.statusDisplayUpdater(this.scaleDisplayToTen, angle, maxAngle, DIAL_GRID_PARAM_4_1),
                circularSliderProps: { labelString: this.state[DIAL_GRID_PARAM_4_1], onRelease: () => this.onDialRelease() }
              }
            ],
            [
              {
                onValueChange: (angle, maxAngle) => this.statusDisplayUpdater(this.scaleDisplayToTen, angle, maxAngle, DIAL_GRID_PARAM_1_2),
                circularSliderProps: { labelString: this.state[DIAL_GRID_PARAM_1_2], onRelease: () => this.onDialRelease() }
              },
              {
                onValueChange: (angle, maxAngle) => this.statusDisplayUpdater(this.scaleDisplayToTen, angle, maxAngle, DIAL_GRID_PARAM_2_2),
                circularSliderProps: { labelString: this.state[DIAL_GRID_PARAM_2_2], onRelease: () => this.onDialRelease() }
              },
              {
                onValueChange: (angle, maxAngle) => this.statusDisplayUpdater(this.scaleDisplayToTen, angle, maxAngle, DIAL_GRID_PARAM_3_2),
                circularSliderProps: { labelString: this.state[DIAL_GRID_PARAM_3_2], onRelease: () => this.onDialRelease() }
              },
              {
                onValueChange: (angle, maxAngle) => this.statusDisplayUpdater(this.scaleDisplayToTen, angle, maxAngle, DIAL_GRID_PARAM_4_2),
                circularSliderProps: { labelString: this.state[DIAL_GRID_PARAM_4_2], onRelease: () => this.onDialRelease() }
              }
            ],
            [
              {
                onValueChange: (angle, maxAngle) => this.statusDisplayUpdater(this.scaleDisplayToTen, angle, maxAngle, DIAL_GRID_PARAM_1_3),
                circularSliderProps: { labelString: this.state[DIAL_GRID_PARAM_1_3], onRelease: () => this.onDialRelease() }
              },
              {
                onValueChange: (angle, maxAngle) => this.statusDisplayUpdater(this.scaleDisplayToTen, angle, maxAngle, DIAL_GRID_PARAM_2_3),
                circularSliderProps: { labelString: this.state[DIAL_GRID_PARAM_2_3], onRelease: () => this.onDialRelease() }
              },
              {
                onValueChange: (angle, maxAngle) => this.statusDisplayUpdater(this.scaleDisplayToTen, angle, maxAngle, DIAL_GRID_PARAM_3_3),
                circularSliderProps: { labelString: this.state[DIAL_GRID_PARAM_3_3], onRelease: () => this.onDialRelease() }
              },
              {
                onValueChange: (angle, maxAngle) => this.statusDisplayUpdater(this.scaleDisplayToTen, angle, maxAngle, DIAL_GRID_PARAM_4_3),
                circularSliderProps: { labelString: this.state[DIAL_GRID_PARAM_4_3], onRelease: () => this.onDialRelease() }
              }
            ],
            [
              {
                onValueChange: (angle, maxAngle) => this.statusDisplayUpdater(this.scaleDisplayToTen, angle, maxAngle, DIAL_GRID_PARAM_1_4),
                circularSliderProps: { labelString: this.state[DIAL_GRID_PARAM_1_4], onRelease: () => this.onDialRelease() }
              },
              {
                onValueChange: (angle, maxAngle) => this.statusDisplayUpdater(this.scaleDisplayToTen, angle, maxAngle, DIAL_GRID_PARAM_2_4),
                circularSliderProps: { labelString: this.state[DIAL_GRID_PARAM_2_4], onRelease: () => this.onDialRelease() }
              },
              {
                onValueChange: (angle, maxAngle) => this.statusDisplayUpdater(this.scaleDisplayToTen, angle, maxAngle, DIAL_GRID_PARAM_3_4),
                circularSliderProps: { labelString: this.state[DIAL_GRID_PARAM_3_4], onRelease: () => this.onDialRelease() }
              },
              {
                onValueChange: (angle, maxAngle) => this.statusDisplayUpdater(this.scaleDisplayToTen, angle, maxAngle, DIAL_GRID_PARAM_4_4),
                circularSliderProps: { labelString: this.state[DIAL_GRID_PARAM_4_4], onRelease: () => this.onDialRelease() }
              }
            ]
          ]}
        />
      </View>
    );
  }
}
