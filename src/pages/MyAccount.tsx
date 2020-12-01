import React from 'react';
import {List} from '@ant-design/react-native';

const Item = List.Item;

const MyAccount: React.FC = () => (
  <List renderHeader={'basic'}>
    <Item data-seed="logId">
      标题文字点击无反馈，文字超长则隐藏，文字超长则隐藏
    </Item>
  </List>
);

export default MyAccount;
