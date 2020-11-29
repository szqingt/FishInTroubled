import {InputItem, List, Toast} from '@ant-design/react-native';
import {CAPTACH} from '@config/api';
import {BASE_URL} from '@config/consts';
import {login} from '@services/index';
import React, {useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  Keyboard,
  Button,
} from 'react-native';
import ButtonStyle from '@ant-design/react-native/lib/button/style';
import {useDispatch} from 'react-redux';
import {IUserState, login as storeLogin} from '@store/user';
/**
 * 登录page
 */

const Login: React.FC = () => {
  const genVcodeUrl = () => BASE_URL + CAPTACH + '?t=' + Date.now();

  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [vCode, setVCode] = useState('');
  const [vCodeUri, setUri] = useState(genVcodeUrl);
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    Keyboard.dismiss();
    try {
      const data = await login({
        account,
        password,
        v_code: vCode,
        isWeb: 1,
        version: 1,
      });
      const user: IUserState = {
        isLogin: true,
        token: data.token,
        userInfo: data.staff,
      };
      storeLogin(dispatch)(user);
    } catch (error) {
      setUri(genVcodeUrl());
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
        <InputItem
          clear
          value={vCode}
          maxLength={4}
          extra={
            <TouchableOpacity onPress={() => setUri(genVcodeUrl())}>
              <Image
                style={styles.vCode}
                source={{
                  uri: vCodeUri,
                }}
              />
            </TouchableOpacity>
          }
          onChange={(value) => setVCode(value)}
          placeholder="vCode">
          验证码
        </InputItem>
      </List>
      {/* <Button onPress={handleSubmit} style={styles.btn} styles={btnStyles}>
        登录
      </Button> */}
      <Button onPress={handleSubmit} title="测试" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
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
