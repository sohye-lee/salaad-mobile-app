import React, { Component } from 'react';
import { Text, ScrollView } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

class Contact extends Component {

    static navigationOptions = {
        title: 'Contact Us'
    }

    render() {
        return (
            <ScrollView>
                <Animatable.View animation='lightSpeedIn' duration={1400} delay={400}>
                    <Card>
                        <Text>12801 Lee Highway</Text>
                        <Text>Fairfax, VA 22031</Text>
                        <Text style={{marginBottom: 10}}>U.S.A.</Text>
                        <Text>Phone: 1-201-337-8787</Text>
                        <Text>Email: info@salaad.com</Text>
                        <Button 
                            title="Send Email"
                            buttonStyle={{backgroundColor:"#202020", margin: 40}}
                            icon={
                                <Icon 
                                    name="envelope-o"
                                    type='font-awesome'
                                    color='#fff'
                                    iconStyle={{marginRight: 10}}
                                />
                            }
                        />
                    </Card>
                </Animatable.View>
            </ScrollView>
        );
    }
}

export default Contact;