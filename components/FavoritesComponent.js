import React, { Component } from 'react';
import { FlatList, View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';

const mapStateToProps = state => {
    return {
        menu: state.menu,
        favorites: state.favorites
    };
};

class Favorites extends Component {

    static navigationOptions = {
        title: 'My Favorites'
    }

    render() {
        const { navigate } = this.props.navigation;
        const renderFavoriteItem = ({item}) => {
            return (
                <ListItem 
                    title={item.name}
                    subtitle={item.type + '/' + item.calories + ' kcal'}
                    leftAvatar={{source: {uri: baseUrl + item.image}}}
                    onPress={() => navigate('MenuItem', {menuId: item.id})}
                />
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

export default connect(mapStateToProps)(Favorites);