import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';
import DatePicker from 'react-native-date-picker';
import {
  SCREEN_HEIGHT,
  PERSONAL_DETAILS_CONSTANT,
} from '../../constant/Constant';
import {connect} from 'react-redux';
import {EventRegister} from 'react-native-event-listeners';
import {
  bankDetailInputChange,
  personalDetailInputChange,
} from '../../redux/ExportAction';

class DateOfBirthComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date:
        props.storedValue == undefined
          ? 'Date of Birth Click Here'
          : props.storedValue,
      open: false,
      pageName: props.reducerName,
      validation: props.validation,
      isValid: true,
      age: props.storedValuex == undefined
      ? null
      : props.storedValuex,
    };
  }

  componentDidMount() {
    this.submitListener = EventRegister.addEventListener(
      PERSONAL_DETAILS_CONSTANT,
      () => {
        if (this.props.validation(this.state.date)) {
          this.setState({isValid: true});
          if (this.state.value != undefined) {
            let object = {
              [this.props.reducerKey]: this.state.value,
              age: this.state.age,
            };
            console.log('111111111', object);
            if (this.state.pageName == 'personalDetails') {
              this.props.personalDetials(object);
            } else if (this.state.pageName == 'bankDetails') {
              this.props.bankDetailsChange(object);
            }
          }
        } else {
          this.setState({isValid: false});
        }
      },
    );
  }

  componentWillUnmount() {
    EventRegister.removeEventListener(this.submitListener);
  }

  calculate_age = dob1 => {
    var today = new Date();
    var birthDate = new Date(dob1); // create a date object directly from `dob1` argument
    var age_now = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age_now--;
    }
    console.log('age------>', age_now);
    if (age_now < 0) {
      this.setState({age: 0});
    } else {
      this.setState({age: age_now});
    }
    return age_now;
  };

  render() {
    return (
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={style.heading}>Date Of Birth</Text>
            {this.props.isRequire && (
              <Text style={{color: 'red', alignSelf: 'center'}}>*</Text>
            )}
          </View>

          <TouchableOpacity onPress={() => this.setState({open: true})}>
            <Text
              style={{
                marginBottom: 10,
                padding: 15,
                color: 'black',
                borderWidth: 1,
                borderColor: this.state.isValid ? 'black' : 'red',
                backgroundColor: 'white',
                borderRadius: 10,
              }}>
              {this.state.date}
            </Text>
            {/* <Text style={{color:"#000",marginStart:10,marginTop:10, marginBottom:15}}>{date.toDateString()}</Text> */}
            <DatePicker
              modal
              mode="date"
              open={this.state.open}
              date={new Date()}
              onConfirm={date => {
                this.setState({open: false, isValid: true});
                // this.props.Collect_date(date.toISOString().slice(0, 10));
                this.setState({value: date.toISOString().slice(0, 10)});
                this.setState({
                  date: date.toISOString().slice(0, 10),
                });
                this.calculate_age(date.toISOString().slice(0, 10));
                console.log(date.toISOString().slice(0, 10));
              }}
              onCancel={() => {
                this.setState({open: false});
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={{padding: 10}}></View>
        <View style={{flex: 0.3}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={style.heading}>Age</Text>
          </View>
          <Text
            style={{
              marginBottom: 10,
              padding: 15,
              color: 'black',
              borderWidth: 1,
              borderColor: 'black',
              backgroundColor: 'white',
              borderRadius: 10,
            }}>
            {this.state.age}
          </Text>
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    personalDetials: value => {
      dispatch(personalDetailInputChange(value));
    },
    bankDetailsChange: value => {
      dispatch(bankDetailInputChange(value));
    }
  };
};

export default connect(null, mapDispatchToProps)(DateOfBirthComponent);

const style = StyleSheet.create({
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
});
