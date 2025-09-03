import { TextInput, View, Text, StyleSheet, Alert} from "react-native"
import { useState } from "react"
import Colors from "../utils/colors"
import PrimaryBtn from "../components/ui/PrimaryBtn"
import Title from "../components/ui/Title"

export default function StartGameScreen({onConfirmNumber}){
  const [enteredNumber, setEnteredNumber] = useState('');

 

  const numberInputHandler = (enteredText) => {
    setEnteredNumber(enteredText);
  }

   const resetNumberHandler = () => {
    setEnteredNumber('');
  }

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredNumber);

      if (isNaN(chosenNumber)) {
        Alert.alert('Invalid Number', 'Has to be an number', [{text: 'Close', style: 'cancel', onPress: resetNumberHandler()}]);
        return
      }
      else if (chosenNumber <= 0){
        Alert.alert('Invalid Number', 'Number should be positive', [{text: 'Close', style: 'cancel', onPress: resetNumberHandler()}]);
        return
      }
      else if (chosenNumber > 99) {
        Alert.alert('Invalid Number', 'Number should be lower than 100', [{text: 'Close', style: 'cancel', onPress: resetNumberHandler()}]);
        return
      }

      onConfirmNumber(enteredNumber);
  }

  return (
    <View style={styles.appContainer}>
      
      <Title color='#ffffff'>Guess My Number</Title>
    
      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>Enter a Number</Text>
        <TextInput placeholder="00" style={styles.input} maxLength="2" 
          keyboardType="number-pad" 
          autoCorrect={false} 
          autoComplete={false}
          value={enteredNumber}
          onChangeText={numberInputHandler}
          />

        <View style={styles.btnsContainer}>
          <View style={styles.btnContainer}>
            <PrimaryBtn onPress={resetNumberHandler}>Reset</PrimaryBtn>
          </View>
          <View style={styles.btnContainer}>
            <PrimaryBtn onPress={confirmInputHandler}>Confirm</PrimaryBtn>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  appContainer : {
    flex: 1,
    gap: 20,
    marginHorizontal: 24,

  },

 

  inputContainer: {
    padding: 16,
    backgroundColor: Colors.primary600,
    elevation: 8,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: {width:0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.25,
    gap: 20
  },

  inputText: {
    color: Colors.secondary,
    fontSize: 32,
  },

  input : {
    height: 50,
    width: 50,
    fontSize: 32,
    color: Colors.secondary,
    borderBottomWidth: 2,
    borderColor: Colors.secondary,
    fontWeight: 'bold',
  },

  btnsContainer : {
    flexDirection: 'row',
  },
  btnContainer: {
    flex: 1
  }
});