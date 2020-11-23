import React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {viewportWidth, viewportHeight} from '@utils/index';
import {useSelector} from 'react-redux';

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    width: viewportWidth,
    height: viewportHeight,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
});

const Loading: React.FC = () => {
  const loadingState = useSelector((store) => store.loading);
  return loadingState.status ? (
    <ActivityIndicator
      animating={loadingState.status}
      size="large"
      color="#0000ff"
      style={styles.loading}
    />
  ) : null;
};

export default Loading;
