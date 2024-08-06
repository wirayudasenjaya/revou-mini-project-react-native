import {useCallback, useContext, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import analytics from '@react-native-firebase/analytics';

import Typography from '../components/Typography';
import Button from '../components/molecules/Button';
import colors from '../components/constants/colors';
import TextField from '../components/molecules/TextInput';
import InvestlyLogo from '../components/atom/Icon/Investly';
import ChevronLeft from '../components/atom/Icon/ChevronLeft';
import {InputStateProps, StackParams} from '../utils/types';
import {UserContext} from '../utils/userContext';
import fetch from '../utils/fetch';
import {storageService} from '../services';
import {AuthContext} from '../utils/authContext';

const screenHeight = Dimensions.get('screen').height;

type ScreenProps = NativeStackScreenProps<StackParams, 'Login'>;

export default function LoginScreen({navigation}: ScreenProps) {
  const {setUser} = useContext(UserContext);
  const {login} = useContext(AuthContext);
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,64}$/;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailState, setEmailState] = useState<InputStateProps>('default');
  const [passwordState, setPasswordState] =
    useState<InputStateProps>('default');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEmailBlur = () => {
    if (emailRegex.test(email)) {
      setEmailState('positive');
      setIsEmailValid(true);
    } else {
      setEmailState('negative');
      setIsEmailValid(false);
    }
  };

  const handlePasswordBlur = () => {
    if (passwordRegex.test(password)) {
      setPasswordState('positive');
      setIsPasswordValid(true);
    } else {
      setPasswordState('negative');
      setIsPasswordValid(false);
    }
  };

  const handleLogin = useCallback(() => {
    setLoading(true);
    fetch.postAuth(
      '/v2/login',
      {
        email,
        password,
      },
      {
        success: response => {
          storageService.setToken(response.data.data.access_token)
          storageService.login();
          login(response.data.data.access_token);
        },
        error: error => {
          console.log(error)
          Alert.alert('Login Error', 'Invalid credentials');
          setLoading(false);
        },
      },
    );
  }, [email, password]);

  return (
    <SafeAreaView style={styles.mainBackground}>
      <View style={styles.contentContainer}>
        <View style={styles.upperItem}>
          <View style={{paddingTop: 12}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View style={{flex: 1, alignItems: 'flex-start'}}>
                <TouchableOpacity
                  onPress={() => navigation.goBack()}>
                  <ChevronLeft />
                </TouchableOpacity>
              </View>
              <View style={{flex: 1, alignItems: 'center'}}>
                <InvestlyLogo width={24} height={24} />
              </View>
              <View style={{flex: 1, alignItems: 'flex-end'}}>
                <Button
                  variant="link"
                  type="text"
                  size="small"
                  disabled={false}
                  onPress={() => {
                    setUser('guest');
                    login('');
                  }}>
                  <Typography
                    type="heading"
                    size="xsmall"
                    style={{textAlign: 'center', color: colors.purple600}}>
                    Lewati
                  </Typography>
                </Button>
              </View>
            </View>
            <Typography type="heading" size="large" style={styles.title}>
              Masuk ke Investly
            </Typography>
          </View>

          <TextField
            state={emailState}
            type="email"
            label="Email"
            placeholder="Email"
            message="Invalid email format"
            value={email}
            onChangeText={text => setEmail(text)}
            onBlur={handleEmailBlur}
          />
          <View style={{marginVertical: 12}} />
          <TextField
            state={passwordState}
            type="password"
            label="Password"
            placeholder="Masukkan Password"
            message="Invalid password format"
            value={password}
            onChangeText={text => setPassword(text)}
            onBlur={handlePasswordBlur}
          />
          <View style={{marginVertical: 8}} />
          <TouchableOpacity style={{marginBottom: 24}}>
            <Typography type="heading" size="xsmall" style={{color: '#4343EF'}}>
              Lupa Password
            </Typography>
          </TouchableOpacity>
          <Button
            variant="primary"
            type="text"
            size="large"
            disabled={!isEmailValid || !isPasswordValid}
            onPress={handleLogin}>
            {loading ? (
              <ActivityIndicator size="small" color='white' />
            ) : (
              <Typography
                type="heading"
                size="medium"
                style={{
                  color: colors.neutral100,
                  textAlign: 'center',
                }}>
                Masuk
              </Typography>
            )}
          </Button>
        </View>
        <View style={{flex: 1, width: '100%'}}>
          <Button
            variant="outline"
            type="text"
            size="large"
            disabled={false}
            onPress={async () => {
              await analytics().logEvent('click_register_button');
              navigation.navigate('Register');
            }}>
            <Typography
              type="heading"
              size="medium"
              style={{
                color: colors.purple600,
                textAlign: 'center',
              }}>
              Daftar
            </Typography>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainBackground: {
    height: screenHeight,
    backgroundColor: 'white',
  },
  contentContainer: {
    height: screenHeight,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  upperItem: {
    flex: 7,
    width: '100%',
    justifyContent: 'flex-start',
  },
  title: {
    textAlign: 'center',
    color: colors.neutral700,
    marginTop: 24,
  },
});
