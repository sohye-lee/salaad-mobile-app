import React from 'react';
import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';

function RenderMenuInfo({menuItem}) {
    if (menuItem) {
        return (
            <Card
                featuredTitle={menuItem.name}
                image={require('./img/menu/salad1.png')}
            >
                <Text style={{margin: 3}}>
                    {menuItem.calories} KCAL
                </Text>
                <Text style={{margin: 3}}>
                    {menuItem.ingredients.join(', ')}
                </Text>
            </Card>
        )
    }
    return <View />;
}

function MenuItem(props) {
    return <RenderMenuInfo menuItem={props.menuItem} />;
}

export default MenuItem;