import React, {useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {RootStackParmList} from 'navigator';
import {StackNavigationProp} from '@react-navigation/stack';
import Carousel from './Carousel';
import {search} from './store/action';
import {useDispatch, useSelector} from 'react-redux';

const Home: React.FC = () => {
  const navigation = useNavigation<
    StackNavigationProp<RootStackParmList, 'Detail'>
  >();
  const home = useSelector((store) => store.home);
  const dispatch = useDispatch();
  useEffect(() => {
    search({aclassify_id: 3, page: 1, keyword: ''})(dispatch);
  }, [dispatch]);
  return (
    <View>
      <Text>Home</Text>
      <Button
        title="跳转详情"
        onPress={() => {
          navigation.navigate('Detail', {
            id: 233,
          });
        }}
      />
      <Carousel data={home.carouselList} />
    </View>
  );
};

export default Home;
