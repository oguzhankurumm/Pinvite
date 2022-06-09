import React, { useEffect } from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { dark, backgroundColor, black } from '../../assets/colors';
import { useSelector, useDispatch } from 'react-redux';
import { userAuthStateListener } from '../../redux/actions/auth';

// IMPORT ALL PAGES
import Loading from '../../components/loading';
import HeaderBackImage from '../../assets/images/headerBackButton.svg';
import HorizontalLogo from '../../assets/images/logo-horizontal.png';
import HomeScreen from '../home';
import Login from '../../screens/auth/login';
import Welcome from '../../screens/auth/welcome';
import Register from '../../screens/auth/register';
import EditProfile from '../../screens/main/edit-profile';
import UserProfile from '../../screens/main/user-profile';
import PostScreen from '../../screens/main/post-screen';

const Stack = createNativeStackNavigator();

export default function Route() {
    const dispatch = useDispatch();
    const currentUserObj = useSelector(state => state.authReducer);

    useEffect(() => {
        dispatch(userAuthStateListener());
    }, [])

    if (!currentUserObj.loaded) {
        return <Loading />
    }

    const headerProps = { backgroundColor: backgroundColor }
    const headerTintColor = black;
    const headerBackImageSize = 30;

    const HeaderBackButton = ({ navigation }) => (
        <Pressable onPress={() => navigation.goBack()}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingRight: 30 }}>
                <HeaderBackImage height={headerBackImageSize} />
            </View>
        </Pressable >
    );

    const HeaderLogo = () => (
        <Image source={HorizontalLogo} style={{ height: 24, resizeMode: "contain" }} />
    )

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Onboard' >
                {currentUserObj.currentUser === null ?
                    <>
                        <Stack.Screen name="Welcome" component={Welcome}
                            options={() => ({
                                headerStyle: {
                                    ...headerProps,
                                },
                                headerShadowVisible: false,
                                headerBackTitleVisible: false,
                                headerTintColor: headerTintColor,
                                headerShown: false,
                                gestureEnabled: false
                            })}
                        />
                        <Stack.Screen name="Login" component={Login}
                            options={({ route, navigation }) => ({
                                headerTitle: '',
                                headerStyle: { ...headerProps },
                                headerLeft: () => <HeaderBackButton navigation={navigation} />,
                                headerShadowVisible: false,
                                headerBackTitleVisible: false,
                                headerTintColor: headerTintColor,
                                gestureEnabled: true,
                            })}
                        />
                        <Stack.Screen name="Register" component={Register}
                            options={({ route, navigation }) => ({
                                headerTitle: '',
                                headerStyle: { ...headerProps },
                                headerLeft: () => <HeaderBackButton navigation={navigation} />,
                                headerShadowVisible: false,
                                headerBackTitleVisible: false,
                                headerTintColor: headerTintColor,
                                gestureEnabled: true,
                            })}
                        />
                    </>
                    :
                    <>
                        <Stack.Screen name="HomeScreen" component={HomeScreen}
                            options={() => ({
                                headerTitle: 'Pinvite',
                                headerShown: false,
                                headerStyle: { ...headerProps },
                                headerShadowVisible: true,
                                headerBackTitleVisible: false,
                                headerTintColor: headerTintColor,
                                gestureEnabled: false
                            })}
                        />
                        <Stack.Screen name="PostScreen" component={PostScreen}
                            options={({ route, navigation }) => ({
                                headerTitle: () => <HeaderLogo />,
                                headerStyle: { ...headerProps },
                                headerShadowVisible: false,
                                headerBackTitleVisible: false,
                                headerTintColor: headerTintColor,
                                gestureEnabled: true,
                                headerShown: false
                            })}
                        />
                        <Stack.Screen name="EditProfile" component={EditProfile}
                            options={({ route, navigation }) => ({
                                headerTitle: () => <HeaderLogo />,
                                headerStyle: { ...headerProps },
                                headerShadowVisible: false,
                                headerBackTitleVisible: false,
                                headerTintColor: headerTintColor,
                                gestureEnabled: true,
                            })}
                        />
                        <Stack.Screen name="UserProfile" component={UserProfile}
                            options={({ route, navigation }) => ({
                                headerTitle: () => <HeaderLogo />,
                                headerStyle: { ...headerProps },
                                headerShadowVisible: false,
                                headerBackTitleVisible: false,
                                headerTintColor: headerTintColor,
                                gestureEnabled: true,
                            })}
                        />
                    </>
                }
            </Stack.Navigator>
        </NavigationContainer >
    )
}