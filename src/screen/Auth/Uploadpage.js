import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, StyleSheet,FlatList,Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import axios from 'axios';
const Uploadpage = (props) => {
  
  return (
    <View style={styles.container}>
      <Text style={styles.texti}>Please upload a image of crop/farm which has any issues, to get the advisory.</Text>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          padding: 10,
          borderRadius: 25,
        }}
      >
        <Icon name="arrow-left" size={20} color="white" />
      </TouchableOpacity>
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

