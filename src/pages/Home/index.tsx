import React, {useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import Carousel from './Carousel';
import {getCarousel} from './store/action';
import {useDispatch, useSelector} from 'react-redux';
import {getAllCookie} from '@utils/cookie';

const Home: React.FC = () => {
  const home = useSelector((store) => store.home);
  const dispatch = useDispatch();
  useEffect(() => {
    getCarousel({aclassify_id: 3, page: 1, keyword: ''})(dispatch);
  }, [dispatch]);
  return (
    <View>
      <Text>Home</Text>
      <Button
        title="loading"
        onPress={() => {
          getAllCookie();
        }}
      />
      <Carousel data={home.carouselList} />
    </View>
  );
};

export default Home;
