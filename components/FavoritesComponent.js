import React, { Component } from 'react';
import { FlatList, View, Text, StyleSheet, Alert } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { SwipeRow } from 'react-native-swipe-list-view';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { deleteFavorite } from '../redux/ActionCreators';
import Loading from './LoadingComponent';

const mapStateToProps = state => {
    return {
        menu: state.menu,
        favorites: state.favorites
    };
};

const mapDispatchToProps = {
    deleteFavorite: menuId => deleteFavorite(menuId)
}

class Favorites extends Component {

    static navigationOptions = {
        title: 'My Favorites'
    }

    render() {
        const { navigate } = this.props.navigation;
        const renderFavoriteItem = ({item}) => {
            return (
                <SwipeRow rightOpenValue={-100} style={styles.swipeRow}>
                    <View style={styles.deleteView}>
                        <TouchableOpacity
                            style={styles.deleteTouchable}
                            onPress={() => 
                                Alert.alert(
                                    'Delete Favorite?',
                                    '\nAre you sure you wish to delete \"'+ item.name + '\" from your favorite menus?',
                                [
                                    {
                                        text: 'Cancel',
                                        onPress: () => console.log(item.name + 'not deleted'),
                                        style: 'cancel'
                                    },
                                    {
                                        text: 'OK',
                                        onPress: () => { this.props.deleteFavorite(item.id); console.log(item.id+ ' deleted') }
                                    },
                                ],
                                { cancelable: false }
                                )    
                            }
                        >
                            <Text style={styles.deleteText}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <ListItem 
                            title={item.name}
                            subtitle={item.type + '/' + item.calories + ' kcal'}
                            leftAvatar={{source: {uri: baseUrl + item.image}}}
                            onPress={() => navigate('MenuItem', {menuId: item.id})}
                        />
                    </View>
                </SwipeRow>
            );
        };


        if (this.props.menu.isLoading) {
            return <Loading />;
        }

        if (this.props.menu.errMess) {
            return (
                <View>
                    <Text>{this.props.menu.errMess}</Text>
                </View>
            )
        }

        return (
            <FlatList 
                data={this.props.menu.menu.filter(
                    menuItem => this.props.favorites.includes(menuItem.id)
                )}
                renderItem={renderFavoriteItem}
                keyExtractor={item => item.id.toString()}
            />
        )
    }
}

const styles = StyleSheet.create({
    deleteView: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1
    },
    deleteTouchable: {
        backgroundColor: 'red',
        height: '100%',
        justifyContent: 'center'
    },
    deleteText: {
        color: '#fff',
        fontWeight: '700',
        textAlign: 'center',
        fontSize: 16,
        width: 100
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);