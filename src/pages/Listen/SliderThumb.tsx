import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {getTimeString} from '@utils/index';
import {useSelector} from 'react-redux';
// 播放条自定义Thumb

const SliderThumb: React.FC = () => {
  const {playSeconds, soundDuration} = useSelector((state) => state.palyInfo);
  const currentTimeString = getTimeString(playSeconds);
  const durationString = getTimeString(soundDuration);
  return (
    <View style={styles.thumb}>
      <Text style={{fontSize: 10}}>
        {currentTimeString}/{durationString}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  thumb: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    paddingHorizontal: 2,
    backgroundColor: 'white',
  },
});

export default SliderThumb;
