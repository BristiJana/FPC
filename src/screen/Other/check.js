import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, StyleSheet,FlatList,Image ,Dimensions,Modal, ScrollView} from 'react-native';

const Weather=(props)=>{
  
    
const wedata = [{"": "0", "WindSpeed": "10.3", "cloudCover": "100.0", "narrative": "Cloudy skies throughout the day with a chance of rain throughout the day.", "precipChance": "100.0", "precipType": "rain", "qpf": "1.099", "relativeHumidity": "97.5", "sunriseTimeLocal": "2023-06-30", "temperature": "[22.28, 21.17]", "thunderCategory": "Rain, Overcast", "validTimeUtc": "1688063400", "windDirection": "253.4"}, {"": "1", "WindSpeed": "10.3", "cloudCover": "99.9", "narrative": "Cloudy skies throughout the day with a chance of rain throughout the day.", "precipChance": "100.0", "precipType": "rain", "qpf": "1.156", "relativeHumidity": "97.5", "sunriseTimeLocal": "2023-07-01", "temperature": "[22.72, 21.56]", "thunderCategory": "Rain, Overcast", "validTimeUtc": "1688149800", "windDirection": "257.9"}, {"": "2", "WindSpeed": "9.4", "cloudCover": "99.9", "narrative": "Cloudy skies throughout the day with a chance of rain throughout the day.", "precipChance": "100.0", "precipType": "rain", "qpf": "0.889", "relativeHumidity": "97.8", "sunriseTimeLocal": "2023-07-02", "temperature": "[22.72, 21.33]", "thunderCategory": "Rain, Overcast", "validTimeUtc": "1688236200", "windDirection": "257.2"}, {"": "3", "WindSpeed": "7.4", "cloudCover": "99.6", "narrative": "Cloudy skies throughout the day with a chance of rain throughout the day.", "precipChance": "100.0", "precipType": "rain", "qpf": "0.513", "relativeHumidity": "97.9", "sunriseTimeLocal": "2023-07-03", "temperature": "[23.06, 21.44]", "thunderCategory": "Rain, Overcast", "validTimeUtc": "1688322600", "windDirection": "259.7"}, {"": "4", "WindSpeed": "8.3", "cloudCover": "100.0", "narrative": "Cloudy skies throughout the day with a chance of rain throughout the day.", "precipChance": "100.0", "precipType": "rain", "qpf": "0.527", "relativeHumidity": "97.9", "sunriseTimeLocal": "2023-07-04", "temperature": "[22.94, 21.22]", "thunderCategory": "Rain, Overcast", "validTimeUtc": "1688409000", "windDirection": "261.2"}, {"": "5", "WindSpeed": "9.8", "cloudCover": "100.0", "narrative": "Cloudy skies throughout the day with a chance of rain throughout the day.", "precipChance": "100.0", "precipType": "rain", "qpf": "1.285", "relativeHumidity": "98.3", "sunriseTimeLocal": "2023-07-05", "temperature": "[21.94, 21.17]", "thunderCategory": "Rain, Overcast", "validTimeUtc": "1688495400", "windDirection": "253.2"}, {"": "6", "WindSpeed": "9.6", "cloudCover": "100.0", "narrative": "Cloudy skies throughout the day with a chance of rain throughout the day.", "precipChance": "100.0", "precipType": "rain", "qpf": "3.679", "relativeHumidity": "99.1", "sunriseTimeLocal": "2023-07-06", "temperature": "[22.28, 21.17]", "thunderCategory": "Rain, Overcast", "validTimeUtc": "1688581800", "windDirection": "249.1"}, {"": "7", "WindSpeed": "10.1", "cloudCover": "100.0", "narrative": "Cloudy skies throughout the day with a chance of rain throughout the day.", "precipChance": "100.0", "precipType": "rain", "qpf": "1.29", "relativeHumidity": "97.4", "sunriseTimeLocal": "2023-07-07", "temperature": "[22.17, 21.17]", "thunderCategory": "Rain, Overcast", "validTimeUtc": "1688668200", "windDirection": "256.6"}, {"": "8", "WindSpeed": "6.5", "cloudCover": "100.0", "narrative": "Cloudy skies throughout the day with a chance of rain throughout the day.", "precipChance": "100.0", "precipType": "rain", "qpf": "1.126", "relativeHumidity": "98.3", "sunriseTimeLocal": "2023-07-08", "temperature": "[21.44, 21.06]", "thunderCategory": "Rain, Overcast", "validTimeUtc": "1688754600", "windDirection": "256.7"}, {"": "9", "WindSpeed": "7.4", "cloudCover": "99.5", "narrative": "Cloudy skies throughout the day with a chance of rain throughout the day.", "precipChance": "100.0", "precipType": "rain", "qpf": "0.483", "relativeHumidity": "96.6", "sunriseTimeLocal": "2023-07-09", "temperature": "[22.56, 20.94]", "thunderCategory": "Rain, Overcast", "validTimeUtc": "1688841000", "windDirection": "252.0"}, {"": "10", "WindSpeed": "6.7", "cloudCover": "99.2", "narrative": "Cloudy skies throughout the day with a chance of rain throughout the day.", "precipChance": "100.0", "precipType": "rain", "qpf": "0.44", "relativeHumidity": "97.5", "sunriseTimeLocal": "2023-07-10", "temperature": "[22.83, 20.94]", "thunderCategory": "Rain, Overcast", "validTimeUtc": "1688927400", "windDirection": "253.2"}, {"": "11", "WindSpeed": "6.3", "cloudCover": "96.9", "narrative": "Cloudy skies throughout the day with a chance of rain throughout the day.", "precipChance": "100.0", "precipType": "rain", "qpf": "0.555", "relativeHumidity": "96.4", "sunriseTimeLocal": "2023-07-11", "temperature": "[23.44, 21.17]", "thunderCategory": "Rain, Overcast", "validTimeUtc": "1689013800", "windDirection": "257.3"}, {"": "12", "WindSpeed": "6.5", "cloudCover": "99.8", "narrative": "Cloudy skies throughout the day with a chance of rain throughout the day.", "precipChance": "100.0", "precipType": "rain", "qpf": "0.41", "relativeHumidity": "97.3", "sunriseTimeLocal": "2023-07-12", "temperature": "[23.22, 21.56]", "thunderCategory": "Rain, Overcast", "validTimeUtc": "1689100200", "windDirection": "261.3"}, {"": "13", "WindSpeed": "7.6", "cloudCover": "96.7", "narrative": "Cloudy skies throughout the day with a chance of rain throughout the day.", "precipChance": "100.0", "precipType": "rain", "qpf": "0.588", "relativeHumidity": "95.3", "sunriseTimeLocal": "2023-07-13", "temperature": "[23.83, 21.67]", "thunderCategory": "Rain, Overcast", "validTimeUtc": "1689186600", "windDirection": "267.6"}, {"": "14", "WindSpeed": "6.7", "cloudCover": "96.6", "narrative": "Cloudy skies throughout the day with a chance of rain throughout the day.", "precipChance": "100.0", "precipType": "rain", "qpf": "0.527", "relativeHumidity": "96.1", "sunriseTimeLocal": "2023-07-14", "temperature": "[23.94, 21.44]", "thunderCategory": "Rain, Overcast", "validTimeUtc": "1689273000", "windDirection": "267.5"}];

   
    

   const temp=wedata[14].temperature;
   const cltype=wedata[14].precipType;
   const cldate=wedata[14].sunriseTimeLocal;
   
   const date = new Date(cldate);
 
   const day = date.getDate();
   const raindata = {
     labels: wedata.map((value)=>{
      const unixTimestamp = value.validTimeUtc;
      
  const date = new Date(unixTimestamp * 1000); 
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;
      
      
      return (formattedDate)
    }),
     datasets: [
       {
         data: wedata.map((value) => (value.qpf)),
       },
     ],
   };
   const weekdayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
   const months=["","Jan","Feb","March","Apr","May","June","July","Aug","Sep","Oct","Nov","Dec"];
   const weekday = weekdayNames[date.getDay()-4];
   const year = date.getFullYear();
 
   console.log(date.getDay())
 
   const formattedDate = `${day} ${weekday}, ${year}`;
  
 
     return(<>
 <View style={styles.wecontainer}>
   <View style={styles.mainwc1}>
   <View  style={styles.wc1}> 
   <Text>Today</Text>
       <Text style={styles.todayTempText}>{temp[8]}{temp[9]}` -{temp[1]}{temp[2]}`C</Text></View>
      
    
     <View style={styles.wc1}>
     
       <Text style={styles.dt}>{formattedDate}</Text>
       </View> 
       
       </View><View  style={styles.secwc1}>
       <Text>Humidity: {wedata[14].relativeHumidity}%</Text>
       <Text style={{width:300, textAlign:'center'}}>{wedata[14].narrative}</Text>
       </View>
       <View  style={{paddingTop:15}}>
         <Text style={styles.temhead}>Temperature</Text>
         <View style={styles.scrollContainer}>
         <View style={{ flexDirection: 'row', paddingHorizontal: 20 }}>
  {wedata.map((item, index) => (
    <View key={index} style={{ marginRight: 20, alignItems: 'center' }}>
      <Text>
        {item.temperature[8]}
        {item.temperature[9]}` -{item.temperature[1]}
        {item.temperature[2]}`C
      </Text>
     
      <Text>
        {item.sunriseTimeLocal[8]}
        {item.sunriseTimeLocal[9]}{' '}
        {item.sunriseTimeLocal[5] === '0'
          ? months[item.sunriseTimeLocal[6]]
          : item.sunriseTimeLocal[6] === '1'
          ? months[11]
          : months[12]}
      </Text>
     
      <Text>{item.WindSpeed} m/s</Text>
    </View>
  ))}</View>
         {/* <FlatList
  horizontal
  data={wedata}
  keyExtractor={(item, index) => index.toString()} // Adding a keyExtractor
  contentContainerStyle={{ paddingRight: 20 }} // Adjusting container style for right padding
  renderItem={({ item }) => (
    <View style={{ marginRight: 20, alignItems: 'center' }}>
      <Text>
        {item.temperature[8]}
        {item.temperature[9]}` -{item.temperature[1]}
        {item.temperature[2]}`C
      </Text>
      <Image
        source={
          item.precipType === 'rain'
            ? require('../../assets/crpr.jpg')
            : require('../../assets/crps.png')
        }
        style={{
          width: 40,
          height: 40,
          backgroundColor: 'skyblue',
          borderRadius: 10,
          marginBottom: 8,
        }}
      />
      <Text>
        {item.sunriseTimeLocal[8]}
        {item.sunriseTimeLocal[9]}{' '}
        {item.sunriseTimeLocal[5] === '0'
          ? months[item.sunriseTimeLocal[6]]
          : item.sunriseTimeLocal[6] === '1'
          ? months[11]
          : months[12]}
      </Text>
      <Icon name="flag" size={12} color="black" />
      <Text>{item.WindSpeed} m/s</Text>
    </View>
  )}
/> */}

       </View>
       </View>
 
       <View >
         <Text style={styles.temhead}>Rainfall</Text>
        
         
       </View>
        </View>
     </>)
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
   export default Weather