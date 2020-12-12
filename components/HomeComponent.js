import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card, Typography } from 'react-native-elements';
// import { MENU } from '../shared/menu';
// import { SERVICES } from '../shared/services';
// import { REVIEWS } from '../shared/reviews';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = state => {
    return {
        menu: state.menu,
        services: state.services,
        reviews: state.reviews
    }
}

const RenderMenuItem = ({item}) => {
    if (item) {
        console.log(item.image)
        return (
            <Card 
                featuredTitle={item.name}
                image={{uri: baseUrl + item.image}}
                
            >
                <Text style={{margin: 10, color: 'rgb(80,80,80)', textTransform: 'uppercase'}}>
                    {item.type}
                </Text>
                <Text style={{margin: 10, color: 'rgb(80,80,80)'}}>
                    {item.ingredients? item.ingredients.join(', ') : item.text}
                </Text>
            </Card>
        )
    }
    return <View />;
}

class Home extends Component {

    static navigationOptions = {
        title: 'Home'
    }

    render() {
        return (
            <ScrollView>
                <Card
                    title="Today's Menu"
                    titleStyle={{color: '#2e7d32', textTransform: 'uppercase', fontSize: 22}}
                >

                    <RenderMenuItem 
                        item={this.props.menu.menu[0]}
                    />
                    <RenderMenuItem 
                        item={this.props.menu.menu[5]}
                    />
                    <RenderMenuItem 
                        item={this.props.menu.menu[6]}
                    />
                </Card>
                <View style={{height:20}}/>
            </ScrollView>
        )
    }
}

export default connect(mapStateToProps)(Home);