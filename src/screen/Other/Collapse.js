import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, StyleSheet,FlatList,Image ,Dimensions,Modal, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LineChart } from 'react-native-chart-kit';
import axios from 'axios';
import Carousel from 'react-native-snap-carousel';
import { Button } from 'react-native-paper';
import Weather from './Weather'
import Soilee from './Soilee'
import Crop from './Crop';
import Lswi from './Lswi';
import Pest from './Pest';
import DatePicker from 'react-native-date-picker';


// Retrieve finUrl from localStorage


// Now you can use the finUrl in your CollapsePage


const { width } = Dimensions.get('window');
const Collapse = (props) => {

  
 

  


  const [isExpanded, setIsExpanded] = useState(false);


const [showsmPopup, setShowsmPopup] = useState(false);

const [selectedDate, setSelectedDate] = useState(new Date());
const [selectedImageUrl, setSelectedImageUrl] = useState(null);
const[showPicker,setShowPicker]=useState(false)
const[display,setDisplay]=useState(<></>);
  const toggleDropdown = () => {
    handlefunction(props.val.id);
    setIsExpanded(!isExpanded);
    
  };

  const handlefunction=(val)=>{
    if(val===1)
    {
      setDisplay(handleimgpress(props.farm))
    }
    else if(val===2)
    {
      handlepostpress(props.farm)
    }
    else if(val===3)
    {
      setDisplay(handlesoilitempress());
    }
    else if(val===4)
    {
      handleweitempress(props.farm);
    }
    else if(val===5)
    {
      handleslpress(props.farm)
    }
    else if(val===6)
    {
      handlecrpress(props.farm)
    }
    else if(val===7)
    {
      handlelspress(props.farm)
    }
    else if(val===8)
    {
      setDisplay(handleirriitempress());
    }
    else if(val===9)
    {
      alert('Crop Calendar')
    }
    else if(val===10)
    {
      handlepesitempress(props.farm)
    }
    else if(val===11)
    {setDisplay(handlemrriitempress());
    }
  }


  const handleirriitempress=  ()=>{
    
    return(<View style={{textAlign:'center',alignItems:'center',alignContent:'center'}}><Text style={{fontWeight:'bold', fontSize:16,color:'grey', textAlign:'center'}}>Farm data under process!</Text></View>)
    
  
  }
  const handlemrriitempress=  ()=>{
    
    return(<View style={{textAlign:'center',alignItems:'center',alignContent:'center'}}><Text style={{fontWeight:'bold', fontSize:16,color:'black', textAlign:'center'}}>Data is under process</Text></View>)
    
  
  }

  const handlepostpress= async (passfarm)=>{
    
   
    const pestUrl=passfarm

      console.log(pestUrl)
     
      
  
  }
  const handlepesitempress= async (passfarm)=>{
    
   
    const pestUrl='https://micro.satyukt.com/cropadvisory/info?key=HsNrsgMzEJYshSvRWfoMUvmDcyRqNPFUH1AA_-HVvek=&farm_id='+passfarm;

      console.log(pestUrl)
    
      try {
        const response = await axios.get(pestUrl);
      console.log(response.data)

      setTimeout(() => {
        if (response.data !== undefined) {
          console.log("Data received, setting state...");
          
          setDisplay(<Pest pesdata={response.data} nav={props.nav}/>);
        } else {
          console.log("Data is undefined");
          setDisplay(<></>)
        }
      }, 5000); // Wait for 2000 milliseconds (adjust as needed)
    } catch (error) {
      alert(`Error fetching data: ${error}`);
      setDisplay(<></>);
    }
      
      

  
  }
  const handleslpress= async (passfarm)=>{
    
   
    const soilUrl= 'https://micro.satyukt.com/api/info?key=HsNrsgMzEJYshSvRWfoMUvmDcyRqNPFUH1AA_-HVvek=&plotName='+passfarm
      console.log(soilUrl)
    
      
      try {
        const response = await axios.get(soilUrl);
      console.log(response.data)

      setTimeout(() => {
        if (response.data !== undefined) {
          console.log("Data received, setting state...");
          
          setDisplay(<Soilee soildata={response.data} />);
        } else {
          console.log("Data is undefined");
          setDisplay(<></>)
        }
      }, 5000); // Wait for 2000 milliseconds (adjust as needed)
    } catch (error) {
      alert(`Error fetching data: ${error}`);
      setDisplay(<></>);
    }
  
  }

  const handlecrpress= async (passfarm)=>{
    
   
    const soilUrl= 'https://micro.satyukt.com/api/info?key=HsNrsgMzEJYshSvRWfoMUvmDcyRqNPFUH1AA_-HVvek=&plotName='+passfarm
      console.log(soilUrl)
    
      
      try {
        const response = await axios.get(soilUrl);
      console.log(response.data)

      setTimeout(() => {
        if (response.data !== undefined) {
          console.log("Data received, setting state...");
          
          setDisplay(<Crop soildata={response.data} />);
        } else {
          console.log("Data is undefined");
          setDisplay(<></>)
        }
      }, 5000); // Wait for 2000 milliseconds (adjust as needed)
    } catch (error) {
      alert(`Error fetching data: ${error}`);
      setDisplay(<></>);
    }
  
  }


  const handlelspress= async (passfarm)=>{
    
   
    const soilUrl= 'https://micro.satyukt.com/api/info?key=HsNrsgMzEJYshSvRWfoMUvmDcyRqNPFUH1AA_-HVvek=&plotName='+passfarm
      console.log(soilUrl)
    
      
      try {
        const response = await axios.get(soilUrl);
      console.log(response.data)

      setTimeout(() => {
        if (response.data !== undefined) {
          console.log("Data received, setting state...");
          
          setDisplay(<Lswi soildata={response.data} />);
        } else {
          console.log("Data is undefined");
          setDisplay(<></>)
        }
      }, 5000); // Wait for 2000 milliseconds (adjust as needed)
    } catch (error) {
      alert(`Error fetching data: ${error}`);
      setDisplay(<></>);
    }
  
  }

  
  
 
  const handleweitempress= async (passfarm)=>{
    
    const WeatherUrl='https://micro.satyukt.com/weather/data/daypart?key=HsNrsgMzEJYshSvRWfoMUvmDcyRqNPFUH1AA_-HVvek=&farm_id='+passfarm;

      console.log(WeatherUrl)
    
      try {
        const response = await axios.get(WeatherUrl);
      console.log(response.data)

      setTimeout(() => {
        if (response.data !== undefined) {
          console.log("Data received, setting state...");
          
          setDisplay(<Weather wedata={response.data} />);
        } else {
          console.log("Data is undefined");
          setDisplay(<></>)
        }
      }, 5000); // Wait for 2000 milliseconds (adjust as needed)
    } catch (error) {
      alert(`Error fetching data: ${error}`);
      setDisplay(<></>);
    }
  
     
    
  
  }
  const handleimgpress=  (passfarm)=>{
    
    return(<View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <TouchableOpacity onPress={() => props.nav.navigate('Uploadpage')}>
    <Image
      source={require('../../assets/camera.jpg')} // Replace with the actual image path
      style={{ width: 50, height: 50, marginRight: 10, borderRadius:50 }}
    /></TouchableOpacity>
    <Text style={{color:'grey', width:250}}>Please upload a image of crop/farm which has any isuues, to get the advisory.</Text>
  </View>)
    
  
  }

  const handlesoilitempress=  ()=>{
    
    return(<View style={styles.soilcontainer}>
      <Text style={styles.soilheading}>Soil Health Report PDF</Text>
      <View style={styles.soilbuttonContainer}>
        <TouchableOpacity style={styles.soilbutton}>
        <View style={{justifyContent:'space-between',flexDirection:'row',alignItems:'center'}}>
        <Icon name="file" size={9} color="white"  />
          <Text style={styles.soilbuttonText}>View</Text></View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.soilbutton}>
        <View style={{justifyContent:'space-between',flexDirection:'row',alignItems:'center'}}>
        <Icon name="download" size={9} color="white"  />
          <Text style={styles.soilbuttonText}>Download</Text></View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.soilbutton}>
          <View style={{justifyContent:'space-between',flexDirection:'row',alignItems:'center'}}>
        <Icon name="refresh" size={9} color="white"  />

          <Text style={styles.soilbuttonText}>Regenerate</Text></View>
        </TouchableOpacity>
      </View>
    </View>)
    
  
  }

  
  return (<>
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleDropdown} style={styles.header}>
        <Text style={styles.headerText}>{props.val.value}</Text>
        <Icon name="star" size={20} color="gold" style={styles.staicon} />
        <Icon name={isExpanded ? 'angle-up' : 'angle-down'} size={20} color="black" style={styles.colicon}/>
      </TouchableOpacity>
      {isExpanded && (
        <TouchableWithoutFeedback onPress={toggleDropdown}>
          <View style={[styles.dropdown, {  backgroundColor: props.val.id===4?'skyblue':'#f0f0f0', }]}>
            <Text style={styles.dropdownText}>{display}</Text>
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
   </>
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

export default Collapse;
