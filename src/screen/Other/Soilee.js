import React, { useState ,useEffect} from 'react';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, StyleSheet,FlatList,Image ,Dimensions,Modal, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LineChart } from 'react-native-chart-kit';
import axios from 'axios';
import Carousel from 'react-native-snap-carousel';
import { Button } from 'react-native-paper';

import DatePicker from 'react-native-date-picker';



const Soilee=(props)=>
  {
    const soildata=props.soildata;
    const [showsmPopup, setShowsmPopup] = useState(false);

const [selectedDate, setSelectedDate] = useState(new Date());
const [selectedImageUrl, setSelectedImageUrl] = useState(null);
const[showPicker,setShowPicker]=useState(false)
const [chartData, setChartData] = useState([]);
const[dateTodisplay,setToDisplay]=useState("");


const handleDateSelect = date => {
  setSelectedDate(date);
  
  const imageUrlByDate = {};
  soildata.forEach(data => {
    const prevdate=data.Date
    const date = new Date(prevdate);
const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

   
    imageUrlByDate[formattedDate] = data.png.sm; 
  });
 
  const formattedDate = date.toISOString().split('T')[0]; // Convert date to 'YYYY-MM-DD' format
  setSelectedImageUrl(imageUrlByDate[formattedDate] || null);
  setToDisplay(formattedDate)
};



const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchChartData = async () => {
  //     const chartDataArray = [];

  //     for (const value of soildata) {
  //       const url = value.zonalStats.sm;

  //       try {
  //         const response = await fetch(url);
  //         if (response.ok) {
  //           const data = await response.json();
  //           chartDataArray.push(data.mean);
  //         } else {
  //           console.error(`Error fetching data from ${url}, status: ${response.status}`);
  //           chartDataArray.push(0); // You can set a default value in case of an error
  //         }
  //       } catch (error) {
  //         console.error(`Error fetching data from ${url}: ${error}`);
  //         chartDataArray.push(0); // You can set a default value in case of an error
  //       }
  //     }

  //     setChartData(chartDataArray);
  //     setLoading(false);
  //   };

  //   fetchChartData();
  // }, [soildata]);

// ...

const handleget = async (value)=>{
 
  try {
    const url = value.zonalStats.sm;
    const response = await axios.get(url);
    console.log("handle get ", response.data);
    const parsedDataArray = response.data;

    // Check if the response data array is not empty
    if (parsedDataArray && parsedDataArray.length > 0) {
      const meanValue = parseFloat(parsedDataArray[0].mean);
      return meanValue;
    } else {
      return null;
    }
  } catch (error) {
    console.log(`Error fetching data: ${error}`);
    return null;
  }

}
    const sldata = {
      labels: soildata.map((value)=>{
        const curr= value.Date
        const dateee = new Date(curr);
        const formattedDateee = `${dateee.getFullYear()}-${String(dateee.getMonth() + 1).padStart(2, '0')}-${String(dateee.getDate()).padStart(2, '0')}`;
       

        return (formattedDateee)
      }),

      
      datasets: [
        {
          // data: [45,89,0,12,78,89,55,78,122,45],
          
          data:soildata.map((value) => {
            const dataFromHandleGet = handleget(value);
            console.log("hey")
            console.log("Data from handleget:", dataFromHandleGet);
            // const meanValues = dataFromHandleGet.map(item => parseFloat(item.mean));
            return (0)
          }),

          color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`, 
          strokeWidth: 2,
        },
        
        
      ],
    };
  
  const sz=soildata.length-1;
    const url=soildata[sz].png
    // const urlag=soildata[sz].zonalStats
    const srcimg=url.sm
    const curr=soildata[sz].Date
    const dateee = new Date(curr);
    const formattedDateee = `${dateee.getFullYear()}-${String(dateee.getMonth() + 1).padStart(2, '0')}-${String(dateee.getDate()).padStart(2, '0')}`;
    console.log(srcimg)
    
    const last6Objects = soildata.slice(-6);
    
    const renderCard = ({ item }) =>{
      
      const urli=item.png
    // const urlag=soildata[sz].zonalStats
    const itimg=urli.sm
    const dtr=item.Date
    const dtre = new Date(dtr);
    const ftr = `${dtre.getFullYear()}-${String(dtre.getMonth() + 1).padStart(2, '0')}-${String(dtre.getDate()).padStart(2, '0')}`;
   
     return (
      <View style={styles.card}>
        
        <Text style={{marginBottom:5,color:'black'}}>{ftr}</Text>
        {itimg =='None'?(<Text style={{color:"black",textAlign:'center',alignSelf:"center"}}>Nothing to display</Text>):(<Image source={{ uri: itimg }} style={{ width:120,height:120}} />)}
        {/* Add more Text components for other key values */}
      </View>
    );}
    
    return (<>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
      <TouchableOpacity onPress={() => setShowPicker(!showPicker)}>
      <Icon name="calendar" style={styles.calIcon} />
      </TouchableOpacity>
      <Text style={{ color:"black",marginLeft:20,marginTop:3}}>{dateTodisplay==""?formattedDateee:dateTodisplay}</Text>
      <TouchableOpacity onPress={() => setShowsmPopup(true)}>
      <Icon name="ellipsis-v" style={{ marginTop:1,
    
    fontSize: 25, 
    color: 'green',marginLeft:160}} /></TouchableOpacity>
    
    </View>
      {showPicker && (
        
       
       
     
        <DatePicker
        date={selectedDate}
        mode="date"
        style={styles.datePicker}
        onDateChange={handleDateSelect}
      />
      )}
       {selectedImageUrl ? (
         selectedImageUrl =='None'?(<Text style={{color:"black",textAlign:'center',alignSelf:"center", marginTop:20}}>Nothing to display</Text>):(<Image source={{ uri: selectedImageUrl }} style={{ width: 300, height: 200 ,marginTop:20}} />)
        ) : (
          <View style={{flex: 1,justifyContent: 'center',alignItems: 'center',alignContent:'center',marginTop:20}}>
        
     {srcimg =='None'?(<Text style={{color:"black",textAlign:'center',alignSelf:"center"}}>Nothing to display</Text>):(<Image source={{ uri: srcimg }} style={{ width:300,height:200}} />)}
      
    </View>
        )}
       {showsmPopup && (
          
          <Modal animationType="slide" transparent visible={showsmPopup}>
           {/* Add the BlurredOverlay component here */}
           
          <View style={styles.popupContainer}>
         <View style={styles.horizontalLine}>
            <Text style={{color:"black",fontWeight:"bold",fontSize:15}}>Previous 6-dates data preview</Text>
          <TouchableOpacity style={styles.closeButton} onPress={() => setShowsmPopup(false)}>
            <Icon name="times" size={22} color="red" />
          </TouchableOpacity></View>
           
           <View style={{textAlign:'center',justifyContent:"center",alignItems:"center",marginTop:20}}>
      
            {/* Add your dropdown date input and other elements here */}
            <FlatList
        data={last6Objects}
        renderItem={renderCard}
        
        numColumns={2} 
        columnWrapperStyle={styles.row} 
      />
          
            
           </View>
          </View>
        </Modal>
          
      )}
      <View style={{marginTop:20}}>
      <Text style={{color:'green',fontWeight:'bold',fontSize:18,marginBottom:20}}>Chart</Text>
    
        
     
            <LineChart
            data={sldata}
              width={300} // Adjust this width as needed
              height={200}
              yAxisLabel={'$'}
              chartConfig={{
                backgroundGradientFrom: '#f0f0f0',
                backgroundGradientTo: '#f0f0f0',
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              bezier
              style={{ borderRadius: 16 }}
              decorator={() => null}
             
            />
          
    
      </View>
    </View>
 </>
  );
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
  
 
  export default Soilee;