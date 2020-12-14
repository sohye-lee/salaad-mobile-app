import React, { Component } from 'react';
import { View, Platform, StyleSheet, Text, ScrollView, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { createAppContainer }from 'react-navigation';
import SafeAreaView from 'react-native-safe-area-view';
import { connect } from 'react-redux';
import { fetchMenus, fetchComments, fetchServices, fetchReviews } from '../redux/ActionCreators';
//Components
import Menu from './MenuComponent';
import MenuItem from './MenuItemComponent';
import Home from './HomeComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import Order from './OrderComponent';
import Favorites from './FavoritesComponent';

const mapDispatchToProps = {
    fetchMenus,
    fetchComments,
    fetchServices,
    fetchReviews
};

const MenuNavigator = createStackNavigator(
    {
        Menu: {
            screen: Menu,
            navigationOptions: ({navigation}) => ({
                headerLeft: <Icon 
                    name='cutlery'
                    type='font-awesome'
                    iconStyle={styles.stackIcon}
                    onPress={() => navigation.toggleDrawer()}
                />
            })
        },
        MenuItem: { screen: MenuItem }
    },
    {
        initialRouteName: 'Menu',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#202020'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            }
        }
    }
);

const HomeNavigator = createStackNavigator(
    {
        Home: { screen: Home }
    },
    {
        defaultNavigationOptions: ({navigation}) =>({
            headerStyle: {
                backgroundColor: '#202020'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
            headerLeft: <Icon 
                name='home'
                type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer()}
            />
        })
    }
);

const OrderNavigator = createStackNavigator(
    {
        Order: { screen: Order }
    },
    {
        defaultNavigationOptions: ({navigation}) =>({
            headerStyle: {
                backgroundColor: '#202020'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
            headerLeft: <Icon 
                name='calendar-o'
                type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer()}
            />
        })
    }
);

const FavoritesNavigator = createStackNavigator(
    {
        Favorites : { screen: Favorites }
    },
    {
        defaultNavigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: '#202020'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
            headerLeft: <Icon 
                name='heart'
                type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer()}
            />
        })
    }
)

const AboutNavigator = createStackNavigator(
    {
        About: {screen: About}
    },
    {
        defaultNavigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: '#202020'
            },
            headerTintColor: '#fff',
            headerTintStyle: {
                color: '#fff'
            },
            headerLeft: <Icon 
                name='handshake-o'
                type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer()}
            />
        })
    }
);

const ContactNavigator = createStackNavigator(
    {
        Contact: {screen: Contact}
    },
    {
        defaultNavigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: '#202020'
            },
            headerTintColor: '#fff',
            headerTintStyle: {
                color: '#fff'
            },
            headerLeft: <Icon 
                name='phone'
                type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer()}
            />
        })
    }
);

const CustomDrawerContentComponent = props => (
    <ScrollView>
        <SafeAreaView
            style={styles.container}
            forceInset={{top: 'always', horizontal: 'never'}}
        >
            <View style={styles.drawerHeader}>
                <View style={{flex: 1}}>
                    <Image source={require('./img/logo.png')} style={styles.drawerImage} />
                </View>
                <View style={{flex: 2}}>
                    <Text style={styles.drawerHeaderText}>
                        Salaad
                    </Text>
                </View>
            </View>
            <DrawerItems {...props} />
        </SafeAreaView>
    </ScrollView>
);

const MainNavigator = createDrawerNavigator(
    {
        Home: { 
            screen: HomeNavigator,
            navigationOptions: {
                drawerIcon: ({tintColor}) => (
                    <Icon 
                        name='home'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        },
        Menu: { 
            screen: MenuNavigator,
            navigationOptions: {
                drawerIcon: ({tintColor}) => (
                    <Icon 
                        name='cutlery'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        },
        Order: { 
            screen: OrderNavigator,
            navigationOptions: {
                drawerLabel: 'Order',
                drawerIcon: ({tintColor}) => (
                    <Icon 
                        name='calendar-o'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        },
        Favorites: {
            screen: FavoritesNavigator,
            navigationOptions: {
                drawerLabel: 'My Favorites',
                drawerIcon: ({tintColor}) => (
                    <Icon 
                        name='heart'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        },
        About: { 
            screen: AboutNavigator,
            navigationOptions: {
                drawerLabel: 'About Us',
                drawerIcon: ({tintColor}) => (
                    <Icon 
                        name='handshake-o'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        },
        Contact: { 
            screen: ContactNavigator,
            navigationOptions: {
                drawerLabel: 'Contact Us',
                drawerIcon: ({tintColor}) => (
                    <Icon 
                        name='phone'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        },
    },
    {
        initialRouteName: 'Home',
        drawerBackgroundColor: '#a5d6a7',
        contentComponent: CustomDrawerContentComponent
    }
)

const AppNavigator = createAppContainer(MainNavigator);



class Main extends Component {

    componentDidMount() {
        this.props.fetchMenus();
        this.props.fetchComments();
        this.props.fetchServices();
        this.props.fetchReviews();
    }

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

 const styles = StyleSheet.create({
     container: {
        flex: 1,
     },
     drawerHeader: {
        backgroundColor: '#202020',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
     },
     drawerHeaderText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold'
     },
     drawerImage: {
        margin: 10,
        height: 60,
        width: 60
     },
     stackIcon: {
         marginLeft: 10,
         color: '#fff',
         fontSize: 24
     }
 })

export default connect(null, mapDispatchToProps)(Main);