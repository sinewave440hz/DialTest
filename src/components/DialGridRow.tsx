import React from 'react';
import { Dimensions, View } from 'react-native';
import CircularSlider, { Props as CircularSliderProps } from './CircularSlider';

export interface DialProps {
  circularSliderProps?: CircularSliderProps;
  onValueChange (angle: number, maxAngle: number): void;
}

interface Props {
  dialPropsList: DialProps[];
}

const DialGridRow: React.SFC<Props> = (props) => {
  const listItems = props.dialPropsList.map(
    (listProps: DialProps, index: number) =>
      <CircularSlider
        key={index}
        rotationOffset={-135}
        maxAngle={270}
        onValueChange={ listProps.onValueChange }
        btnFill={'transparent'}
        textColor={'white'}
        backgroundColor={'gray'}
        cap={'butt'}
        dialRadius={Dimensions.get('window').width / 12}
        dialWidth={Dimensions.get('window').width / 24}
        dialBgWidth={Dimensions.get('window').width / 24}
        startGradient={'cyan'}
        endGradient={'cyan'}
        textSize={20}
        { ...listProps.circularSliderProps }
      />
  );
  return <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly' }}>
    { listItems }
  </View>;
};

export default DialGridRow;
