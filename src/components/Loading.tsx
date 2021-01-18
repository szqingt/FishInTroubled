import React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.4)',
    elevation: 0,
  },
});

const Loading: React.FC = () => {
  const loadingState = useSelector((store) => store.loading);
  return loadingState.status ? (
    <ActivityIndicator
      animating={loadingState.status}
      size="large"
      color="#f86442"
      style={styles.loading}
    />
  ) : null;
};

export default Loading;
