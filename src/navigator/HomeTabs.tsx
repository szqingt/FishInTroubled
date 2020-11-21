import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Home from '@pages/Home';

const {Navigator, Screen} = createMaterialTopTabNavigator();

const HomeTbas: React.FC = () => (
  <Navigator
    tabBarOptions={{
      tabStyle: {
        width: 80,
      },
      indicatorStyle: {
        height: 4,
        width: 20,
        marginLeft: 30,
        borderRadius: 2,
        backgroundColor: '#f86442',
      },
      activeTintColor: '#f86442',
      inactiveTintColor: '#333',
    }}>
    <Screen
      name="Home"
      component={Home}
      options={{
        tabBarLabel: '推荐',
      }}
    />
  </Navigator>
);

export default HomeTbas;
