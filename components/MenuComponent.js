import React, { Component } from 'react';
import { FlatList, View, Text } from 'react-native';
// import MenuItem from './MenuItemComponent';
import { Tile } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { ScrollView } from 'react-native-gesture-handler';

const mapStateToProps = state => {
    return {
        menu: state.menu
    }
}

class Menu extends Component {

    static navigationOptions = {
        title: 'Menu'
    }

    render() {
        const { navigate } = this.props.navigation;
        const renderMenuItem = ({item}) => {
            return (
                <Tile 
                    title={item.name}
                    titleStyle={{textShadowColor: 'rgba(0,0,0,.4)', textShadowOffset: {width: 1, height: 1}, textShadowRadius: 10}}
                    caption={item.type.toUpperCase()+' / '+ item.calories+'kcal'}
                    imageContainerStyle={{backgroundColor: 'rgba(0,0,0,.2)', borderColor: 'white', borderBottomWidth: .5}}
                    featured
                    onPress={() => navigate('MenuItem', { menuId: item.id })}
                    imageSrc={{ uri: baseUrl + item.image }}
                />
            );
        };

        return (
            <View>
                <FlatList
                    data={this.props.menu.menu}
                    renderItem={renderMenuItem}
                    keyExtractor={item => item.id.toString()}
                />
                <Text style={{height: 40}}/>
            </View>
        );
    }
}

export default connect(mapStateToProps)(Menu);