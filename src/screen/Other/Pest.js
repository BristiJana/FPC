import React, { useState ,useRef} from 'react';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, StyleSheet,FlatList,Image ,Dimensions,Modal, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LineChart } from 'react-native-chart-kit';
import axios from 'axios';

import { Button } from 'react-native-paper';
import DatePicker from 'react-native-date-picker';

import Carousel, {Pagination} from 'react-native-snap-carousel';

export const SLIDER_WIDTH = Dimensions.get('window').width + 30;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);



const Pest= (props)=>
{
  
    const pesdata=props.pesdata
    const iter=pesdata[0].Disease_img_url
    const [index, setIndex] = useState(0);
    const isCarousel = useRef(null);
    const [showsmPopup, setShowsmPopup] = useState(false);

const [selectedDate, setSelectedDate] = useState(new Date());
const [selectedImageUrl, setSelectedImageUrl] = useState(null);
const[showPicker,setShowPicker]=useState(false)

  const num=pesdata.length-1;
  
  const renderItem = ({item}) => {
    return (
      <View
        style={{
          borderWidth: 1,
          padding: 20,
          borderRadius: 20,
          alignItems: 'center',
          backgroundColor: 'white',
        }}>
        <Image source={{uri: item}} style={{width: 200, height: 200}} />
       
      </View>
    );
  };
  
    return(<View style={{alignContent:'center',alignItems:'center',textAlign:'center'}}>
 
    {iter.length > 0 && (<>
           <Carousel
        ref={isCarousel}
        data={iter}
        renderItem={renderItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        onSnapToItem={index => setIndex(index)}
      />
      <Pagination
        dotsLength={iter.length}
        activeDotIndex={index}
        carouselRef={isCarousel}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 8,
          backgroundColor: '#F4BB41',
        }}
        tappableDots={true}
        inactiveDotStyle={{
          backgroundColor: 'black',
          // Define styles for inactive dots here
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      /></>)}
          <View>
            
            <View style={{flexDirection:"row",justifyContent:"space-between"}}>
            <Text style={{color:'blue',fontWeight:'bold',paddingRight:20}}>Date</Text>
            <Text style={{color:'black',fontWeight:'bold'}}> {pesdata[0].Date}</Text></View>
            
            <View style={{flexDirection:"row",justifyContent:"space-between"}}>
            <Text style={{color:'blue',fontWeight:'bold',paddingRight:20}}>Disease Name</Text>
            <Text style={{color:'red',fontWeight:'bold'}}> {pesdata[0].Disease}</Text></View>
            
            <Text style={{color:'blue',fontWeight:'bold',paddingTop:10}}>Affected part</Text>
            <Text style={{color:'black',width:100}}> {pesdata[0].Affected_Part}</Text>
            <Text style={{color:'blue',fontWeight:'bold',paddingTop:10}}>Mode of Spread</Text>
            <Text style={{color:'black',width:300}}> {pesdata[0].Mode_of_Spread}</Text>
            <Text style={{color:'blue',fontWeight:'bold',paddingTop:10}}>Stage of Infection</Text>
            <Text style={{color:'black',width:300}}> {pesdata[0].Stage_of_Infection}</Text>
            <Text style={{color:'blue',fontWeight:'bold',paddingTop:10}}>Pathogen</Text>
            <Text style={{color:'black',width:300}}> {pesdata[0].Pathogen}</Text>
            <Text style={{color:'blue',fontWeight:'bold',paddingTop:10}}>Solution</Text>
            <Text style={{color:'black',width:300}}> {pesdata[0].Solution}</Text>
            
          </View>
          <TouchableOpacity onPress={() => props.nav.navigate('Pestdis',pesdata)}>
          <Text style={{paddingTop:20,color:"blue",fontWeight:"bold"}}>Show {num} more Forewarning--</Text>
     </TouchableOpacity>
     </View>
    )
}

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
  });
  
  export default Pest;