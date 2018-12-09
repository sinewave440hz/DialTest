import { StatusBar } from 'react-native';
import { StackNavigator } from 'react-navigation';

import {
  Home
} from '../screens';

const HomeStack = StackNavigator(
  {
    Home: {
      screen: Home
    }
  },
  {
    headerMode: 'none'
  }
);

export default StackNavigator(
  {
    Home: {
      screen: HomeStack
    }
  },
  {
    mode: 'modal',
    cardStyle: { paddingTop: StatusBar.currentHeight },
    headerMode: 'none'
  }
);
