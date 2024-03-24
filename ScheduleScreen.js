import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	SafeAreaView,
	Platform,
	StatusBar,
	Image,
	ScrollView,
    Ionicons,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RFValue } from 'react-native-responsive-fontsize';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Speech from 'expo-speech';
import * as Font from 'expo-font';

import { getAuth } from 'firebase/auth';
import { ref, onValue, increment, update } from 'firebase/database';
import db from '../config';

import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();

let customFonts = {
	'Bubblegum-Sans': require('../assets/fonts/BubblegumSans-Regular.ttf'),
};

export default class ScheduleScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fontsLoaded: false,
			speakerColor: 'gray',
			speakerIcon: 'volume-high-outline',
			light_theme: true,
		};
	}

	async _loadFontsAsync() {
		await Font.loadAsync(customFonts);
		this.setState({ fontsLoaded: true });
	}

	componentDidMount() {
		this._loadFontsAsync();
		this.fetchUser();
	}

	async fetchUser() {
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

	async initiate(title, days, tasks) {
		console.log(title);
		this.setState({
		});
		if (current_color === 'gray') {
			Speech.speak('Here is your upcoming schedule.');
        }

	render() 
		if (!this.props.route.params) {
			this.props.navigation.navigate('HomeScreen');
		} else if (this.state.fontsLoaded) {
			SplashScreen.hideAsync();
			return (
				<View
					style={this.state.light_theme ? styles.containerLight : styles.container}>
					<SafeAreaView style={styles.droidSafeArea} />
					<View style={styles.appTitle}>
						<View style={styles.appIcon}>
							<Image
								style={styles.iconImage}></Image>
						</View>
						<View style={styles.appTitleTextContainer}>
							<Text
								style={
									this.state.light_theme ? styles.appTitleTextLight : styles.appTitleText
								}>
								StudyMate App
							</Text>
						</View>
					</View>
					<View style={styles.ScheduleScreen}>
						<ScrollView
						
						
								
								>
							<View style={styles.dataContainer}>
								<View style={styles.titleTextContainer}>
									<Text
										style={
											this.state.light_theme
												? styles.ScheduleScreenTitleTextLight
												: styles.ScheduleScreenTitleText
										}>
										
									</Text>
									<Text
										style={
											this.state.light_theme
												? styles.tasksTextLight
												: styles.tasksText
										}>
										
									</Text>
									<Text
										
											
										>
										
									</Text>
								</View>
								<View style={styles.iconContainer}>
									<TouchableOpacity
										onPress={() =>
											this.initiateTTS()
                                            }>
										<Ionicons
											name={this.state.speakerIcon}
											size={RFValue(30)}
											color={this.state.speakerColor}
											style={{ margin: RFValue(15) }}
										/>
									</TouchableOpacity>
								</View>
							</View>
							<View style={styles.storyTextContainer}>
								<Text
									style={
										this.state.light_theme ? styles.ScheduleScreenTextLight : styles.ScheduleScreenText
									}>
								</Text>
								<Text
									style={
										this.state.light_theme ? styles.tasksTextLight : styles.tasksText
									}>
								</Text>
							</View>
							<View style={styles.actionContainer}>
								<TouchableOpacity
									>
									<Ionicons
									/>

									<Text
										style={
											this.state.light_theme ? styles.TextLight : styles.Text
										}>
										
									</Text>
								</TouchableOpacity>
							</View>
						</ScrollView>
					</View>
				</View>
			);
		}
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#15193c',
	},
	containerLight: {
		flex: 1,
		backgroundColor: 'white',
	},
	droidSafeArea: {
		marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : RFValue(35),
	},
	appTitle: {
		flex: 0.07,
		flexDirection: 'row',
	},
	appIcon: {
		flex: 0.3,
		justifyContent: 'center',
		alignItems: 'center',
	},
	iconImage: {
		width: '100%',
		height: '100%',
		resizeMode: 'contain',
	},
	appTitleTextContainer: {
		flex: 0.7,
		justifyContent: 'center',
	},
	appTitleText: {
		color: 'white',
		fontSize: RFValue(28),
		fontFamily: 'Bubblegum-Sans',
	},
	appTitleTextLight: {
		color: 'black',
		fontSize: RFValue(28),
		fontFamily: 'Bubblegum-Sans',
	},
	
	shadowOpacity: 0.5,
		shadowRadius: 5,
		elevation: 2,
	
        dateText: {
		fontFamily: 'Bubblegum-Sans',
		fontSize: RFValue(18),
		color: 'white',
	},
	DateTextLight: {
		fontFamily: 'Bubblegum-Sans',
		fontSize: RFValue(18),
		color: 'black',
	},
	iconContainer: {
		flex: 0.2,
	},
	titleTextContainer: {
		padding: RFValue(20),
	},
	titleText: {
		fontFamily: 'Bubblegum-Sans',
		fontSize: RFValue(15),
		color: 'white',
	},
	titleTextLight: {
		fontFamily: 'Bubblegum-Sans',
		fontSize: RFValue(15),
		color: 'black',
	},
	tasksText: {
		fontFamily: 'Bubblegum-Sans',
		fontSize: RFValue(20),
		color: 'white',
	},
	tasksTextLight: {
		fontFamily: 'Bubblegum-Sans',
		fontSize: RFValue(20),
		color: 'black',
	},
	actionContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		margin: RFValue(10),
	},


});

