import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Empty: React.FC = () => (
  <View style={styles.container}>
    <Text style={styles.text}>暂无数据！</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    margin: 10,
    alignItems: 'center',
  },
  text: {
    color: '#eee',
  },
});

export default Empty;
