import React from 'react';
import {View, Text} from 'react-native';
import {useRoute, RouteProp} from '@react-navigation/native';
import {RootStackParmList} from 'navigator';

const Detail: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParmList, 'Detail'>>();

  return (
    <View>
      <Text>Detail {route.params.id}</Text>
    </View>
  );
};

export default Detail;
