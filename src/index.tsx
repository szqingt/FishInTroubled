import { Fragment } from 'react';
import { StatusBar } from 'react-native';
import React from 'react';
import StackNavigator from './navigator';

export default () => (
    <>
        <StackNavigator></StackNavigator>
        <StatusBar backgroundColor='transparent' barStyle='dark-content' translucent></StatusBar>
    </>
)