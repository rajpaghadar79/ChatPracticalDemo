/**
 * @format
 */

 import {AppRegistry, Text, TextInput} from 'react-native';
 import App from './App';
 import React from 'react';
 import { Provider } from 'react-redux';
 import {name as appName} from './app.json';
 
 import { PersistGate } from 'redux-persist/integration/react';
 import { store, persistor } from './Src/Redux/Store';
 
 Text.defaultProps = Text.defaultProps || {};
 Text.defaultProps.allowFontScaling = false;
 
 TextInput.defaultProps = TextInput.defaultProps || {};
 TextInput.defaultProps.allowFontScaling = false;
 
 const Root = () => {
     return (
         <Provider store={store}>
             <PersistGate loading={null} persistor={persistor}>
                 <App />
             </PersistGate>
         </Provider>
     );
 };
 
 AppRegistry.registerComponent(appName, () => Root);
