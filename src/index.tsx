import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import Navigator from './config/routes';

interface Props {}

interface State {}

export default class DialTest extends Component<Props, State> {

  constructor (props: any) {
    super(props);
  }

  render () {
    return (
      <Navigator />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0A0A0A'
  },
  titleContainer: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#EFEFEF'
  }
});
