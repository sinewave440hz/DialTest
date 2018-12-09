import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import DialGridRow, { DialProps } from './DialGridRow';

interface Props {
  numRows: number;
  dialPropsList: Array<DialProps>[];
}

interface State {
}

export default class DialGrid extends Component<Props, State> {
  constructor (props: Props) {
    super(props);
  }

  render () {
    const dialGridRows = Array.from(Array(this.props.numRows)).map((_: any, index: number) => <DialGridRow key={index} dialPropsList={this.props.dialPropsList[index]} />);
    return <View style={styles.container}>
      <View style={styles.borderContainer}>
        { dialGridRows }
      </View>
    </View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    maxHeight: '58%',
    alignItems: 'center'
  },
  borderContainer: {
    flex: 1,
    width: '96%',
    backgroundColor: 'black',
    borderWidth: 1,
    borderRadius: 7,
    borderColor: 'black'
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});
