import React from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import PlayButton from '@components/PlayButton';
import {navigate, viewportWidth} from '@utils/index';

const viewWidth = 50;

interface IProps {
  activeScreenName: string;
}

/**
 * 播放按钮外套
 */

const PlayButtonView: React.FC<IProps> = ({activeScreenName}) => {
  const onPress = () => {
    navigate('MainStackParmList', {screen: 'Listen'});
  };
  if (['Home', 'Listen', 'Account', 'Login'].includes(activeScreenName)) {
    return null;
  }
  return (
    <View style={styles.container}>
      <PlayButton onPress={onPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: viewWidth,
    height: viewWidth + 20,
    position: 'absolute',
    bottom: 0,
    left: (viewportWidth - viewWidth) / 2,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: 'center',
    padding: 4,
    ...Platform.select({
      android: {
        elevation: 4,
      },
      ios: {
        shadowColor: 'rgba(0, 0, 0, 0.3)',
        shadowOpacity: 0.85,
        shadowRadius: 5,
        shadowOffset: {
          width: StyleSheet.hairlineWidth,
          height: StyleSheet.hairlineWidth,
        },
      },
    }),
  },
});

export default PlayButtonView;
