import React, { Component } from 'react';
import { Settings, StyleSheet } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { RFValue } from 'react-native-responsive-fontsize';
import Feed from '../screens/Feed';
import CreateStory from '../screens/CreateStory';

import { getAuth } from 'firebase/auth';
import { ref, onValue } from 'firebase/database';
import db from '../config';
import ScheduleScreen from '../screens/ScheduleScreen';
import TaskScreen from '../screens/TaskScreen';
import notes from '../screens/notes';

const Tab = createMaterialBottomTabNavigator();

export default class BottomTabNavigator extends Component {
	constructor(props) {
		super(props);
		this.state = {
			light_theme: true,
		};
	}

	componentDidMount() {
		let theme;
		const auth = getAuth();
		const userId = auth.currentUser.uid;

		onValue(ref(db, '/users/' + userId), (snapshot) => {
			theme = snapshot.val().current_theme;
			this.setState({
				light_theme: theme === 'light' ? true : false,
			});
		});
	}

	renderSettings = (props) => {
		return <Settings setUpdateToFalse={this.removeUpdated} {...props} />;
	};

	renderStory = (props) => {
		return <Schedule setUpdateToTrue={this.changeUpdated} {...props} />;
	};

	changeUpdated = () => {
		this.setState({ isUpdated: true });
	};

	removeUpdated = () => {
		this.setState({ isUpdated: false });
	};

	render() {
		return (
			<Tab.Navigator
				labeled={false}
				barStyle={
					this.state.light_theme ? styles.bottomTabStyleLight : styles.bottomTabStyle
				}
				screenOptions={({ route }) => ({
					tabBarIcon: ({ focused, color, size }) => {
						let iconName;
						if (route.name === 'Settings') {
							 'add circle'
						} else if (route.name === 'Create Story') {
						'add circle'
						} else if (route.name === 'Tasks') {
							'add circle'
						} else if (route.name === 'Notes') {
							'add circle'
						};
						
							
						
					},
					activeTintColor: '#ee8249',
					inactiveTintColor: 'gray',
				})}>
				<Tab.Screen
					name='Settings'
					component={Settings}
					options={{ unmountOnBlur: true }}
				/>
				<Tab.Screen
					name='Schedule'
					component={ScheduleScreen}
					options={{ unmountOnBlur: true }}
				/>
				<Tab.Screen
					name='Tasks'
					component={TaskScreen}
					options={{ unmountOnBlur: true }}
				
				/>
				<Tab.Screen
					name='Notes'
					component={notes}
					options={{ unmountOnBlur: true }}
				
				/>
			</Tab.Navigator>
		);
	}
}

const styles = StyleSheet.create({
	bottomTabStyle: {
		backgroundColor: '#2f345d',
		height: '8%',
		borderTopLeftRadius: RFValue(30),
		borderTopRightRadius: RFValue(30),
		overflow: 'hidden',
		position: 'absolute',
	},
	bottomTabStyleLight: {
		backgroundColor: '#eaeaea',
		height: '8%',
		borderTopLeftRadius: RFValue(30),
		borderTopRightRadius: RFValue(30),
		overflow: 'hidden',
		position: 'absolute',
	},
	
	},
);