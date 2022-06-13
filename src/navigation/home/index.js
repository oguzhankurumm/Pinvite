import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { gray, primary, backgroundColor } from '../../assets/colors';
import { Icon } from 'react-native-eva-icons';

//IMPORT ASSETS
import HorizontalLogo from '../../assets/images/logo-horizontal.png';
import PinviteBottomBarIcon from '../../assets/images/pinviteBottomBarIcon.svg';
import HomeIcon from '../../assets/icons/Home.png';
import ExploreIcon from '../../assets/icons/Search.png';
import ChatIcon from '../../assets/icons/Chat.png';
import ProfileIcon from '../../assets/icons/Profile.png';

// IMPORT APP SCREENS
import Home from '../../screens/main/home';
import Explore from '../../screens/main/explore';
import Messages from '../../screens/main/messages';
import Profile from '../../screens/main/profile';
import UploadScreen from '../../screens/main/upload-screen';
import OpenMenuHelper from '../../modals/menu/open-menu-helper';
import { useChats } from '../../helpers/useChats';

const Tab = createBottomTabNavigator();
const headerShownStatus = true;
const tabBarLabelStatus = false;

const HomeScreen = () => {
    useChats();
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarActiveTintColor: primary,
                tabBarInactiveTintColor: gray,
                tabBarShowLabel: tabBarLabelStatus,
                headerTitle: () => <Image source={HorizontalLogo} style={{ flex: 1, width: 90, resizeMode: "contain" }} />,
                headerRight: () => <OpenMenuHelper />,
                headerShown: true,
                tabBarStyle: {
                    backgroundColor: backgroundColor
                },
                tabBarIcon: ({ color, size }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = <Image style={{ height: size * 1.1, width: size, tintColor: color }} source={HomeIcon} />;
                    } else if (route.name === 'Explore') {
                        iconName = <Image style={{ height: size * 1.1, width: size, tintColor: color }} source={ExploreIcon} />;
                    } else if (route.name === 'Messages') {
                        iconName = <Image style={{ height: size * 1.1, width: size, tintColor: color }} source={ChatIcon} />;
                    } else if (route.name === 'Profile') {
                        iconName = <Image style={{ height: size * 1.1, width: size, tintColor: color }} source={ProfileIcon} />;
                    } else if (route.name === 'Upload') {
                        iconName = <PinviteBottomBarIcon width={size} height={size} />;
                    }
                    return iconName;
                }
            })}
        >
            <Tab.Screen name='Home' component={Home} options={{ headerShown: false, tabBarShowLabel: tabBarLabelStatus }} />
            <Tab.Screen name='Explore' component={Explore} options={{ headerShown: headerShownStatus, tabBarShowLabel: tabBarLabelStatus }} />
            <Tab.Screen name='Upload' component={UploadScreen} options={{ headerShown: headerShownStatus, tabBarShowLabel: tabBarLabelStatus }} />
            <Tab.Screen name='Messages' component={Messages} options={{ headerShown: headerShownStatus, tabBarShowLabel: tabBarLabelStatus }} />
            <Tab.Screen name='Profile' component={Profile} options={{ headerShown: headerShownStatus, tabBarShowLabel: tabBarLabelStatus }} />
        </Tab.Navigator>
    )
};


export default HomeScreen;