import React, { useState, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity ,StyleSheet,Modal,ScrollView,Image} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
const Cropcal = (props) => {
    const [currentRange, setCurrentRange] = useState(0);
   
  const [response, setResponse] = useState({ Recommended: '', Range: '' });
  const apiKey = 'HsNrsgMzEJYshSvRWfoMUvmDcyRqNPFUH1AA_-HVvek=';
  const [modalVisible, setModalVisible] = useState(false);
  const [rangeHistory, setRangeHistory] = useState([]);
  const[firstresponse,setFirstresponse]=useState("")
  const [currentDate, setCurrentDate] = useState(new Date());
  const fetchData = async (newRange) => {
    try {
      const url = `https://micro.satyukt.com/display/crop/calender/v2?key=${apiKey}&farm_id=${props.farm}&sowing_date=${newRange}&crop=${props.type}&lang=en`;
      const response = await axios(url);
      const responseData = await response.data;

      if (Array.isArray(responseData) && responseData.length > 0) {
        const firstDataItem = responseData[0];

        if (firstDataItem.Recommended !== undefined) {
          setResponse(firstDataItem);

          if (firstDataItem.Range !== undefined && firstDataItem.Range !== "") {
            if(firstDataItem.Range==0)
            {
              setFirstresponse(firstDataItem.Recommended)
            }
            const rangeParts = firstDataItem.Range.split('-');
            console.log(rangeParts)
            if (rangeParts.length === 1) {
                
                const newrange=(parseInt(rangeParts[0]) + 1).toString()
                setRangeHistory(prevHistory => [...prevHistory, currentRange])
              setCurrentRange(newrange);
              

            } else if (rangeParts.length === 2) {
              const newRangeStart = parseInt(rangeParts[1]) + 1;
               const newrange=newRangeStart.toString()
               setRangeHistory(prevHistory => [...prevHistory, currentRange])
               setCurrentRange(newrange);
               
            }
          } else {
            console.log("Undefined Range");
          }
        } else {
          console.log("Undefined Response");
        }
      } else if (responseData && responseData.Recommended !== undefined) {
        setResponse(responseData);

        if (responseData.Range !== undefined && responseData.Range !== "") {
          if(responseData.Range==0)
          {
            setFirstresponse(responseData.Recommended)
          }
          const rangeParts = responseData.Range.split('-');
          console.log(rangeParts)
          if (rangeParts.length === 1) {
            const newrange=(parseInt(rangeParts[0]) + 1).toString()
                
            setRangeHistory(prevHistory => [...prevHistory, currentRange])
            setCurrentRange(newrange);
           
          } else if (rangeParts.length === 2) {
            const newRangeStart = parseInt(rangeParts[1]) + 1;
            const newrange=newRangeStart.toString()
            setRangeHistory(prevHistory => [...prevHistory, currentRange])
               setCurrentRange(newrange);
               
          }
        } else {
          console.log("Undefined Range");
        }
      } else {
        console.log("Undefined Response");
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleFetchNext = () => {
    if (response.Recommended !== "harvesting period over") {
      fetchData(currentRange);
    } else {
      setCurrentRange(0)
      fetchData(currentRange);
    }
  };

  const handleFetchPrevious = () => {
    
    console.log(rangeHistory)
    if (rangeHistory.length > 1) {
        const prevRange = rangeHistory[rangeHistory.length - 2]; // Get the previous range
        setRangeHistory(prevHistory => prevHistory.slice(0, -1)); // Remove the last range from history
        fetchData(prevRange);
      }
  };

  useEffect(() => {
    fetchData(currentRange);
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

   
    return () => {
      clearInterval(interval);
    };
  }, []);

  const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{flexDirection:'row',justifyContent:'space-between',borderBottomWidth:1,borderBottomColor:"grey",alignItems:"flex-start"}}>
        <Icon name="leaf" size={30} color="green" style={{marginTop:4,marginRight:4}}/>
        <Text style={{color:'black',fontSize:25,fontWeight:"bold"}}>{props.type}</Text>
        <View>
     


      
        <TouchableOpacity style={{backgroundColor:"#A8DF8E",marginLeft:24,padding:5,borderRadius:5}}
        onPress={() => setModalVisible(!modalVisible)}>
            <Text style={{fontSize:12 , color:"green"}}>Before Transplantation</Text>
        </TouchableOpacity>
    

<Modal
  animationType="slide"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => setModalVisible(false)}
>
  <View style={styles.modalContainer}>
  
    <ScrollView style={styles.modalContent}>
      <View style={{borderBottomWidth:1,borderBottomColor:"grey",justifyContent:"space-between",flexDirection:"row"}}>
    <Text style={{fontSize:20,fontWeight:"bold",color:"black"}}>{props.type}- Crop Calender Before Transplantation</Text>
    <TouchableOpacity
          style={styles.floatbutton}
          onPress={() => setModalVisible(!modalVisible)}
        >
          <Image
            source={require('../../assets/cross.png')}
            style={{ width: 24, height: 24, borderRadius: 50 }}
          />
        </TouchableOpacity></View>
     <Text style={{marginBottom:20,marginTop:10}}>{firstresponse}</Text>
    
    </ScrollView>
  </View>
</Modal>
      </View>
        </View>
        <View style={{borderBottomWidth:1,borderBottomColor:"grey",justifyContent:"space-between",flexDirection:"row",marginTop:10}}>
        <TouchableOpacity onPress={handleFetchPrevious}>
        {response.Range=="0"?(<></>):( <Icon name="chevron-left" size={30} color="green"style={{marginTop:5,marginRight:70}} />)}
      </TouchableOpacity> 
      {response.Recommended !== "harvesting period over"?(<View><Text>{response.Range} Days of sowing</Text><Text>{formattedDate} (Today)</Text></View>):(<></>)}
      <TouchableOpacity onPress={handleFetchNext}>
     
      <Icon name="chevron-right" size={30} color="green" style={{marginTop:5,marginLeft:40}}/>
      </TouchableOpacity></View>
      <Text style={{textAlign:"center",marginTop:10}}>{response.Recommended}</Text>
     
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
 
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding:20,
    paddingBottom:20
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    maxHeight: 200,
   
  },
 
});
export default Cropcal;
