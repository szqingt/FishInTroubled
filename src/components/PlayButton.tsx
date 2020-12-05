import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Animated,
  Easing,
  View,
  ImageBackground,
} from 'react-native';
import Touchable from './Touchable';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import Icon from '@assets/iconfont';
import {useSelector} from 'react-redux';
import LOGO from '@assets/images/logo.png';

interface IProps {
  onPress: () => void;
}

const PlayButton: React.FC<IProps> = ({onPress}) => {
  const [anim] = useState(new Animated.Value(0));
  const [spin, setSpin] = useState<Animated.CompositeAnimation>();
  const {isPlaying, playState, percent, album} = useSelector(
    (state) => state.palyInfo,
  );

  const rotate = anim.interpolate({
    inputRange: [0, 1], //输入值
    outputRange: ['0deg', '360deg'], //输出值
  });

  useEffect(() => {
    setSpin(
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
  }, []);

  useEffect(() => {
    if (playState === 'playing') {
      spin?.start();
    }
    if (playState === 'paused') {
      spin?.stop();
    }
  }, [playState]);
  return (
    <Touchable style={styles.touchableView} onPress={onPress}>
      <AnimatedCircularProgress
        size={40}
        width={2}
        fill={percent}
        rotation={0}
        lineCap="round"
        tintColor="#f86442"
        backgroundColor="#ededed">
        {() => (
          <>
            <Animated.View
              style={{
                transform: [{rotate}],
              }}>
              <ImageBackground
                source={
                  album?.title_file_url ? {uri: album?.title_file_url} : LOGO
                }
                style={styles.image}>
                <View style={styles.pauseImage}>
                  {isPlaying ? (
                    <Icon name="icon-Play" color="#f86442" size={20} />
                  ) : (
                    <Icon name="icon-Pause" color="#f86442" size={20} />
                  )}
                </View>
              </ImageBackground>
            </Animated.View>
          </>
        )}
      </AnimatedCircularProgress>
    </Touchable>
  );
};

const styles = StyleSheet.create({
  touchableView: {
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 42,
    height: 42,
  },
  pauseImage: {
    // width: 42,
    // height: 42,
    position: 'absolute',
    top: 10,
    left: 10,
  },
});

export default PlayButton;
