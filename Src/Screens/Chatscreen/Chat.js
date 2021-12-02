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
    TextInput,
    FlatList,
    LogBox,
    Image,
    Dimensions
} from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const STATUSBAR_HEIGHT = StatusBar.currentHeight;

import FeatherIcon from "react-native-vector-icons/Feather";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import MaterialIconsIcon from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";

import { connect, useDispatch, useSelector } from 'react-redux';

import * as Color from '../../Utilitys/Colors';

import * as Actions from "../../Redux/actions";

import Profile from "../Components/Profile";

const Chat = () => {

    const state = useSelector(state => state);
    const dispatch = useDispatch();

    const [isEnabled, setIsEnabled] = useState(false);

    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);

        if (isEnabled == false) {
            dispatch(Actions.Store_UserID(2))
        }
        else {
            dispatch(Actions.Store_UserID(1))
        }

    }

    const [OrientationStatus, setOrientationStatus] = useState("")

    const [message, setmessage] = useState("");

    const [messages, setmessages] = useState("");

    const [User, setUser] = useState({});

    const flatlistRef = useRef();

    const [modalVisible, setModalVisible] = useState(false);


    useEffect(() => {

        let userlist = state.Users;

        console.log(" userlist ==>>  ", userlist)

        let userdetails = userlist.filter((item) => item.Id == state.SelectedUserId)

        setUser(userdetails[0])

        console.log(" User ==>>  ", User)

        return () => {
            // cleanup
        }
    }, [state.SelectedUserId])

    useEffect(() => {
        setmessages(state.Messages)
        return () => {
            // cleanup
        }
    }, [state.Messages])

    const SendMessage = () => {

        let old_message = state.Messages;

        let params = [{
            Id: User.Id,
            Message: message,
        }]

        setmessages(old_message.concat(params))

        dispatch(Actions.Store_Message(old_message.concat(params)))

        setmessage("")

        flatlistRef.current.scrollToEnd({ animating: true });
    }

    const DetectOrientation = (width, height) => {

        if (width > height) {
            // Write Your own code here, which you want to execute on Landscape Mode.
            setOrientationStatus("Landscape");
        }
        else {
            // Write Your own code here, which you want to execute on Portrait Mode.
            setOrientationStatus("Portrait");

        }

    }

    const getResponse = (result) => {
        setModalVisible(result)
    }

    LogBox.ignoreAllLogs(true);
    return (
        <>
            <View style={{ flex: 1, backgroundColor: Color.WHITE }} onLayout={(event) => {
                DetectOrientation(event.nativeEvent.layout.width, event.nativeEvent.layout.height)
            }}>

                <View style={{ height: Platform.OS == 'android' ? 0 : STATUSBAR_HEIGHT, backgroundColor: Color.WHITE, }}>
                    <SafeAreaView >
                        <StatusBar hidden={false} barStyle='dark-content' backgroundColor={Color.WHITE} animated={true} />
                    </SafeAreaView>
                </View>

                <View style={{ height: 50, flex: OrientationStatus == "Portrait" ? 0.15 : 0.2, backgroundColor: Color.WHITE, justifyContent: 'center', alignItems: 'center' }}>

                    <MaterialIconsIcon name="arrow-back" style={{ position: 'absolute', left: 10, zIndex: 1, color: Color.PRIMARY_DARK, fontSize: 25, }} />

                    <View style={{ height: 50, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', }}>

                        <Text style={{ fontSize: 18, letterSpacing: 0.3, fontWeight: 'bold', color: Color.TextColor }}>{User.FirstName} {User.LastName}</Text>
                        <Text style={{ fontSize: 13, letterSpacing: 0.2, color: Color.Placholder }}>Online</Text>

                    </View>

                    <Switch
                        style={{ position: 'absolute', right: 65, zIndex: 1 }}
                        trackColor={{ false: Color.GRAY, true: Color.GRAY }}
                        thumbColor={isEnabled ? Color.PRIMARY_DARK : Color.WHITE}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />

                    <TouchableOpacity activeOpacity={0.8} onPress={() => { setModalVisible(true) }} style={{ height: 50, position: 'absolute', right: 10, zIndex: 1, justifyContent: 'center', alignItems: 'center' }}>

                        <View style={{ height: 45, width: 45, borderRadius: 22.5, backgroundColor: Color.WHITE, overflow: 'hidden' }}>

                            <Image style={{ height: 45, width: 45, resizeMode: 'cover' }} source={User.ProfileImage} />

                        </View>

                        <View style={{ position: 'absolute', top: 5, right: 2.5, zIndex: 1, height: 12, width: 12, borderRadius: 6, backgroundColor: "lightgreen", borderWidth: 2.5, borderColor: Color.WHITE }} />

                    </TouchableOpacity>

                </View>

                <View style={{ flex: 1 }}>
                    <FlatList
                        style={{ flex: 1 }}
                        ref={flatlistRef}
                        scrollEnabled
                        data={messages}
                        renderItem={({ item, index }) =>
                            item.Id != User.Id ?
                                <View style={{ marginRight: 80, paddingLeft: 20, paddingRight: 20, paddingBottom: 8, paddingTop: 8, marginLeft: 15, marginTop: index == 0 ? 10 : 5, marginBottom: 10, alignSelf: 'flex-start', backgroundColor: Color.WHITE, shadowColor: "#000", shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.36, shadowRadius: 6.68, elevation: 11, borderRadius: 18 }}>
                                    <Text style={{ color: Color.BLACK, fontSize: 15 }}>{item.Message}</Text>
                                </View>
                                :
                                <View style={{ marginLeft: 80, paddingLeft: 20, paddingRight: 20, paddingBottom: 8, paddingTop: 8, marginRight: 15, marginTop: 5, backgroundColor: Color.PRIMARY_DARK, alignSelf: 'flex-end', borderRadius: 18, marginBottom: 5 }}>
                                    <Text style={{ color: Color.WHITE, fontSize: 15 }}>{item.Message}</Text>
                                </View>
                        }
                    />
                </View>

                <View style={{ flex: OrientationStatus == "Portrait" ? 0.12 : 0.22, height: 60, width: "100%", flexDirection: 'row', alignItems: 'center', backgroundColor: Color.WHITE, shadowColor: Color.BLACK, shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.34, shadowRadius: 6.27, elevation: 10, }} >

                    <MaterialCommunityIconsIcon name="emoticon" style={{ fontSize: 25, color: Color.BLACK, marginLeft: 13 }} />

                    <View style={{ flex: 0.99 }}>

                        <TextInput
                            style={{ height: 40, flex: 1, fontSize: 14, color: Color.BLACK, paddingLeft: 10, paddingRight: 10 }}
                            underlineColorAndroid="transparent"
                            placeholder="Type message"
                            value={message}
                            placeholderTextColor="rgba(0, 0, 0, 0.5)"
                            onChangeText={text => {
                                setmessage(text)
                            }}
                        />

                    </View>

                    <TouchableOpacity activeOpacity={0.9} disabled={message.trim() == "" ? true : false} onPress={() => { SendMessage() }} style={{ width: 40, height: 40, backgroundColor: Color.PRIMARY_DARK, borderRadius: 20, marginRight: 10, justifyContent: 'center', alignItems: 'center' }}>

                        <FeatherIcon name="corner-down-right" style={{ fontSize: 16, color: Color.WHITE }} />

                    </TouchableOpacity>

                </View>

                <Profile visible={modalVisible} userdetails={User} Orientation={OrientationStatus} callback={getResponse.bind()} />

            </View>
        </>
    );
};

export default connect()(Chat);