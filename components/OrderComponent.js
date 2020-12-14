import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Image,
         Picker, Switch, Button, TextInput, Modal } from 'react-native';
import { Input } from 'react-native-elements';
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
            phone: '',
            message: '',
            pickup: false,
            date: new Date(),
            showCalendar: false,
            mode: 'date',
            showModal: false
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
        // console.log(JSON.stringify(this.state));
        this.toggleModal();
    }

    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }

    resetForm() {
        this.setState({
            menuId: 0,
            quantity: 1,
            name: '',
            phone: '',
            pickup: false,
            date: new Date(),
            showCalendar: false,
            mode: this.mode,
            showModal: false
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
                <View style={{marginHorizontal: 20}}>
                    {/* <Text style={styles.formLabel}>Your Name</Text> */}
                    <Input placeholderTextColor="rgba(0,0,0,.3)" containerStyle={{padding: 0}} inputStyle={{backgroundColor: 'rgba(130,130,130,.1)', paddingLeft: 10}} placeholder="name" onChangeText={nameInput => this.setState({name: nameInput})}/>
                </View>
                <View style={{marginHorizontal: 20}}>
                    {/* <Text style={styles.formLabel}>Phone #</Text> */}
                    <Input placeholderTextColor="rgba(0,0,0,.3)" containerStyle={{padding: 0}} inputStyle={{backgroundColor: 'rgba(130,130,130,.1)', paddingLeft: 10}} placeholder="phone" onChangeText={phoneInput => this.setState({phone: phoneInput})}/>
                </View>
                <View style={styles.formRow}>
                    <Button 
                        onPress={() => this.handleOrder()}
                        title='Confirm'
                        color='#1faa00'
                        accessibilityLabel="Tap me to confirm your order"
                    />
                </View>
                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.showModal}
                    onRequestClose={() => this.toggleModal()}
                >
                    <View style={styles.modal}>
                        <Text style={styles.modalTitle}>Your Order</Text>
                        <View style={{alignItems: 'center'}}>
                            <Image 
                                source={{uri: baseUrl+this.props.menu.menu[this.state.menuId].image}} 
                                style={{height: 150, width: 150}}
                            />
                        </View>
                        <Text style={styles.modalText}>
                            Menu : {this.props.menu.menu[this.state.menuId].name}
                        </Text>
                        <Text style={styles.modalText}>
                            Quantity : {this.state.quantity}
                        </Text>
                        <Text style={styles.modalText}>
                            Pickup at store? : {this.state.pickup ? 'Yes' : 'No'}
                        </Text>
                        <Text style={styles.modalText}>
                            Date & Time : {this.state.date.toLocaleDateString('en-US')} at {this.state.date.toLocaleTimeString({'timeZone': 'America/New_York'})}
                        </Text>
                        <Text style={styles.modalText}>
                            Name : {this.state.name} 
                        </Text>
                        <Text style={styles.modalText}>
                            Phone : {this.state.phone}
                        </Text>
                        <Button 
                            onPress={() => {
                                this.toggleModal();
                                this.resetForm();
                            }}
                            color="#1faa00"
                            title="Submit"
                        />
                    </View>
                </Modal>
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
    inputItem: {
        borderBottomWidth: 1,
        width: 160,
        borderBottomColor: 'rgb(50,50,50)',
        backgroundColor: 'rgba(100,100,100,.1)',
        paddingLeft: 10
    },
    pickerLabel: {
        flexBasis: 70
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#1faa00',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
})

export default connect(mapStateToProps)(Order);