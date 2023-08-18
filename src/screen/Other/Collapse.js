import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, StyleSheet,FlatList,Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import axios from 'axios';
const Collapse = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);
const [wedata,setWedata]=useState([]);
const[display,setDisplay]=useState(<></>);
  const toggleDropdown = () => {
    handlefunction(props.val.id);
    setIsExpanded(!isExpanded);
    
  };

  const handlefunction=(val)=>{
    if(val===1)
    {
      alert('Image Advisory')
    }
    else if(val===2)
    {
      alert('Farm Details')
    }
    else if(val===3)
    {
      alert('Soil Health')
    }
    else if(val===4)
    {
      handleitempress(props.farm);
    }
    else if(val===5)
    {
      alert('Soil Moisture (SM)')
    }

  }
  const handleitempress= async (passfarm)=>{
    
    const WeatherUrl='https://micro.satyukt.com/weather/data/daypart?key=HsNrsgMzEJYshSvRWfoMUvmDcyRqNPFUH1AA_-HVvek=&farm_id='+passfarm;

      console.log(WeatherUrl)
    
      
      try {
        const response = await axios.get(WeatherUrl);
        console.log(response.data)
       setWedata(response.data);
       setDisplay(handleWeather());

      } catch (error) {
        alert(`Error fetching data: ${error}`);
      }
    
  
  }

  const handleWeather=()=>{
  
    
   // Today's temperature
  const temp=wedata[14].temperature;
  const cltype=wedata[14].precipType;
  const cldate=wedata[14].sunriseTimeLocal;
  
  const date = new Date(cldate);

  const day = date.getDate();
  const raindata = {
    labels: wedata.map((value)=>(value.sunriseTimeLocal[5])),
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
     <Image
        source={cltype=='rain' ?  require('../../assets/crpr.jpg'):require('../../assets/crps.png')}
        style={styles.climage}
      />
      <Text style={styles.dt}>{formattedDate}</Text>
      </View> 
      
      </View><View  style={styles.secwc1}>
      <Text>Humidity: {wedata[14].relativeHumidity}%</Text>
      <Text style={{width:300, textAlign:'center'}}>{wedata[14].narrative}</Text>
      </View>
      <View  style={{paddingTop:15}}>
        <Text style={styles.temhead}>Temperature</Text>
        <View style={styles.scrollContainer}>
       
        <FlatList
        
       horizontal
        data={wedata}
       
        renderItem={({ item }) => (<View style={{marginRight:20,textAlign:'center',alignItems:"center"}}>
          
            <Text >{item.temperature[8]}{item.temperature[9]}` -{item.temperature[1]}{item.temperature[2]}`C</Text>
            <Image
        source={item.precipType=='rain' ?  require('../../assets/crpr.jpg'):require('../../assets/crps.png')}
        style={{width:40,
          height:40,
          backgroundColor:'skyblue',
          
          borderRadius:10,
          marginBottom:8}}
      />
           <Text>{item.sunriseTimeLocal[8]}{item.sunriseTimeLocal[9]} { item.sunriseTimeLocal[5]=='0'?months[item.sunriseTimeLocal[6]]:item.sunriseTimeLocal[6]=='1'?months[11]:months[12]}</Text>
           <Icon name="flag" size={12} color="black" />
           <Text>{item.WindSpeed} m/s</Text>
           </View>
        )}
      />
      </View>
      </View>

      <View >
        <Text style={styles.temhead}>Rainfall</Text>
        
        
      </View>
       </View>
    </>)
  }
  return (
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
  );
};

const styles = StyleSheet.create({
  
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
