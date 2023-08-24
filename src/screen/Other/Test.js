import React, { useRef,useState } from 'react';
import { View, StyleSheet ,TouchableOpacity,Text} from 'react-native';

const  Test = (props) => {
  


  // Set the initial region to center around the first coordinate
  

  return (
    <View style={styles.container} >
     
     <TouchableOpacity onPress={() => props.nav.navigate('Farm')}>
        <Text>Try me</Text>
    </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default Test;

