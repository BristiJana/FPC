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
  Image,Animated, Easing,ActivityIndicator,TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRoute } from '@react-navigation/native';
import Collapse from '../Other/Collapse';
import Farm from './Farm'
import { ScrollView } from 'react-native-gesture-handler';
const Report = (props) => {
  
  
  const [isExpanded, setIsExpanded] = useState(false);



  const toggleDropdown = () => {
    
    setIsExpanded(!isExpanded);
    
  };
  
  const route = useRoute();
  const { params } = route;
  const FarmID = params ? params.FarmID : null;
 
  const lisdata =  [
  
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
      
      <ScrollView>
       
        <View style={{marginLeft:20,marginRight:20}}>
    <TouchableOpacity onPress={toggleDropdown} style={styles.header}>
        <Text style={styles.headerText}>Image Advisory</Text>
        <Icon name="star" size={20} color="gold" style={styles.staicon} />
        <Icon name={isExpanded ? 'angle-up' : 'angle-down'} size={20} color="black" style={styles.colicon}/>
      </TouchableOpacity>
      
      {isExpanded && (
        <TouchableWithoutFeedback onPress={toggleDropdown}>
          <View style={[styles.dropdown, {  backgroundColor: '#f0f0f0', }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <TouchableOpacity onPress={() => props.navigation.navigate('Uploadpage')}>
    <Image
      source={require('../../assets/camera.jpg')} // Replace with the actual image path
      style={{ width: 50, height: 50, marginRight: 10, borderRadius:50 }}
    /></TouchableOpacity>
    <Text style={{color:'grey', width:250}}>Please upload a image of crop/farm which has any isuues, to get the advisory.</Text>
  </View>
          </View>
        </TouchableWithoutFeedback>
      )}
      </View><View style={styles.colapitem}></View>
      <View style={{marginLeft:20,marginRight:20}}>
    <View  style={styles.header}>
        <Text style={styles.headerText}>Farm Details</Text>
        
      </View>
      
     

          <View style={[styles.dropdown, {  backgroundColor: '#f0f0f0'}]}>
         <View >
    <Farm farmid={FarmID}/></View>
  </View>
          
        
      
      </View><View style={styles.colapitem}></View>

     {
     <FlatList
        data={lisdata}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View key={item.id} >
          <Collapse val={item} farm={FarmID} nav={props.navigation}/>
          <View style={styles.colapitem}></View>
          </View>
         
        )}
          
          />}
     </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonContainer:
  {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
  } ,
  row: {
    justifyContent: 'space-between',
  },
  card: {
   
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 4,
    margin: 4,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    width:150,
   
  },
  popupContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    textAlign:'center',
    justifyContent:'center',
    alignItems:"center"
  },
  horizontalLine:{
    borderBottomWidth:1,
    borderBottomColor:'black',

    width:'100%',
    textAlign:'center',
   justifyContent:'center',
   alignItems:'center' 
   
  },
  popupHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color:'black'
  },
  closeButton: {
    position: 'absolute',
    
    right: 10,
    padding: 10,
  },
  datePicker:{
    marginTop:20,
    
  },
  soilcontainer: {
    flex: 1,
    
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 250,
    height: 100,
    resizeMode: 'cover',
  },
  soilheading: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign:"left",
    color:'#35A29F',
    paddingBottom:10,
  },
  soilbuttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  soilbutton: {
    backgroundColor: '#557A46',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    borderRadius: 5,
    width:90,
    paddingLeft:6,
    textAlign:'center'
  },
  soilbuttonText: {
    color: 'white',
    fontSize: 9,
    fontWeight: 'bold',
    textAlign:'center'
  },
  wecontainer: {
   
  },
  flaitem:
  {
color:'black'
  },
  flaty:
  {
    flexDirection: 'row', // Change to 'row'
    alignItems: 'center',
    marginHorizontal: 10,
    
    
  },
  scrollContainer: {
    width: '100%', // Specify the width of your container
    height: 130,  // Specify the height of your container
    
    borderRadius: 8,
    
    borderColor: 'gray',
    overflowY: 'scroll', // Hide content that overflows the container
    marginTop:10
  },
  temhead:{
    fontSize:18,
    fontWeight:'bold',
    color:'black',
    
  },
  secwc1:{
 paddingTop:5,

 textAlign:'center',
 alignItems:'center',
 alignContent:'center'
  },
  dt:
  {
paddingLeft:60
  },

  climage:
  {
 width:40,
 height:40,
 backgroundColor:'skyblue',
 marginLeft:70,
 borderRadius:10,
 marginBottom:8
  },
  calIcon:{

    
    marginTop:1,
    
    fontSize: 25, // Adjust the font size here
    color: 'red',
  },

  mainwc1:
  {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wc1:{

    textAlign:'center',
    paddingLeft:10,
    alignContent:'center',
    alignItems:'center',
    
  },
  todayTempText: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color:'white'
  },
  dayContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 8,
  },
  dayText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  tempText: {
    fontSize: 16,
  },
  rainfallText: {
    fontSize: 16,
    color: 'gray',
  },
  container: {
    flex: 1,
    padding: 20,
    paddingBottom:0,
    paddingTop:14
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 10,
    
    
    marginTop:20,
    backgroundColor: '#d7f7d7',
    padding: 10,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 10,
    marginBottom: 10,
    justifyContent: 'space-between',
  },
 
  headerText: {
    fontWeight: 'bold',
    color:"green"
  },
  colicon:{
    paddingRight:10
  },
  dropdown: {
   
    padding: 10,
    marginBottom:10,
    borderRadius:10
   
  },
  staicon:
  {
    position:'absolute',
    right:45,
  },
  dropdownText: {
    color: 'black',
  },
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