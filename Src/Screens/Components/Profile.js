import React, { useEffect, useState, useRef } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    Platform,
    Switch,
    TouchableOpacity,
    View,
    Modal,
    TextInput,
    FlatList,
    LogBox,
    Image,
    Dimensions
} from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

import Icon from "react-native-vector-icons/FontAwesome";

const STATUSBAR_HEIGHT = StatusBar.currentHeight;

import FeatherIcon from "react-native-vector-icons/Feather";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import MaterialIconsIcon from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";

import * as Color from '../../Utilitys/Colors';

const Profile = (props) => {

    const close = () => {

        props.callback(false);
    }

    LogBox.ignoreAllLogs(true);
    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={props.visible}
                onRequestClose={() => {
                    close()
                }}
            >
                <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.6)', justifyContent: 'center', alignItems: 'center' }}>

                    <View style={{ width: '90%', flex: props.Orientation == "Portrait" ? 0.3 : 0.7, padding: 30, borderRadius: 10, backgroundColor: Color.WHITE }}>

                        <Icon name="close" onPress={() => { close() }} style={{ position: 'absolute', right: 20, top: 10, fontSize: 25, color: Color.PRIMARY_DARK }}></Icon>

                        <Image style={{ height: 100, marginTop: 10, width: 100, resizeMode: 'cover', alignSelf: 'center' }} source={props.userdetails.ProfileImage} />

                        <Text style={{ fontSize: 18, marginTop: 10, letterSpacing: 0.3, alignSelf: 'center', fontWeight: 'bold', color: Color.TextColor }}>{props.userdetails.FirstName} {props.userdetails.LastName}</Text>

                        <Text style={{ fontSize: 16, marginTop: 10, letterSpacing: 0.3, alignSelf: 'center', fontWeight: 'normal', color: Color.BorderColor }}>{props.userdetails.Email}</Text>

                    </View>

                </View>
            </Modal>
        </>
    );
};

export default Profile;