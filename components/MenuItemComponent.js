import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, Modal, Button, StyleSheet } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        menu: state.menu,
        comments: state.comments,
        favorites: state.favorites
    }
}

const mapDispatchToProps = {
    postFavorite: menuId => (postFavorite(menuId)),
    postComment: (menuId,rating,author,comment) => postComment(menuId,rating,author,comment)
}

function RenderComments({comments}) {
    
    const renderCommentItem = ({item}) => {
        return (
            <View style={{margin: 5, paddingBottom: 25, borderBottomColor: 'rgba(0,0,0,.1)', borderBottomWidth: 1}}>
                <Rating 
                    startingValue={item.rating}
                    type="heart"
                    readonly 
                    imageSize={12} 
                    style={{
                        alignItems: 'flex-start', 
                        paddingVertical: '5%'
                    }}
                />
                <Text style={{fontSize: 15}}>
                    {item.comment}
                </Text>
                <Text style={{fontSize: 12}}>
                    {`\nby ${item.author}, ${item.date}`}
                </Text>
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
                imageStyle={{height:400}}
            >
                <Text style={{margin: 5}}>
                    {menuItem.calories} KCAL
                </Text>
                <Text style={{margin: 5}}>
                    {menuItem.ingredients.join(', ')}
                </Text>
                <View style={styles.cardRow}>
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
                    <Icon 
                        name={'pencil'}
                        type='font-awesome'
                        color='#1faa00'
                        raised
                        reverse
                        onPress={() => props.onShowModal()}
                    />
                </View>
            </Card>
        )
    }
    return <View />;
}

class MenuItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rating: 5,
            author: '',
            comment: '',
            favorite: false,
            showModal: false
        }
    }

    static navigationOptions = {
        title: 'Menu Information'
    }

    markFavorite(menuId) {
        this.props.postFavorite(menuId);
    }

    toggleModal() {
        this.setState({showModal: !this.state.showModal})
    }

    handleComment(menuId) {
        this.props.postComment(menuId, this.state.rating, this.state.author, this.state.comment);
        this.toggleModal();
    }

    resetForm() {
        this.setState({
            author: '',
            comment: '',
            rating: 5
        })
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
                    onShowModal={() => this.toggleModal()}
                />
                <RenderComments comments={comments} />
                <Text style={{height: 20}}/>

                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.showModal}
                    onRequestClose={() => this.toggleModal()}
                >
                    <View style={styles.modal}>
                        <Rating 
                            showRating
                            startingValue={this.state.rating}
                            imageSize={40}
                            onFinishRating={rating => this.setState({rating: rating})}
                            style={{paddingVertical: 10}}
                        />
                        <Input 
                            placeholder="your name"
                            leftIcon={
                                <Icon 
                                    type='font-awesome'
                                    name='user-o'
                                />
                            }
                            leftIconContainerStyle={{paddingRight: 10}}
                            onChangeText={author => this.setState({author: author})}
                            value={this.state.author}
                        />
                        <Input 
                            placeholder="comment"
                            leftIcon={
                                <Icon 
                                    type='font-awesome'
                                    name='comment-o'
                                />
                            }
                            leftIconContainerStyle={{paddingRight: 10}}
                            onChangeText={comment => this.setState({comment: comment})}
                            value={this.state.comment}
                        />
                        <View style={{margin: 10}}>
                            <Button 
                                onPress={() => {
                                    this.handleComment(menuId);
                                    this.resetForm();
                                }}
                                color="#1faa00"
                                title="Submit"
                            />
                        </View>
                        <View style={{margin: 10}}>
                            <Button 
                                onPress={() => {
                                    this.toggleModal();
                                    this.resetForm();
                                }}
                                color="#606060"
                                title="Cancel"
                            />
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    cardRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(MenuItem);