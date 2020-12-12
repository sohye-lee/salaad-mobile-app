import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card, Typography } from 'react-native-elements';
import { MENU } from '../shared/menu';
import { SERVICES } from '../shared/services';
import { REVIEWS } from '../shared/reviews';

const RenderMenuItem = ({item}) => {
    if (item) {
        console.log(item.image)
        return (
            <Card 
                featuredTitle={item.name}
                image={require('./img/menu/salad4.png')}

            >
                <Text style={{margin: 10}}>
                    {item.ingredients? item.ingredients.join(', ') : item.text}
                </Text>
            </Card>
        )
    }
    return <View />;
}

// const RenderServiceItem = ({item}) => {
//     if (item) {
//         return (
//             <Card 
//                 containerStyle={{backgroundColor:'green'}}
//             >
//                 <Text style={{margin: 10, fontSize: '20px'}}>
//                     {item.name}
//                 </Text>
//             </Card>
//         )
//     }
//     return <View />;
// }

// const RenderReviewItem = ({item}) => {
//     if (item) {
//         return (
//             <Card 
//                 containerStyle={{backgroundColor: 'blue'}}
//             >
//                 <Text style={{margin: 10, color: 'white'}}>
//                     {item.text} 
//                     - {item.name}, {item.location}
//                 </Text>
//             </Card>
//         )
//     }
//     return <View />;
// }

// const BoxTitle = ({text}) => {
//     <Text style={{fontSize: '20px', color: "white"}}></Text>
// }
class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menu: MENU,
            services: SERVICES,
            reviews: REVIEWS
        }
    }

    static navigationOptions = {
        title: 'Home'
    }

    render() {
        return (
            <ScrollView>
                <Text style={{fontWeight: 'bold', fontSize: 30, marginTop: 10, textAlign: "center"}}>Today's Menu</Text>
                <RenderMenuItem 
                    item={this.state.menu[0]}
                />
                <RenderMenuItem 
                    item={this.state.menu[1]}
                />
                <RenderMenuItem 
                    item={this.state.menu[2]}
                />
            </ScrollView>
        )
    }
}

export default Home;