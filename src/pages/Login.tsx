import {Button, InputItem, List, Toast} from '@ant-design/react-native';
import {IMAYU_VERSION} from '@config/consts';
import React, {useState} from 'react';
import {StyleSheet, ScrollView, Text, Keyboard} from 'react-native';
import ButtonStyle from '@ant-design/react-native/lib/button/style';
import {useDispatch} from 'react-redux';
import md5 from 'js-md5';
import {login} from '@store/user';
/**
 * 登录page
 */

console.log(md5);
const Login: React.FC = () => {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    Keyboard.dismiss();
    try {
      await login({
        account,
        passwordMd5: md5.hex(password),
        isWeb: 1,
        version: IMAYU_VERSION,
      })(dispatch);
    } catch (error) {
      const {data} = error;
      Toast.fail(data.message || '登录错误!');
    }
  };
  return (
    <ScrollView keyboardShouldPersistTaps="handled" style={styles.container}>
      <Text style={styles.logo}>浑水摸鱼</Text>

      <List style={styles.inputContainer}>
        <InputItem
          clear
          value={account}
          onChange={(value) => setAccount(value)}
          placeholder="account">
          账号
        </InputItem>
        <InputItem
          clear
          type="password"
          value={password}
          onChange={(value) => setPassword(value)}
          placeholder="passowrd">
          密码
        </InputItem>
      </List>
      <Button onPress={handleSubmit} style={styles.btn} styles={btnStyles}>
        登录
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    paddingBottom: 200,
  },
  logo: {
    color: '#ff4000',
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
    marginTop: 40,
  },
  inputContainer: {
    marginVertical: 10,
  },
  vCode: {
    marginLeft: 5,
    width: 70,
    height: 30,
  },
  btn: {
    backgroundColor: '#ff4000',
  },
});

// convert default btn styles
const btnStyles = StyleSheet.create({
  ...ButtonStyle,
  defaultRawText: {
    color: '#fff',
  },
});

export default Login;
