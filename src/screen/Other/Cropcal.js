import React, { useState, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import axios from 'axios';

const Cropcal = (props) => {
    const [currentRange, setCurrentRange] = useState(0);
   
  const [response, setResponse] = useState({ Recommended: '', Range: '' });
  const apiKey = 'HsNrsgMzEJYshSvRWfoMUvmDcyRqNPFUH1AA_-HVvek=';

  const [rangeHistory, setRangeHistory] = useState([]);
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
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Recommended: {response.Recommended}</Text>
     {response.Recommended !== "harvesting period over"?(<Text>Range: {response.Range}</Text>):(<></>)}
      <TouchableOpacity onPress={handleFetchPrevious}>
        {response.Range=="0"?(<></>):(<Text>Fetch Previous</Text>)}
      </TouchableOpacity>
      <TouchableOpacity onPress={handleFetchNext}>
        <Text>Fetch Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Cropcal;
