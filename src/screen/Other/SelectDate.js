import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-date-picker';
import {
  SCREEN_HEIGHT,
  PERSONAL_DETAILS_CONSTANT,
} from '../../constant/Constant';
import { connect, useDispatch } from 'react-redux';
import { EventRegister } from 'react-native-event-listeners';
import {
  bankDetailInputChange,
  personalDetailInputChange,
} from '../../redux/ExportAction';

const DateOfBirthComponent = (props) => {
  const [date, setDate] = useState(
    props.storedValue === undefined ? '' : props.storedValue
  );
  const [open, setOpen] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [age, setAge] = useState(
    props.storedValuex === undefined ? null : props.storedValuex
  );

  const dispatch = useDispatch();

  const handleValueChange = (newValue) => {
    setDate(newValue);
  };

  useEffect(() => {
    const submitListener = EventRegister.addEventListener(
      PERSONAL_DETAILS_CONSTANT,
      () => {
        if (props.validation(date)) {
          setIsValid(true);
          if (date !== undefined) {
            let object = {
              [props.reducerKey]: date,
              age: age,
            };
            console.log('111111111', object);
            if (props.reducerName === 'personalDetails') {
              dispatch(personalDetailInputChange(object));
            } else if (props.reducerName === 'bankDetails') {
              dispatch(bankDetailInputChange(object));
            }
          }
        } else {
          setIsValid(false);
        }
      }
    );

    return () => {
      EventRegister.removeEventListener(submitListener);
    };
  }, [date, age, dispatch, props]);

  const calculate_age = (dob1) => {
    var today = new Date();
    var birthDate = new Date(dob1);
    var age_now = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age_now--;
    }
    console.log('age------>', age_now);
    if (age_now < 0) {
      setAge(0);
    } else {
      setAge(age_now);
    }
    return age_now;
  };

  return (
    <View style={{ flexDirection: 'row' }}>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={style.sheading}>Sowing Date</Text>
          {props.isRequire && (
            <Text style={{ color: 'red', alignSelf: 'center' }}>*</Text>
          )}
        </View>

        <TouchableOpacity onPress={() => setOpen(true)}>
          <Text
            style={{
              marginBottom: 30,
              padding: 11,
              color: 'black',
              borderWidth: 1,
              borderColor: isValid ? '#f0f0f0' : 'red',
              backgroundColor: '#f0f0f0',
              borderRadius: 10,
              width: 274,
            }}>
            {date}
          </Text>
          <DatePicker
            modal
            mode="date"
            open={open}
            date={new Date()}
            onConfirm={(newDate) => {
              setOpen(false);
              setIsValid(true);
              const dateString = newDate.toISOString().slice(0, 10);
              handleValueChange(dateString);
              props.onDateChange(dateString);
              
              setAge(calculate_age(dateString));
              
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
        </TouchableOpacity>
        
      </View>
      <View style={{ padding: 10 }}></View>
    </View>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    personalDetials: (value) => {
      dispatch(personalDetailInputChange(value));
    },
    bankDetailsChange: (value) => {
      dispatch(bankDetailInputChange(value));
    },
  };
};

const style = {
  sheading: {
    color: 'black',
    fontWeight: 'bold',
    paddingLeft: 5,
    paddingBottom: 8,
  },
  textInputStyle: {
    // marginHorizontal: 5,
    // marginVertical: 5,
    marginBottom: 10,
    padding: 10,
    color: 'black',
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  heading: {
    marginHorizontal: 5,
    marginVertical: 5,
    fontSize: (SCREEN_HEIGHT * 1.5) / 100,
    // margin: 5,
    color: 'black',
    fontWeight: '600',
  },
};

export default connect(null, mapDispatchToProps)(DateOfBirthComponent);