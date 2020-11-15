import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParmList } from 'navigator';
import { StackNavigationProp } from '@react-navigation/stack';
import Carousel from './Carousel';

const Home: React.FC = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParmList, 'Detail'>>();
    return (
        <View>
            <Text>
                Home
            </Text>
            <Button title="跳转详情" onPress={()=> {
                navigation.navigate('Detail', {
                    id: 233,
                })
            }}></Button>
            <Carousel></Carousel>
        </View>
    )
}

export default Home