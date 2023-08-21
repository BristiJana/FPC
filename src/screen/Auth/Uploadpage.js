import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, StyleSheet,FlatList,Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import axios from 'axios';
const Uploadpage = (props) => {
  
  return (
    <View style={styles.container}>
      <Text style={styles.texti}>Please upload a image of crop/farm which has any issues, to get the advisory.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center', // Vertical centering
        alignItems: 'center',     // Horizontal centering
      },
      texti: {
        fontSize: 17,
        fontWeight: 'bold',
        color:'grey',
  textAlign:'center',
  marginLeft:20,
  marginRight:20
      },
  
});

export default Uploadpage;
