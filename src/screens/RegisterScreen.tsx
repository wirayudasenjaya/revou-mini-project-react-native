import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useCallback, useContext, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import analytics from '@react-native-firebase/analytics';
import notifee, {AndroidImportance} from '@notifee/react-native';

import Typography from '../components/Typography';
import ChevronLeft from '../components/atom/Icon/ChevronLeft';
import InvestlyLogo from '../components/atom/Icon/Investly';
import colors from '../components/constants/colors';
import Button from '../components/molecules/Button';
import {RegisterComponents} from '../components/organisms/Register';
import fetch from '../utils/fetch';
import {
  InputStateProps,
  RegisterDataProps,
  StackParams,
  TopicProps,
} from '../utils/types';
import {storageService} from '../services';
import {AuthContext} from '../utils/authContext';
import ProgressBar from '../components/molecules/ProgressBar';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

type ScreenProps = NativeStackScreenProps<StackParams, 'Login'>;

export default function RegisterScreen({navigation}: ScreenProps) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,64}$/;
  const flatListRef = useRef<FlatList>(null);
  const {login} = useContext(AuthContext);
  const [registerData, setRegisterData] = useState<RegisterDataProps>({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    username: '',
  });
  const [inputStates, setInputStates] = useState({
    email: 'default',
    password: 'default',
    confirmPassword: 'default',
    name: 'default',
    username: 'default',
  } as Record<keyof RegisterDataProps, InputStateProps>);
  const [errorMessage, setErrorMessage] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    username: '',
  });
  const [topic, setTopic] = useState<TopicProps[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<TopicProps[]>([]);
  const [isValid, setIsValid] = useState({
    email: false,
    password: false,
    confirmPassword: false,
    name: false,
    username: false,
  });
  const [loading, setLoading] = useState(false);
  const {width} = useWindowDimensions();
  const [currentIndex, setCurrentIndex] = useState(0);

  const debounce = (func, delay: number) => {
    let timeoutId: NodeJS.Timeout | undefined;

    return (...args) => {
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  const fetchUsername = () => {
    fetch.getSocialDev(`/v1/public/username/${registerData.username}`, {
      success: response => {
        setInputStates(prevStates => ({
          ...prevStates,
          username: 'negative',
        }));
        setErrorMessage(prevStates => ({
          ...prevStates,
          username: response.data.messages,
        }));
        setIsValid(prevValid => ({...prevValid, username: false}));
      },
      error: () => {
        setInputStates(prevStates => ({
          ...prevStates,
          username: 'positive',
        }));
        setIsValid(prevValid => ({...prevValid, username: true}));
      },
    });
  };

  const handleInputChange = useCallback(
    (key: keyof RegisterDataProps, value: string) => {
      setRegisterData(prev => ({...prev, [key]: value}));

      if (key === 'email') {
        if (!emailRegex.test(value)) {
          setInputStates(prevStates => ({...prevStates, email: 'negative'}));
          setErrorMessage(prevStates => ({
            ...prevStates,
            email: 'Format Email Tidak Sesuai',
          }));
        } else {
          setInputStates(prevStates => ({...prevStates, email: 'positive'}));
          setErrorMessage(prevStates => ({...prevStates, email: ''}));
        }
      }

      if (key === 'password') {
        if (!passwordRegex.test(value)) {
          setInputStates(prevStates => ({...prevStates, password: 'negative'}));
          setErrorMessage(prevStates => ({
            ...prevStates,
            password: 'Format Password Tidak Sesuai',
          }));
        } else {
          setInputStates(prevStates => ({...prevStates, password: 'positive'}));
          setErrorMessage(prevStates => ({...prevStates, password: ''}));
        }
      }

      if (key === 'confirmPassword') {
        if (value !== registerData.password || !passwordRegex.test(value)) {
          setInputStates(prevStates => ({
            ...prevStates,
            confirmPassword: 'negative',
          }));
          setErrorMessage(prevStates => ({
            ...prevStates,
            confirmPassword: 'Konfirmasi Password Tidak Sesuai',
          }));
        } else {
          setInputStates(prevStates => ({
            ...prevStates,
            confirmPassword: 'positive',
          }));
          setErrorMessage(prevStates => ({...prevStates, confirmPassword: ''}));
        }
      }

      if (key === 'name') {
        if (registerData.name.trim().length >= 3) {
          setInputStates(prevStates => ({...prevStates, name: 'negative'}));
          setErrorMessage(prevStates => ({
            ...prevStates,
            name: 'Nama harus memiliki minimal 3 karakter',
          }));
        } else {
          setInputStates(prevStates => ({...prevStates, name: 'positive'}));
          setErrorMessage(prevStates => ({...prevStates, name: ''}));
        }
      }

      if (key === 'username') {
        const debouncedFunction = debounce(fetchUsername, 500);
        debouncedFunction();
      }
    },
    [registerData.password],
  );

  const handleInputBlur = useCallback(
    (key: keyof RegisterDataProps) => {
      if (key === 'email') {
        if (emailRegex.test(registerData.email)) {
          setInputStates(prevStates => ({...prevStates, email: 'default'}));
          fetch.postAuth(
            `/v1/email/check`,
            {email: registerData.email},
            {
              success: () => {
                setInputStates(prevStates => ({
                  ...prevStates,
                  email: 'positive',
                }));
                setIsValid(prevValid => ({...prevValid, email: true}));
              },
              error: error => {
                setInputStates(prevStates => ({
                  ...prevStates,
                  email: 'negative',
                }));
                setIsValid(prevValid => ({...prevValid, email: false}));
                setErrorMessage(prevStates => ({
                  ...prevStates,
                  email: error.response.data.messages,
                }));
                analytics().logEvent('failed_validate_register_email');
              },
            },
          );
        } else {
          setInputStates(prevStates => ({...prevStates, email: 'negative'}));
          setErrorMessage(prevStates => ({
            ...prevStates,
            email: 'Format Email Tidak Sesuai',
          }));
          setIsValid(prevValid => ({...prevValid, email: false}));
        }
      } else {
        switch (key) {
          case 'password':
            if (passwordRegex.test(registerData.password)) {
              setInputStates(prevStates => ({
                ...prevStates,
                password: 'positive',
              }));
              setIsValid(prevValid => ({...prevValid, password: true}));
            } else {
              setInputStates(prevStates => ({
                ...prevStates,
                password: 'negative',
              }));
              setErrorMessage(prevStates => ({
                ...prevStates,
                password: 'Format Password Tidak Sesuai',
              }));
              setIsValid(prevValid => ({...prevValid, password: false}));
            }
            break;
          case 'confirmPassword':
            if (
              registerData.confirmPassword === registerData.password &&
              passwordRegex.test(registerData.confirmPassword)
            ) {
              setInputStates(prevStates => ({
                ...prevStates,
                confirmPassword: 'positive',
              }));
              setIsValid(prevValid => ({...prevValid, confirmPassword: true}));
            } else {
              setInputStates(prevStates => ({
                ...prevStates,
                confirmPassword: 'negative',
              }));
              setErrorMessage(prevStates => ({
                ...prevStates,
                confirmPassword: 'Konfirmasi Password Tidak Sesuai',
              }));
              setIsValid(prevValid => ({...prevValid, confirmPassword: false}));
            }
            break;
          case 'name':
            if (registerData.name.trim().length >= 3) {
              setInputStates(prevStates => ({
                ...prevStates,
                name: 'positive',
              }));
              setIsValid(prevValid => ({...prevValid, name: true}));
            } else {
              setInputStates(prevStates => ({
                ...prevStates,
                name: 'negative',
              }));
              setErrorMessage(prevStates => ({
                ...prevStates,
                name: 'Nama harus memiliki minimal 3 karakter',
              }));
              setIsValid(prevValid => ({...prevValid, name: false}));
            }
            break;
          case 'username':
            if (registerData.username.trim().length >= 3) {
              setInputStates(prevStates => ({
                ...prevStates,
                username: 'default',
              }));
              fetchUsername();
            } else {
              setInputStates(prevStates => ({
                ...prevStates,
                username: 'negative',
              }));
            }
            break;
        }
      }
    },
    [registerData],
  );

  const handleDisplayNotification = async () => {
    const channelId = await notifee.createChannel({
      id: 'default-test',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
    });

    await notifee.displayNotification({
      title: 'Register Success',
      subtitle: '',
      body: 'Horrrayy!, Daftar Berhasil!',
      android: {
        channelId,
        pressAction: {
          id: 'default',
        },
      },
    });
  };

  const handleNextStep = useCallback(
    async (index: number) => {
      switch (index) {
        case 0:
          flatListRef.current?.scrollToIndex({
            animated: true,
            index: currentIndex + 1,
          });
          setCurrentIndex(currentIndex + 1);
          await analytics().logEvent('click_register_button_step_1', {
            email: registerData.email,
          });
          break;
        case 1:
          flatListRef.current?.scrollToIndex({
            animated: true,
            index: currentIndex + 1,
          });
          setCurrentIndex(currentIndex + 1);
          await analytics().logEvent('click_register_button_step_2', {
            email: registerData.email,
            name: registerData.name,
            username: registerData.username,
          });
          break;
        case 2:
          setLoading(true);
          await analytics().logEvent('click_register_button_step_3', {
            email: registerData.email,
            name: registerData.name,
            username: registerData.username,
            topic_id: selectedTopic.map(topic => topic.id),
            topic_name: selectedTopic.map(topic => topic.label),
          });
          const insertValue = {
            email: registerData.email,
            password: registerData.password,
            favorite_topic_ids: selectedTopic.map(topic => topic.id),
            username: registerData.username,
            name: registerData.name,
          };
          fetch.postAuth('/v4/register', insertValue, {
            success: async response => {
              await analytics().logEvent('success_register_account', {
                email: registerData.email,
                name: registerData.name,
                username: registerData.username,
                topic_id: selectedTopic.map(topic => topic.id),
                topic_name: selectedTopic.map(topic => topic.label),
              });
              handleDisplayNotification();
              storageService.login();
              storageService.setToken(response.data.data.access_token);
              login(response.data.data.access_token);
            },
            error: async error => {
              await analytics().logEvent('failed_register_account', {
                email: registerData.email,
                name: registerData.name,
                username: registerData.username,
                topic_id: selectedTopic.map(topic => topic.id),
                topic_name: selectedTopic.map(topic => topic.label),
                error_message: error.response.data.messages,
              });
              Alert.alert('Register Error', error.response.data.messages);
              setLoading(false);
            },
          });
          break;
      }
    },
    [currentIndex, registerData, selectedTopic],
  );

  const handleOnMomentumEnd = useCallback((e: any) => {
    setCurrentIndex(Math.round(e.nativeEvent.contentOffset.x / screenWidth));
  }, []);

  const handleSelectedTopic = useCallback(
    ({id, label}: {id: string; label: string}) => {
      setSelectedTopic((prevSelected: TopicProps[]) => {
        if (prevSelected.some((topic: TopicProps) => topic.id === id)) {
          analytics().logEvent('click_register_unselect_topic', {
            email: registerData.email,
            name: registerData.name,
            username: registerData.username,
            topic_id: id,
            topic_name: label,
          });
          return prevSelected.filter((topic: TopicProps) => topic.id !== id);
        } else if (prevSelected.length < 3) {
          analytics().logEvent('click_register_select_topic', {
            email: registerData.email,
            name: registerData.name,
            username: registerData.username,
            topic_id: id,
            topic_name: label,
          });
          return [...prevSelected, {id, label}];
        }
        return prevSelected;
      });
    },
    [],
  );

  const handleButtonDisable = useCallback(() => {
    switch (currentIndex) {
      case 0:
        return !isValid.email || !isValid.password || !isValid.confirmPassword;
      case 1:
        return !isValid.name || !isValid.username;
      case 2:
        return selectedTopic.length !== 3;
      default:
        return false;
    }
  }, [currentIndex, isValid, selectedTopic.length]);

  useEffect(() => {
    fetch.getSocialDev(`v1/public/masterdata/topic`, {
      success: response => {
        setTopic(response.data.data);
      },
      error: error => {
        console.log(error);
      },
    });
  }, []);

  return (
    <SafeAreaView style={styles.mainBackground}>
      <View style={styles.contentContainer}>
        <View style={styles.upperItem}>
          <FlatList
            ref={flatListRef}
            data={RegisterComponents}
            horizontal
            showsHorizontalScrollIndicator={false}
            scrollEnabled={false}
            onMomentumScrollEnd={handleOnMomentumEnd}
            renderItem={({item}) => (
              <ScrollView style={{flexDirection: 'column'}}>
                <View
                  style={{
                    paddingTop: 12,
                    paddingBottom: 24,
                    paddingHorizontal: 20,
                  }}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <View style={{flex: 1, alignItems: 'flex-start'}}>
                      <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ChevronLeft />
                      </TouchableOpacity>
                    </View>
                    {currentIndex === 0 && (
                      <>
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
                              navigation.navigate('Login');
                            }}>
                            <Typography
                              type="heading"
                              size="xsmall"
                              style={{
                                textAlign: 'center',
                                color: colors.purple600,
                              }}>
                              Masuk
                            </Typography>
                          </Button>
                        </View>
                      </>
                    )}
                  </View>
                  <Typography type="heading" size="large" style={styles.title}>
                    {item.title}
                  </Typography>
                </View>
                <View style={{width, paddingHorizontal: 20}}>
                  <item.component
                    registerData={registerData}
                    errorMessage={errorMessage}
                    handleInputChange={handleInputChange}
                    handleInputBlur={handleInputBlur}
                    inputStates={inputStates}
                    topic={topic}
                    selectedTopic={selectedTopic}
                    handleSelectedTopic={handleSelectedTopic}
                  />
                </View>
              </ScrollView>
            )}
          />
        </View>
        <View style={{width: '100%', marginTop: 16}}>
          <View style={{paddingHorizontal: 20}}>
            <ProgressBar index={currentIndex} />
            <Button
              variant="primary"
              type="text"
              size="large"
              disabled={handleButtonDisable()}
              onPress={() => handleNextStep(currentIndex)}>
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Typography
                  type="heading"
                  size="medium"
                  style={{
                    color: colors.neutral100,
                    textAlign: 'center',
                  }}>
                  {currentIndex === 2 ? 'Daftar' : 'Selanjutnya'}
                </Typography>
              )}
            </Button>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainBackground: {
    flex: 1,
    height: screenHeight,
    backgroundColor: 'white',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 40,
  },
  upperItem: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
  },
  title: {
    textAlign: 'center',
    color: colors.neutral700,
    marginTop: 24,
  },
});
