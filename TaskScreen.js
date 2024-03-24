import React, {Component} from "react";
import {
    View,
    Stylesheet,
    TouchableOpacity,
    Image,
    Text,
    StatusBar,
    Alert,
} from "react-native"

import { getAuth } from 'firebase/auth';
import { ref, onValue, increment, update } from 'firebase/database';
import db from '../config';

export default class TaskScreen extends Component{
    
} 