import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MyAccount from '@pages/MyAccount';
import Icon from '@assets/iconfont';
import {
  RouteProp,
  useNavigation,
  useRoute,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import {RootStackParmList} from 'navigator';
import {StackNavigationProp} from '@react-navigation/stack';
import Home from '@pages/Home';
import {MainStackParmList} from './MainStack';
import PlayButton from '@components/PlayButton';
type BottomTabParmList = {
  Home: undefined;
  Listen: undefined;
  MyAccount: undefined;
};
type BottomTabsRouteProp = RouteProp<RootStackParmList, 'MainStackParmList'>;

const {Navigator, Screen} = createBottomTabNavigator<BottomTabParmList>();

const getTitleName = (route: BottomTabsRouteProp): string => {
  const routeName = getFocusedRouteNameFromRoute(route) || 'Home';
  switch (routeName) {
    case 'Home':
      return '首页';
    case 'Listen':
      return '我听';
    case 'MyAccount':
      return '账户';
    default:
      return '首页';
  }
};

const BottomTabs: React.FC = () => {
  const navigation = useNavigation<
    StackNavigationProp<MainStackParmList, 'BottomTabs'>
  >();
  const route = useRoute<BottomTabsRouteProp>();

  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route) || 'Home';
    if (routeName === 'Home') {
      navigation.setOptions({headerTitle: '', headerTransparent: true});
    } else {
      navigation.setOptions({
        headerTitle: getTitleName(route),
        headerTransparent: false,
      });
    }
  }, [navigation, route]);

  return (
    <Navigator
      tabBarOptions={{
        activeTintColor: '#f86442',
      }}>
      <Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: '首页',
          tabBarIcon: ({color, size}) => (
            <Icon name="icon-Home" size={size} color={color} />
          ),
        }}
      />
      <Screen
        name="Listen"
        component={PlayButton}
        options={() => ({
          tabBarButton: () => {
            console.log('bootom tabs');
            return (
              <PlayButton
                onPress={() => navigation.navigate('Listen', {id: undefined})}
              />
            );
          },
        })}
      />
      <Screen
        name="MyAccount"
        component={MyAccount}
        options={{
          tabBarLabel: '我的',
          tabBarIcon: ({color, size}) => (
            <Icon name="icon-Profile" size={size} color={color} />
          ),
        }}
      />
    </Navigator>
  );
};

export default BottomTabs;
