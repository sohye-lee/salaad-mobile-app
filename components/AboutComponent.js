import React, { Component } from 'react';
// import { SERVICES } from '../shared/services';
import { Card, ListItem } from 'react-native-elements';
import { ScrollView, Text, FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

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

        return (
            <ScrollView>
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
                <View style={{height: 20}} />
            </ScrollView>
        )
    }
}

export default connect(mapStateToProps)(About);