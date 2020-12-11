import React, { Component } from 'react';
import { MENU } from '../shared/MENU';
import { View, Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer }from 'react-navigation';
//Components
import Menu from './MenuComponent';
import MenuItem from './MenuItemComponent';
import Home from './HomeComponent';

const MenuNavigator = createStackNavigator(
    {
        Menu: { screen: Menu },
        MenuItem: { screen: MenuItem }
    },
    {
        initialRouteName: 'Menu',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#202020'
            },
            headerTintColor: '#ddd',
            headerTitleStyle: {
                color: '#ddd'
            }
        }
    }
);

const HomeNavigator = createStackNavigator(
    {
        Home: { screen: Home }
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#202020'
            },
            headerTintColor: '#ddd',
            headerTitleStyle: {
                color: '#ddd'
            }
        }
    }
);

const MainNavigator = createDrawerNavigator(
    {
        Home: { screen: HomeNavigator },
        Menu: { screen: MenuNavigator}
    },
    {
        drawerBackgroundColor: '#a5d6a7'
    }
)

const AppNavigator = createAppContainer(MainNavigator);



class Main extends Component {

    render() {
        return (
            <View 
                style={{
                    flex:1,
                    paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight
                }}
            >
                <AppNavigator />
            </View>
        )
    }
 }

export default Main;