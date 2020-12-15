import React, { Component } from 'react';
import { Card, ListItem } from 'react-native-elements';
import { ScrollView, Text, FlatList, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';

const mapStateToProps = state => {
    return {
        services: state.services,
        reviews: state.reviews
    }
}

const Mission = () => (
    <Card title="Delivery Food Can Be Healthier"> 
        <Text>
            We bring you an affordable, healthy alternative to fast food, knowing that your time is valuable and you care about what you put in your body.
        </Text>
    </Card>
)
class About extends Component {

    static navigationOptions = {
        title: 'About Us'
    }
  
    render() {

        const renderService = ({item}) => {
            return (
                <Card
                    featuredSubtitle={item.name}
                    featuredSubtitleStyle={{marginLeft: 120}}
                    image={{ uri: baseUrl + item.image }}
                    containerStyle={{border:'none'}}
                    wrapperStyle={{borderWidth: 0}}
                >
                    <Text>{item.description}</Text>
                </Card>
            );
        };

        const renderReview = ({item}) => {
            return (
                <ListItem 
                    bottomDivider 
                    title={'"'+ item.text +'" \n - ' + item.author + ', ' + item.location} 
                />
            )
        }

        if (this.props.services.isLoading || this.props.reviews.isLoading) {
            return (
                <ScrollView>
                    <Mission />
                    <Card
                        title='Meet Best Services'
                    >
                        <Loading />
                    </Card>
                </ScrollView>
            )
        }

        if (this.props.services.errMess || this.props.reviews.errMess) {
            return (
                <ScrollView>
                    <Animatable.View animation='fadeInDown' duration={1000} delay={500}>
                        <Mission />
                        <Card title="Sorry, please try again">
                            <Text>{this.props.services.errMess || this.props.reviews.errMess}</Text>
                        </Card>
                    </Animatable.View>
                </ScrollView>
            )
        }

        return (
            <ScrollView>
                <Animatable.View animation='fadeInDown' duration={1000} delay={500}>
                    <Mission />
                    <Card title="Meet Our Service">
                        <FlatList 
                            data={this.props.services.services}
                            renderItem={renderService}
                            keyExtractor={item => item.id.toString()}
                            />
                    </Card>
                    <Card title="Our Customers Think...">
                        <FlatList 
                            data={this.props.reviews.reviews}
                            renderItem={renderReview}
                            keyExtractor={item => item.id.toString()}
                            />
                    </Card>
                </Animatable.View>
            </ScrollView>
        )
    }
}

export default connect(mapStateToProps)(About);