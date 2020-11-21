import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Listen from '@pages/Listen';
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
import HomeTabs from './HomeTabs';
type BottomTabParmList = {
  HomeTabs: undefined;
  Listen: undefined;
  MyAccount: undefined;
};
type BottomTabsRouteProp = RouteProp<RootStackParmList, 'BottomTabs'>;

const {Navigator, Screen} = createBottomTabNavigator<BottomTabParmList>();

const getTitleName = (route: BottomTabsRouteProp): string => {
  const routeName = getFocusedRouteNameFromRoute(route) || 'HomeTabs';
  switch (routeName) {
    case 'HomeTabs':
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
    StackNavigationProp<RootStackParmList, 'BottomTabs'>
  >();
  const route = useRoute<BottomTabsRouteProp>();

  React.useLayoutEffect(() => {
    navigation.setOptions({headerTitle: getTitleName(route)});
  }, [navigation, route]);

  return (
    <Navigator
      tabBarOptions={{
        activeTintColor: '#f86442',
      }}>
      <Screen
        name="HomeTabs"
        component={HomeTabs}
        options={{
          tabBarLabel: '首页',
          tabBarIcon: ({color, size}) => (
            <Icon name="icon-Home" size={size} color={color} />
          ),
        }}
      />
      <Screen
        name="Listen"
        component={Listen}
        options={{
          tabBarLabel: '听',
        }}
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
