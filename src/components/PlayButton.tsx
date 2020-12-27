import React, {useEffect, useState} from 'react';
import {StyleSheet, Animated, Easing, View, Image} from 'react-native';
import Touchable from './Touchable';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import Icon from '@assets/iconfont';
import {useSelector} from 'react-redux';
import LOGO from '@assets/images/logo.png';

interface IProps {
  onPress: () => void;
}

interface ProgressProps {
  percent: number;
}

const ProgressBar: React.FC<ProgressProps> = ({percent, children}) => (
  <AnimatedCircularProgress
    size={40}
    width={2}
    rotation={0}
    fill={percent}
    tintColor="#f86442"
    backgroundColor="#ededed">
    {() => <>{children}</>}
  </AnimatedCircularProgress>
);

const PlayButton: React.FC<IProps> = ({onPress}) => {
  const [anim] = useState(new Animated.Value(0));
  const [spin] = useState<Animated.CompositeAnimation>(
    Animated.loop(
      Animated.timing(anim, {
        toValue: 1,
        duration: 10000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      {iterations: -1},
    ),
  );
  const {playState, percent, album} = useSelector((state) => state.palyInfo);

  const rotate = anim.interpolate({
    inputRange: [0, 1], //输入值
    outputRange: ['0deg', '360deg'], //输出值
  });

  useEffect(() => {
    if (playState === 'playing') {
      spin.start();
    }
    if (playState === 'paused') {
      spin.stop();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playState]);
  return (
    <Touchable style={styles.touchableView} onPress={onPress}>
      <ProgressBar percent={percent}>
        <Animated.View
          style={{
            transform: [{rotate}],
          }}>
          <Image
            source={album?.title_file_url ? {uri: album?.title_file_url} : LOGO}
            style={styles.image}
          />
        </Animated.View>
        <View style={styles.ctrlIcon}>
          {playState === 'playing' ? (
            <Icon name="icon-Pause" color="#f86442" size={20} />
          ) : (
            <Icon name="icon-Play" color="#f86442" size={20} />
          )}
        </View>
      </ProgressBar>
    </Touchable>
  );
};

const styles = StyleSheet.create({
  touchableView: {
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  image: {
    width: 42,
    height: 42,
  },
  ctrlIcon: {
    position: 'absolute',
  },
});

export default PlayButton;
