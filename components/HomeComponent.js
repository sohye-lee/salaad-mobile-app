import React, { Component } from 'react';
import { View, Text, ScrollView, Animated } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';

const mapStateToProps = state => {
    return {
        menu: state.menu,
        services: state.services,
        reviews: state.reviews
    }
}

const RenderMenuItem = (props) => {
    const {item} = props;

    if (props.isLoading) {
        return <Loading />;
    }

    if (props.errMess) {
        return (
            <View>
                <Text>{props.errMess}</Text>
            </View>
        )
    }

    if (item) {
        console.log(item.image)
        return (
            <Card 
                featuredTitle={item.name}
                image={{uri: baseUrl + item.image}}
                imageStyle={{height:300}}
            >
                
                <Text style={{margin: 10, marginBottom: 0, color: 'rgb(80,80,80)', textTransform: 'uppercase'}}>
                    {item.type}
                </Text>
                <Text style={{margin: 10, color: 'rgb(80,80,80)'}}>
                    {item.ingredients? item.ingredients.join(', ') : item.text}
                </Text>
                <Button 
                    buttonStyle={{backgroundColor:"rgb(240, 50, 82)"}}
                    title="See More"
                    onPress={props.onPress}
                />
            </Card>
        )
    }
    return <View />;
}

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            scaleValue: new Animated.Value(0)
        };
    }

    
    animate() {
        Animated.timing(
            this.state.scaleValue,
            {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true
            }
        ).start();
    }
        
    componentDidMount() {
        this.animate();
    }
    
    static navigationOptions = {
        title: 'Home'
    }
    
    render() {
        
        const { navigate } = this.props.navigation;

        return (
            <Animated.ScrollView style={{transform: [{scale: this.state.scaleValue}]}}>
                <Card
                    title="Today's Menu"
                    titleStyle={{textTransform: 'uppercase', fontSize: 22}}
                >

                    <RenderMenuItem 
                        item={this.props.menu.menu[0]}
                        isLoading={this.props.menu.isLoading}
                        errMess={this.props.menu.errMess}
                        onPress={() => navigate('MenuItem', {menuId: this.props.menu.menu[0].id})}
                    />
                    <RenderMenuItem 
                        item={this.props.menu.menu[5]}
                        isLoading={this.props.menu.isLoading}
                        errMess={this.props.menu.errMess}
                        onPress={() => navigate('MenuItem', {menuId: this.props.menu.menu[5].id})}

                    />
                    <RenderMenuItem 
                        item={this.props.menu.menu[6]}
                        isLoading={this.props.menu.isLoading}
                        errMess={this.props.menu.errMess}
                        onPress={() => navigate('MenuItem', {menuId: this.props.menu.menu[6].id})}

                    />
                </Card>
                <View style={{height:20}}/>
            </Animated.ScrollView>
        )
    }
}

export default connect(mapStateToProps)(Home);