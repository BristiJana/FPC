import {connect} from 'react-redux';
import React, {Component} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import {EventRegister} from 'react-native-event-listeners';
import {
  bankDetailInputChange,
  personalDetailInputChange,
} from '../../redux/ExportAction';
import {
  BANK_DETAILS_CONSTANT,
  KYC_DETAILS_CONSTANT,
  LAND_DETAILS_CONSTANT,
  PERSONAL_DETAILS_CONSTANT,
  SCREEN_HEIGHT,
} from '../../constant/Constant';

class DropdownComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isValid: true,
      value: undefined,
      valueM: props.storedValue,
      pageName: props.reducerName,
      answers: props.answer_params,
      validation: props.validation,
      question: props.question_text_label,
    };
  }

  validationAndProcessing(pageName) {
    if (this.props.validation(this.state.value)) {
      this.setState({isValid: true});
      if (this.state.value != undefined) {
        let object = {
          [this.props.reducerKey]: this.state.value,
        };
        if (pageName == PERSONAL_DETAILS_CONSTANT) {
          this.props.personalDetials(object);
        } else if (pageName == BANK_DETAILS_CONSTANT) {
          this.props.bankDetailsChange(object);
        } else if (pageName == LAND_DETAILS_CONSTANT) {
          this.props.passedObjectToParent(object);
        } else if (pageName == KYC_DETAILS_CONSTANT) {
          this.props.passedObjectToParentKYCDetail(object);
        }
      }
    } else {
      this.setState({isValid: false});
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.answer_params.map(item => {
        if (item.key == this.state.valueM) {
          this.setState({valueM: item});
        }
      });
    }, 1 * 1000);

    if (this.state.pageName == PERSONAL_DETAILS_CONSTANT) {
      this.submitListener = EventRegister.addEventListener(
        PERSONAL_DETAILS_CONSTANT,
        () => {
          this.validationAndProcessing(PERSONAL_DETAILS_CONSTANT);
        },
      );
    } else if (this.state.pageName == BANK_DETAILS_CONSTANT) {
      this.submitListener = EventRegister.addEventListener(
        BANK_DETAILS_CONSTANT,
        () => {
          this.validationAndProcessing(BANK_DETAILS_CONSTANT);
        },
      );
    } else if (this.state.pageName == LAND_DETAILS_CONSTANT) {
      this.submitListener = EventRegister.addEventListener(
        LAND_DETAILS_CONSTANT,
        () => {
          this.validationAndProcessing(LAND_DETAILS_CONSTANT);
        },
      );
    } else if (this.state.pageName == KYC_DETAILS_CONSTANT) {
      this.submitListener = EventRegister.addEventListener(
        KYC_DETAILS_CONSTANT,
        () => {
          this.validationAndProcessing(KYC_DETAILS_CONSTANT);
        },
      );
    }
  }

  componentWillUnmount() {
    EventRegister.removeEventListener(this.submitListener);
  }

  render() {
    return (
      <View>
        <View style={{flexDirection: 'row'}}>
          <Text style={style.heading}>{this.state.question}</Text>
          {this.props.isRequire && (
            <Text style={{color: 'red', alignSelf: 'center'}}>*</Text>
          )}
        </View>
        <View>
          <SelectList
            save="key"
            search={false}
            placeholder="Select"
            data={this.props.answer_params}
            defaultOption={this.state.valueM}
            dropdownTextStyles={{color: '#000'}}
            dropdownStyles={{backgroundColor: '#fff'}}
            inputStyles={{color: 'gray', fontWeight: '600'}}
            setSelected={val => {
              this.setState({value: val});
              this.setState({isValid: true});
            }}
            boxStyles={{
              backgroundColor: '#fff',
              borderColor: this.state.isValid ? 'black' : 'red',
              height: 50,
            }}
          />
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
    },
  };
};

// const mapStateToProps = state => {
//   if (this.props.reducerName == PERSONAL_DETAILS_REDUCER) {
//     return {
//       storedValueFromRedux:
//         state.formReducer.personalDetailsState[this.props.reducerKey],
//     };
//   } else if (this.props.reducerName == BANK_DETAILS_REDUCER) {
//     return {
//       storedValueFromRedux:
//         state.formReducer.bankDetailsState[this.props.reducerKey],
//     };
//   } else if (this.props.reducerName == LAND_DETAILS_REDUCER) {
//     return {
//       storedValueFromRedux:
//         state.formReducer.landDetailsState[this.props.reducerKey],
//     };
//   }
// };

export default connect(null, mapDispatchToProps)(DropdownComponent);

const style = StyleSheet.create({
  heading: {
    marginHorizontal: 5,
    marginVertical: 5,
    fontSize: (SCREEN_HEIGHT * 1.5) / 100,
    // margin: 5,
    color: 'black',
    fontWeight: '600',
  },
});
