import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, StyleSheet,FlatList,Image ,Dimensions,Modal} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LineChart } from 'react-native-chart-kit';
import axios from 'axios';
import Carousel from 'react-native-snap-carousel';
import { Button } from 'react-native-paper';



import DatePicker from 'react-native-date-picker';

const images = [
  { id: 1, source: require('../../assets/crop.png')},
  { id: 2, source: require('../../assets/crprr.png') },
  { id: 3, source: require('../../assets/crps.png') },
  // Add more image objects here
];
// Retrieve finUrl from localStorage


// Now you can use the finUrl in your CollapsePage


const { width } = Dimensions.get('window');
const Collapse = (props) => {

  
 

  


  const [isExpanded, setIsExpanded] = useState(false);
const [wedata,setWedata]=useState([]);
const[pesdata,setPesdata]=useState([]);
const[soildata,setSoildata]=useState([]);


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
      alert('Crop Health')
    }
    else if(val===7)
    {
      alert('LSWI')
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
       setPesdata(response.data);
       setDisplay(handleitempesdis());

      } catch (error) {
        alert(`Error fetching data: ${error}`);
      }

  
  }
  const handleslpress= async (passfarm)=>{
    
   
    const soilUrl= 'https://micro.satyukt.com/api/info?key=HsNrsgMzEJYshSvRWfoMUvmDcyRqNPFUH1AA_-HVvek=&plotName='+passfarm
      console.log(soilUrl)
    
      
      try {
        const response = await axios.get(soilUrl);
        console.log(response.data)
        setSoildata(response.data);
        setDisplay(handleitemsoilm());
 

      } catch (error) {
        alert(`Error fetching data: ${error}`);
      }

  
  }


  const handleDateSelect = date => {
    setSelectedDate(date);
    // Replace this with your logic to get the corresponding image URL based on the selected date
    // For now, let's assume you have an array of image URLs stored in 'imageUrlsByDate'
    const imageUrlByDate = {};
    soildata.forEach(data => {
      const prevdate=data.Date
      const date = new Date(prevdate);
  const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

     
      imageUrlByDate[formattedDate] = data.png.sm; 
    });
   
    const formattedDate = date.toISOString().split('T')[0]; // Convert date to 'YYYY-MM-DD' format
    setSelectedImageUrl(imageUrlByDate[formattedDate] || null);
  };
  

  const handlesmpop=()=>{


  }
  const handleitemsoilm=()=>
  {
    
    const sldata = {
      labels: soildata.map((value)=>(value.Date)),
      datasets: [
        {
          data: [50, 70, 65, 80, 85, 90],
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
      <Text style={{ color:"black",marginLeft:20,marginTop:3}}>{formattedDateee}</Text>
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
  const handleitempesdis= ()=>
  {
    
    const num=pesdata.length-1;
    const renderItem = ({ item ,index}) => {
      return (
        <View style={styles.slide}>
        <Image source={item} style={styles.image} />
      </View>
      );
    };
    
      return(<View style={{alignContent:'center',alignItems:'center',textAlign:'center'}}>
      {/* <Carousel
        layout={'default'}
        data={images}
        renderItem={renderItem}
        sliderWidth={width}
        itemWidth={width}
        loop={true}
      /> */}
      <Carousel
              layout={'default'}
              data={pesdata[0].Disease_img_url}
              renderItem={renderItem}
              sliderWidth={300}
              itemWidth={300}
            />
            <View>
              <View style={{borderBottomWidth:1,borderBottomColor:"grey",width:'100%',flex:1,paddingVertical: 10,}}>
              <View style={{flexDirection:"row",justifyContent:"space-between"}}>
              <Text style={{color:'blue',fontWeight:'bold',paddingRight:20}}>Date</Text>
              <Text style={{color:'black',fontWeight:'bold'}}> {pesdata[0].Date}</Text></View></View>
              <View style={{borderBottomWidth:1,borderBottomColor:"grey",width:'100%',flex:1,paddingVertical: 10,}}>
              <View style={{flexDirection:"row",justifyContent:"space-between"}}>
              <Text style={{color:'blue',fontWeight:'bold',paddingRight:20}}>Disease Name</Text>
              <Text style={{color:'red',fontWeight:'bold'}}> {pesdata[0].Disease}</Text></View></View>
              
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
  const handleweitempress= async (passfarm)=>{
    
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
        <LineChart
        data={raindata}
        width={280}
        height={120}
        chartConfig={{
          backgroundGradientFrom: 'skyblue',
          backgroundGradientTo: 'skyblue',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          propsForDots: {
            r: '6',
            strokeWidth: '2',
          },
          useShadowColorFromDataset: false, // Remove shadows for clarity
          xAxisLabelPosition: 'TOP', // Position X-axis labels at the top
          yAxisLabelPositionLeft: 'BOTTOM', // Position Y-axis labels below
        }}
        xLabelsOffset={-10} // Adjust the X-axis labels' offset if needed
        fromZero // Start Y-axis from zero
        yAxisInterval={10} // Adjust Y-axis interval as needed
      />
        
      </View>
       </View>
    </>)
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
