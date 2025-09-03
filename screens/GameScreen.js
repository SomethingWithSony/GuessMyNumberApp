import { Text, StyleSheet, View, Alert, FlatList } from "react-native"
import { useState, useEffect } from "react"
import PrimaryBtn from "../components/ui/PrimaryBtn"
import Colors from "../utils/colors"
import Title from "../components/ui/Title"
import Number from "../components/game/Number"

const generateRandomNumberBetween = (min, max, exclude) => {
    const num = Math.floor(Math.random() * (max - min)) + min

    if (num === exclude) {
      return generateRandomNumberBetween(min, max, exclude)
    } else {
      return num
    }

}

let minBoundary = 1;
let maxBoundary = 99

export default function GameScreen({userNumber, onGameOver, onGuess}) {
  const initialGuess = generateRandomNumberBetween(1,99, userNumber)
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessHistory, setGuessHistory] = useState([]);
  
  useEffect(() => {
    if (currentGuess == userNumber){
      // Alert.alert('Game Over', 'Computer Won', [{text: 'Close', style: 'cancel'}])
      onGameOver();
    }
  }, [currentGuess, userNumber,onGameOver])

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 99
    setGuessHistory([]);
  }, [])

  const nextGuessHandler = (direction) => {
    if ((direction === 'higher' && currentGuess > userNumber) ||
        (direction === 'lower' && currentGuess < userNumber)){
        Alert.alert('Invalid Instruction', 'Cheater you know that is wrong...', [{text: 'Sorry', style: 'cancel'}])
        return
    }

   

    if (direction === 'lower'){
      maxBoundary = currentGuess
    } else {
      minBoundary = currentGuess + 1
    }

    onGuess();

    setGuessHistory(prev => [{id: guessHistory.length + 1, data: currentGuess}, ...prev, ]);
    setCurrentGuess(generateRandomNumberBetween(minBoundary,maxBoundary, currentGuess));
  }

   

  
  return (
    <View style={styles.appContainer}>
      
      <Title color={Colors.secondary}>Opponent's Guess</Title>

      <Number>{currentGuess}</Number>

      <View style={styles.gap}>
        <Text style={styles.text}>Higher or lower?</Text>
        <View style={styles.btnsContainer}>
          <View style={styles.btnContainer}>
            <PrimaryBtn onPress={nextGuessHandler.bind(this,'lower')}>-</PrimaryBtn>
          </View>
          <View style={styles.btnContainer}>
            <PrimaryBtn onPress={nextGuessHandler.bind(this,'higher')}>+</PrimaryBtn>
          </View>
        </View>
      </View>

       <View>
          <FlatList  
            data={guessHistory}
            renderItem={ itemData => {
              return (
                <View style={styles.historyContainer}>
                  <Text>#{itemData.item.id}</Text> 
                  <Text> Opponent's Guess: {itemData.item.data} </Text>
                </View>
              )
            }}
          />
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
  gap: {gap: 10},
  text: {
    fontSize: 24,
    color: '#ffffff',
    textAlign: 'center',
  },
  btnsContainer : {
    flexDirection: 'row',
  },
  btnContainer: {
    flex: 1
  },
  historyContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#ffffff',
    borderColor: '#000000',
    borderWidth: 2,
    justifyContent: 'space-between'
  }
})