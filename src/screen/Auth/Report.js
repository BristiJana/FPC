import React, { useState,useEffect,useRef ,useCallback} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  Image,Animated, Easing,ActivityIndicator
} from 'react-native';

import { useRoute } from '@react-navigation/native';
import Collapse from '../Other/Collapse';
const Report = (props) => {
  
  const [showPopup, setShowPopup] = useState(false);
  
  const [isLoading, setIsLoading] = useState(true);
  
  const route = useRoute();
  const { params } = route;
  const FarmID = params ? params.FarmID : null;
 
  const lisdata =  [
    { id: 1, value: 'Image Advisory' },
    { id: 2, value: 'Farm Details' },
    { id: 3, value: 'Soil Health' },
    { id: 4, value: 'Weather Forecast' },
    { id: 5, value: 'Soil Moisture (SM)' },
    { id: 6, value: 'Crop Health' },
    { id: 7, value: 'LSWI' },
    { id: 8, value: 'Irrigation' },
    { id: 9, value: 'Crop Calendar' },
    { id: 10, value: 'Pest and Disease Forewarning' },
    {id:11,value:'More Information'}
  ];
  

  useEffect(() => {
   
  }, []);

  
  return (
    <SafeAreaView style={styles.container}>
     
     
     <FlatList
        data={lisdata}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View key={item.id} >
          <Collapse val={item} farm={FarmID}/>
          <View style={styles.colapitem}></View></View>
         
        )}
          
          />
     
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  maincontainer:
  {
    marginTop:12,
  },
  colapitem: {
    borderBottomWidth: 1,
    borderColor: 'grey', 
   marginLeft:26,
   marginRight:26,
  },
  scrollBox: {
    width: 200,             
               
    overflow: 'hidden',
    
  },
  farmlast:
  {
marginTop:3,
marginLeft:32
  },
  mpst:
  {
marginRight:5
  },
  mpst1:
  {
marginRight:4,
marginTop:6,
marginLeft:6

  },
  mpstt:
  {
marginRight:20
  },
  farmtext:
  {
    fontWeight:"bold",
    color:"#000",
    fontSize:17
  },
  farmsm:
  {
paddingBottom:2,
paddingTop:2
  },
  addpopImage:
  {
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },
  addpopText:
  {
    color:"black",
    fontWeight:"bold"
  },
  flatheadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 15,
    borderBottomColor: '#ccc',
  },
  addText: {
    color: 'blue',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 6,
  },
  marqueeText: {
   
    
    
    padding: 10,
    paddingTop:0,
  },
  addimgId:{
    color:'white',
    fontWeight: 'bold',
    paddingTop:35,
    fontSize:11,
    paddingLeft:60
  },
  addimgText:
  {color: 'black',
  fontWeight: 'bold',
  textAlign: 'center',
  paddingTop: 8,},
  icon: {
    marginRight: 8,
  },
  farmarc:
  {
    color:"green",
    fontSize:10
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#006400',
  },
  sheading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'blue',
  },
  addButtonImage: {
    width: 100,
    height: 100,
    marginLeft: 10,
    borderRadius: 10,
  },
  addButtonImageside:
  {
    width: 100,
    height: 100,
    borderRadius:10,
    padding:0,
    marginRight:10,
    paddingTop:7,
    marginLeft:2,
  },
  addButton: {
    borderRadius: 10,
  },
  
  border: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
    marginLeft: 8,
  },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 10,
    borderRadius: 10,
  },
  farmItem: {
  
    
    
    width:330,
    marginLeft:16,
    marginBottom:17,
   borderRadius:10,
   height:100,
  
  paddingTop:0,
  paddingLeft:10,
  elevation: 5,
shadowColor:'#000'

  },
  farmitemcontainer:
  {
    flexDirection: 'row', 
    alignItems: 'center',
  },
  farmitemcontainer1:
  {
    flexDirection: 'row', 
    
  },
  popupContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  popupHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
  },
  addButtonBackground: {
    width: 100,
    height: 100,
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    alignContent:"center",
    alignSelf:'center'
  },
});

export default Report;