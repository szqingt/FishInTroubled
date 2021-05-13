import React from 'react';
import {StyleSheet, Animated, Easing, View, Platform} from 'react-native';
import {Toast} from '@ant-design/react-native';
import Icon from '@assets/iconfont';
import {Slider} from '@miblanchard/react-native-slider';
import SliderThumb from './SliderThumb';
import {useDispatch, useSelector} from 'react-redux';
import Touchable from '@components/Touchable';
import {
  play,
  PlayInfoAction,
  pause,
  setPlayTime,
  SET_PLAYSECCONDS,
  stopPlayTimer,
} from '@store/playInfo';
import {Dispatch} from 'redux';

/**
 * 循环加载动画
 */

const LoopView: React.FC = ({children}) => {
  const anim = new Animated.Value(0);
  const spin: Animated.CompositeAnimation = Animated.loop(
    Animated.timing(anim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }),
    {iterations: -1},
  );
  const rotate = anim.interpolate({
    inputRange: [0, 1], //输入值
    outputRange: ['0deg', '360deg'], //输出值
  });

  spin.start();

  return (
    <Animated.View
      style={{
        transform: [{rotate}],
      }}>
      {children}
    </Animated.View>
  );
};
/**
 * 播放条
 */

const PlayBar: React.FC = () => {
  const {playState, playSeconds, program, soundDuration} = useSelector(
    (state) => state.palyInfo,
  );
  const dispatch = useDispatch<Dispatch<PlayInfoAction>>();

  const onSliderEditStart = () => {
    stopPlayTimer();
  };
  const onSliderEditing = (value: [number, number]) => {
    dispatch({
      type: SET_PLAYSECCONDS,
      sec: value[0],
    });
  };

  const onSliderEditEnd = (value: [number, number]) => {
    const [sec] = value;
    if (program) {
      setPlayTime(sec, dispatch);
    }
  };

  const playHandler = () => {
    if (program) {
      play(dispatch);
    } else {
      Toast.fail('请从专辑页面选择要播放的节目！', 2);
    }
  };
  const pauseHandler = () => {
    pause(dispatch);
  };

  return (
    <View>
      <View style={styles.container}>
        <Slider
          onSlidingStart={onSliderEditStart}
          onValueChange={onSliderEditing}
          onSlidingComplete={onSliderEditEnd}
          value={playSeconds}
          maximumValue={soundDuration}
          maximumTrackTintColor="rgba(255, 255, 255, 0.3)"
          minimumTrackTintColor="white"
          thumbTintColor="white"
          renderThumbComponent={() => <SliderThumb />}
          containerStyle={styles.slider}
        />
      </View>
      <View style={styles.control}>
        {playState === 'loading' && (
          <LoopView>
            <Icon name="icon-Loading" size={40} />
          </LoopView>
        )}
        {playState === 'playing' && (
          <Touchable onPress={pauseHandler} style={styles.button}>
            <Icon name="icon-Pause" size={50} />
          </Touchable>
        )}
        {(playState === 'paused' ||
          playState === 'finish' ||
          playState === 'none') && (
          <Touchable onPress={playHandler} style={styles.button}>
            <Icon name="icon-Play" size={50} />
          </Touchable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    marginHorizontal: 15,
    flexDirection: 'row',
  },
  control: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
    marginHorizontal: 60,
  },
  slider: {
    flex: 1,
    alignSelf: 'center',
    marginHorizontal: Platform.select({ios: 5}),
  },
  button: {
    marginHorizontal: 10,
  },
});

export default PlayBar;
