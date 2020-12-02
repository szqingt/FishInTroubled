import React from 'react';
import {List, Modal, Toast} from '@ant-design/react-native';
import {useSelector} from 'react-redux';
import {Text, View} from 'react-native';
import Icon from '@assets/iconfont';
import {findPassword as fpService} from '@services/index';

const Item = List.Item;

const coin = (value: number | null | string) => (
  <View>
    <Text style={{color: '#888', alignSelf: 'flex-end', marginRight: 20}}>
      {String(value)}
    </Text>
    <Icon name="icon-Coin" size={18} style={{position: 'absolute', right: 0}} />
  </View>
);

const MyAccount: React.FC = () => {
  const {userInfo} = useSelector((store) => store.user);

  const confirm = async (account: string) => {
    await fpService({account});
    Toast.success('请到邮箱里点击重置密码链接!!!', 10);
  };

  const findPassword = () => {
    Modal.prompt(
      '找回密码',
      '确定后去下面的邮箱找回密码!',
      (val) => confirm(val),
      undefined,
      userInfo.email,
      ['请填写邮箱地址'],
    );
  };
  return (
    <>
      <List>
        <Item extra={userInfo.nickname}>昵称</Item>
        <Item extra={userInfo.staff_name}>UID号</Item>
        <Item extra={userInfo.email}>邮箱</Item>
        <Item extra={userInfo.anchor_name}>标牌</Item>
        <Item extra={userInfo.fans_lv}>等级</Item>
        <Item extra={userInfo.countryName}>所在地</Item>
        <Item extra={coin(userInfo.gold)}>现有鱼币</Item>
        <Item extra={coin(userInfo.total_gold)}>曾经鱼币</Item>
        <Item onPress={findPassword} arrow="horizontal">
          密码找回
        </Item>
      </List>
    </>
  );
};

export default MyAccount;
