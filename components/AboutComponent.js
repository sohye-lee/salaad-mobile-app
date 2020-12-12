import React, { Component } from 'react';
import { SERVICES } from '../shared/services';
import { Card, ListItem } from 'react-native-elements';
import { ScrollView, Text, FlatList } from 'react-native';



const Mission = () => (
    <Card title="Delivery Food Can Be Healthier"> 
        <Text>
            We bring you an affordable, healthy alternative to fast food, knowing that your time is valuable and you care about what you put in your body.
        </Text>
    </Card>
)
class About extends Component {

    constructor(props) {
        super(props);
        this.state = {
            services: SERVICES
        };
    }

    static navigationOptions = {
        title: 'About Us'
    }
  
    render() {

        const renderService = ({item}) => {
            return (
                <ListItem
                    title={item.name}
                    leftAvatar={{ source: require('./img/logo.png')}}
                />
            );
        };

        return (
            <ScrollView>
                <Mission />
                <Card title="Meet Our Service">
                    <FlatList 
                        data={this.state.services}
                        renderItem={renderService}
                        keyExtractor={item => item.id.toString()}
                    />
                </Card>
            </ScrollView>
        )
    }
}

export default About;