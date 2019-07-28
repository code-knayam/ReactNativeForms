import React, {Component} from 'react';
import {
  StyleSheet,  
} from 'react-native';

import { Text, View } from 'react-native';
import { MyForm } from './components/MyForm.js';

export default class App extends Component {
	styles = StyleSheet.create({
		view: {
			flex: 1,
			backgroundColor: 'white',
			color: '#fff'
		}
	});
	
	render() {
		return (
			<View style={this.styles.view}>
				
				<MyForm />
			</View>
		);
	}
};
