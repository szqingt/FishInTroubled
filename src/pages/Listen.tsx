import {RouteProp, useRoute} from '@react-navigation/native';
import {MainStackParmList} from 'navigator/MainStack';
import React, { useEffect } from 'react';
import {View, Text} from 'react-native';

const Listen: React.FC = () => {
  const route = useRoute<RouteProp<MainStackParmList, 'Listen'>>();
  const id = route.params.id;
  useEffect(() => {
    console.log('id change');
  }, [id]);
  return (
    <View>
      <Text>{id}</Text>
    </View>
  );
};

export default Listen;
