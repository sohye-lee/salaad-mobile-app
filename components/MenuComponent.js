import React from 'react';
import { render } from 'react-dom';
import { FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';


function Menu(props) {

    const renderMenuItem = ({item}) => {
        return (
            <ListItem 
                title={item.name}
                subtitle={`${item.calories} KCAL <br> ${item.ingredients.map(ingredient => ingredient)}`}
                leftAbatar={{source: require(`${item.image}`)}}
            />
        )
    }

    return (
        <FlatList 

        />
    )
}