import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

const Loading = () => (
    <View style={styles.loadingView}>
        <ActivityIndicator size='large' color='#1faa00'/>
        <Text style={styles.loadingText}> Loading . . .</Text>
    </View>
)

const styles = StyleSheet.create(
    {
        loadingView: {
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1
        },
        loadingText: {
            color: '#1faa00',
            fontSize: 14,
            fontWeight: 'bold'
        }
    }
)

export default Loading;