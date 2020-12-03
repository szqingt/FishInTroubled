import React from 'react';
import {View, Text} from 'react-native';
import {useRoute, RouteProp} from '@react-navigation/native';
import {MainStackParmList} from 'navigator/MainStack';

const Detail: React.FC = () => {
  const route = useRoute<RouteProp<MainStackParmList, 'Detail'>>();

  return (
    <View>
      <Text>Detail {route.params.id}</Text>
    </View>
  );
};

export default Detail;
