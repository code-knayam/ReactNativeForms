import React, { Component } from 'react';
import { Button, ThemeProvider, Avatar, Input, CheckBox, Rating } from 'react-native-elements';
import { View, ToastAndroid } from 'react-native';
import { Icon } from 'react-native-elements'

import {
	StyleSheet,  
	ActivityIndicator
  } from 'react-native';

export class MyForm extends Component {

	constructor(props) {
		super(props);
		this.onPress = this.onPress.bind(this);
	}

	state = {
		isLoading: false,
		isChecked: false,
		name: '',
		email: '',
		number: '',
		rating: 3
	}

	theme = {
		Button: {			
		  titleStyle: {
				color: 'white',			  
		  },
		},
	};
	
	formConfig = [
		{
			type: 'AVATAR',
			url: 'https://www.bsn.eu/wp-content/uploads/2016/12/user-icon-image-placeholder-300-grey.jpg'
		},
		{
			type: 'TEXT',
			label: 'Display Name',
			key: 'name'
		},
		{
			type: 'TEXT',
			label: 'Email',
			key: 'email'
		},
		{
			type: 'TEXT',
			label: 'Mobile Number',
			key: 'number'
		},
		{
			type: 'RADIO',
			label: 'Agree to Terms & Conditions',			
		},
		{
			type: 'RATING'
		},
		{
			type: 'BUTTON',
			label: 'SUBMIT'
		}
	]

	onPress() {		
		this.setState({ isLoading: true });
		if (this.isValid()) {			
			setTimeout(() => {				
				this.setState({isLoading: false});
				ToastAndroid.show('Data Submitted', ToastAndroid.LONG);
			}, 2000 )
		} else {
			ToastAndroid.show('Enter valid data', ToastAndroid.LONG);
			this.setState({isLoading: false});
		}		
	}

	isValid() {
		valid = true
		Object.keys(this.state).forEach(key => {
			if (key != 'isLoading') {
				
				item = this.state[key]
				if (item === '') {
					valid = false;
					return
				}
			}
		})
		return valid
	}
	  
	render() {
		myForm = []

		this.formConfig.forEach((config, i) => {
			let formElement;
			switch (config.type) {
				case 'AVATAR':
					formElement = <View key={i} style={{marginLeft: 'auto', marginRight: 'auto', marginTop: 40}}>
						<Avatar
							rounded
							source={{ uri: config.url }}
							style={{ width: 50, height: 50, borderRadius: 50 }}
						/>
					</View>
					break;
				case 'TEXT':
					key = config.key
					formElement = <View key={i} style={{marginTop: 20}}>
						<Input
							inputStyle={{ marginTop: 40 }}
							label={config.label}
							labelStyle={{ color: '#333', fontSize: 16, marginBottom: -40 }}
							onChangeText={(text) => {
								this.setState({ [config.key]: text })
							}}
						/>
					</View>
					break;
				case "RADIO":
					formElement =
						<View key={i}>
							<CheckBox
								center
								title={config.label}
								iconLeft
								checked={this.state.isChecked}
								onPress={() => this.setState({isChecked: !this.state.isChecked}) }
								/>
						</View>											
					break;
				case 'RATING':
					formElement = <Rating key={i}
						type='star'
						fractions="1"
						ratingCount={5}
						imageSize={30}
						startingValue={this.state.rating}
						showRating
						onFinishRating={(rating) => {this.setState({rating: rating})}}
					/>
					break;
				case 'BUTTON':
					formElement = <View key={i} style={{ width: 200, marginTop: 40, marginLeft: 'auto', marginRight: 'auto' }}>
						{!this.state.isLoading ?
							(<Button
								title={config.label}
								onPress={() => this.onPress()}
							/>)
							:
							(<ActivityIndicator style={{padding: 10}} size="large" color="#0000ff" />)
							 }
											
					</View>
					break;
						
			}
			myForm.push(formElement)
		});
		return (

			<View>
				<ThemeProvider theme={this.theme}>
					{myForm}
				</ThemeProvider>
			</View>
		);
	}
}