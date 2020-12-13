import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Image,
         Picker, Switch, Button, TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = state => {
    return {
        menu: state.menu
    }
}

class Order extends Component {

    constructor(props) {
        super(props);

        this.state = {
            menuId: 0,
            quantity: 1,
            name: '',
            phone: 0,
            message: '',
            pickup: false,
            date: new Date(),
            showCalendar: false,
            mode: 'date'
        };
    }

    static navigationOptions = {
        title: 'Order'
    }

    showDateCalendar() {
        this.setState({showCalendar: true, mode: 'date'});
    }

    showTimeCalendar() {
        this.setState({showCalendar: true, mode: 'time'});
      
    }

    handleOrder() {
        console.log(JSON.stringify(this.state));
        this.setState({
            menuId: 0,
            quantity: 1,
            name: '',
            phone: 0,
            pickup: false,
            date: new Date(),
            showCalendar: false,
            mode: this.mode
        });
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Plate To Order</Text>
                    <Picker 
                        style={styles.formItem}
                        selectedValue={this.state.menuId}
                        onValueChange={itemValue => this.setState({menuId: itemValue})}
                    >
                        <Picker.Item label='1.Sound Of Music [salad]' value='0'/>
                        <Picker.Item label='2.Dr.Zhivago [salad]' value='1' />
                        <Picker.Item label='3.Before Sunset [salad]' value='2' />
                        <Picker.Item label='4.Roman Holiday [salad]' value='3' />
                        <Picker.Item label='5.Mamma Mia! [protein]' value='4' />
                        <Picker.Item label='6.In Bruges [protein]' value='5' />
                        <Picker.Item label='7.Before Sunrise [dessert]' value='6' />
                        <Picker.Item label='8.Grace Of Monaco [dessert]' value='7' />
                    </Picker>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Qty</Text>
                    <Picker 
                        style={styles.formItem}
                        selectedValue={this.state.quantity}
                        onValueChange={itemValue => this.setState({quantity: itemValue})}
                    >
                        <Picker.Item label='1' value='1' />
                        <Picker.Item label='2' value='2' />
                        <Picker.Item label='3' value='3' />
                        <Picker.Item label='4' value='4' />
                        <Picker.Item label='5' value='5' />
                        <Picker.Item label='6' value='6' />
                        <Picker.Item label='7' value='7' />
                        <Picker.Item label='8' value='8' />
                        <Picker.Item label='9' value='9' />
                        <Picker.Item label='10' value='10' />
                        <Picker.Item label='11' value='11' />
                        <Picker.Item label='12' value='12' />
                    </Picker>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Pickup at store?</Text>
                    <Switch
                        style={styles.formItem}
                        value={this.state.pickup}
                        trackColor={{true: '#1faa00', false: null}}
                        onValueChange={value => this.setState({pickup: value})}
                    />
                </View>
                <View style={styles.formRow2}>
                    <Text style={styles.formLabel}>Pick Date</Text>
                    <View style={styles.formBtn}>
                        <Button 
                            onPress={()=> this.showDateCalendar()}
                            title={this.state.date.toLocaleDateString('en-US')}
                            color="#1faa00"
                            accessibilityLabel="Tap me to select a pickup date"
                        />
                    </View>
                    <View style={styles.formBtn}>
                        <Button 
                            onPress={() => this.showTimeCalendar()}
                            title={this.state.date.toLocaleTimeString('America/New_York')}
                            color="#1faa00"
                            accessibilityLabel="Tap me to select a pickup time"
                
                        />
                    </View>
                </View>
                {this.state.showCalendar && (
                    <DateTimePicker 
                        value={this.state.date}
                        display='default'
                        mode={this.state.mode}
                        onChange={(event, selectedDate) => {
                            selectedDate && this.setState({date: selectedDate, showCalendar: false})
                            console.log(Date(selectedDate.timestamp));
                            
                        }}
                        style={styles.formItem}
                    />
                )}
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Your Name</Text>
                    <TextInput style={styles.formItem2} placeholder="name" onChange={name => this.setState({name: name})}/>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Phone #</Text>
                    <TextInput style={styles.formItem2} placeholder="only numbers" onChange={phone => this.setState({phone: phone})}/>
                </View>
                <View style={styles.formRow}>
                    <Button 
                        onPress={() => this.handleOrder()}
                        title='Confirm'
                        color='#1faa00'
                        accessibilityLabel="Tap me to confirm your order"
                    />
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formRow2: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formBtn: {
        margin: 3
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    formItem2: {
        borderBottomWidth: 1,
        width: 160,
        borderBottomColor: 'rgb(50,50,50)',
        backgroundColor: 'rgba(100,100,100,.1)',
        paddingLeft: 10
    },
    pickerLabel: {
        flexBasis: 70
    }
})

export default connect(mapStateToProps)(Order);