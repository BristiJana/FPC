import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, StyleSheet,FlatList,Image ,Dimensions,Modal, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LineChart } from 'react-native-chart-kit';

const Weather=(props)=>{
  
    
    const wedata=props.wedata;

   
    const sz=wedata.length

   const temp=wedata[sz-1].temperature;
   const cltype=wedata[sz-1].precipType;
   const cldate=wedata[sz-1].validTimeUtc;
   const formatDate = (externalDate) => {
    
    return new Date(externalDate).toDateString()
  };
   const date = new Date(cldate * 1000); 
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const formattedDate = formatDate(`${year}-${month}-${day}`);
 
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
  //  const weekdayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  //  const months=["","Jan","Feb","March","Apr","May","June","July","Aug","Sep","Oct","Nov","Dec"];
  //  const weekday = weekdayNames[date.getDay()-4];
  //  const year = date.getFullYear();
 
  //  console.log(date.getDay())
 
  //  const formattedDate = `${day} ${weekday}, ${year}`;
  
 
     return(<>
 <View style={styles.wecontainer}>
   <View style={styles.mainwc1}>
   <View  style={styles.wc1}> 
   <Text style={{color:"white"}}>Today</Text>
       <Text style={styles.todayTempText}>{temp[8]}{temp[9]}` -{temp[1]}{temp[2]}`C</Text></View>
      
    
     <View style={styles.wc1}>
      <Image
         source={cltype=='rain' ?  require('../../assets/crpr.jpg'):require('../../assets/crps.png')}
         style={styles.climage}
       />
       <Text style={styles.dt}>{formattedDate}</Text>
       </View> 
       
       </View><View  style={styles.secwc1}>
       <Text style={{color:"white"}}>Humidity: {wedata[14].relativeHumidity}%</Text>
       <Text style={{width:300, textAlign:'center',color:"white"}}>{wedata[14].narrative}</Text>
       </View>
       <View  style={{paddingTop:15}}>
         <Text style={styles.temhead}>Temperature</Text>
        
         <FlatList
  horizontal
  data={wedata}
  keyExtractor={(item, index) => index.toString()} // Adding a keyExtractor
  contentContainerStyle={{ paddingRight: 20 }} // Adjusting container style for right padding
  renderItem={({ item }) =>{ 

    const anydt=item.validTimeUtc;
   
    const datein = new Date(anydt * 1000); 
   const yearin = datein.getFullYear();
   const monthee = String(datein.getMonth() + 1).padStart(2, '0');
   const daye = String(datein.getDate()).padStart(2, '0');
   const formee = formatDate(`${yearin}-${monthee}-${daye}`);

    
    return(
    <View style={{ marginRight: 20, alignItems: 'center' }}>
  <Text style={{color:"white"}}>
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
      <Text style={{color:"white"}}>
       {formee}
      </Text>
      <Icon name="flag" size={12} color="white" />
      <Text style={{color:"white"}}>{item.WindSpeed} m/s</Text>
    </View>
  )}}
/>

       
       </View>
 
       <View >
         <Text style={styles.temhead}>Rainfall</Text>
         <ScrollView horizontal>
         <LineChart
         data={raindata}
         width={1200}
         height={120}
         chartConfig={{
           backgroundGradientFrom: 'skyblue',
           backgroundGradientTo: 'skyblue',
           decimalPlaces: 2,
           color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
           labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
           propsForDots: {
             r: '6',
             strokeWidth: '2',
           },
           useShadowColorFromDataset: false, 
           xAxisLabelPosition: 'TOP', 
           yAxisLabelPositionLeft: 'BOTTOM', 
         }}
         xLabelsOffset={-10} 
         fromZero
         yAxisInterval={10} 
       /></ScrollView>
         
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
     color:"white"
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
  paddingLeft:60,
  color:"white"
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
      color:"white"
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