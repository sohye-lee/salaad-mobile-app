import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        menu: state.menu,
        comments: state.comments,
        favorites: state.favorites
    }
}

const mapDispatchToProps = {
    postFavorite: menuId => (postFavorite(menuId))
}

function RenderComments({comments}) {
    
    const renderCommentItem = ({item}) => {
        return (
            <View style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
                <Text style={{fontSize: 12}}>{`by ${item.author}, ${item.date}`}</Text>
            </View>
        )
    }

    return (
        <Card title="Comments">
            <FlatList 
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={item => item.id.toString()}
            />
        </Card>
    );
}

function RenderMenuInfo(props) {
    
    const {menuItem} = props;

    if (menuItem) {
        return (
            <Card
                featuredTitle={menuItem.name}
                image={{uri: baseUrl + menuItem.image}}
            >
                <Text style={{margin: 5}}>
                    {menuItem.calories} KCAL
                </Text>
                <Text style={{margin: 5}}>
                    {menuItem.ingredients.join(', ')}
                </Text>
                <Icon 
                    name={props.favorite ? 'heart': 'heart-o'}
                    type='font-awesome'
                    color='#d81b60'
                    raised
                    reverse
                    onPress={() => props.favorite ? 
                        console.log('Already set as a favorite') 
                        : props.markFavorite()}
                />
            </Card>
        )
    }
    return <View />;
}

class MenuItem extends Component {

    static navigationOptions = {
        title: 'Menu Information'
    }

    markFavorite(menuId) {
        this.props.postFavorite(menuId);
    }

    render() {
        const menuId = this.props.navigation.getParam('menuId');
        const menuItem = this.props.menu.menu.filter(item => item.id=== menuId)[0];
        const comments = this.props.comments.comments.filter(comment => comment.menuId === menuId);
        return ( 
            <ScrollView>
                <RenderMenuInfo 
                    menuItem={menuItem} 
                    favorite={this.props.favorites.includes(menuId)} 
                    markFavorite={() => this.markFavorite(menuId)}
                />
                <RenderComments comments={comments} />
                <Text style={{height: 20}}/>
            </ScrollView>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuItem);