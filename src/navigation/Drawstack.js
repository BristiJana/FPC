import {
    createStackNavigator,
  } from '@react-navigation/stack';
  import React from 'react';
  
  import Home from '../screen/Auth/Home';
  import DrawPage from '../screen/Auth/DrawPage';
  import Report from '../screen/Auth/Report';
  import Uploadpage from '../screen/Auth/Uploadpage';
  import Pestdis from '../screen/Auth/Pestdis'
  const Stack = createStackNavigator();
  const Drawstack = ({navigation}) => {
    const navigationOptions = {
      headerShown: true,
      gestureEnabled: false,
    };
    return (
      <Stack.Navigator screenOptions={navigationOptions}>
        <Stack.Screen
          component={Home}
          name="Home"
          options={{headerShown: false}}
          navigation={navigation}
        />
        <Stack.Screen
          component={DrawPage}
          name="DrawPage"
          options={{headerShown: false}}
          navigation={navigation}
        />
         <Stack.Screen
          component={Report}
          name="Report"
          options={{headerShown: false}}
          navigation={navigation}
        />
         <Stack.Screen
          component={Uploadpage}
          name="Uploadpage"
          options={{headerShown: false}}
          navigation={navigation}
        />
        <Stack.Screen
          component={Pestdis}
          name="Pestdis"
          options={{headerShown: false}}
          navigation={navigation}
        />
      </Stack.Navigator>
    );
  };
  
  export default Drawstack;
  
  