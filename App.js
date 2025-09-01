import { StyleSheet, Text, View, SafeAreaView, TextInput, Button, FlatList } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [userInput, setUserInput] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  
  const [opponentGuess, setOpponentGuess] = useState('');
  const [opponentGuessHistory, setOpponentGuessHistory] = useState([]);

  const [lastMin , setLastMin] = useState(0);
  const [lastMax, setLastMax] = useState(99)

  const reset = () => {
    setUserInput('');
  }

  const handleTextChange = (text) => {
    if (!isNaN(text) && text.length <= 2) {
      setUserInput(text);
    }
  }

  const confirm = () => {
    setIsPlaying(true)
    let guess = randomIntFromInterval(lastMin, lastMax) ;
    setOpponentGuess(guess);
    console.log("Player input" + userInput);
    detectVictory();
  }

  // Aux Function
  function randomIntFromInterval(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const lower = () => {
    if (opponentGuess < userInput){
      console.log("No no you cheating")
    } else {
      setOpponentGuessHistory( currentHistory => [...currentHistory, {id: opponentGuessHistory.length, data: opponentGuess}]);
      console.log("guessing a lower num: " + opponentGuess + " user input: " + userInput);
      setLastMax(opponentGuess - 1)
      let guess = randomIntFromInterval(lastMin, opponentGuess);
      console.log("range : "  + lastMin +  " - " + opponentGuess)
      setOpponentGuess(guess);
      detectVictory(guess);

    }
    console.log(opponentGuessHistory)

  }

  const higher = () => {
    if (opponentGuess > userInput){
      console.log("No no you cheating");
    } else {
      setOpponentGuessHistory( currentHistory => [...currentHistory, {id: opponentGuessHistory.length, data: opponentGuess}])
      console.log("guessing a higher num: " + opponentGuess + " user input: " + userInput);
      setLastMin(opponentGuess + 1)
      let guess = randomIntFromInterval(opponentGuess, lastMax);
      console.log("range : "  + opponentGuess +  " - " + lastMax)
      setOpponentGuess(guess);
      detectVictory(guess);
    }


    
  }

  const detectVictory = (guess) => {
    if (guess == userInput){
      setIsPlaying(false);
      setUserInput('');
      setOpponentGuessHistory([]);
      setLastMin(0);
      setLastMax(99);
      setOpponentGuess('')
      console.log("Computer Won");

    }
  }

  return (
    <SafeAreaView style={styles.container}>
      { !isPlaying ?
      <View>
        <View>
          <Text>Guess My Number</Text>
        </View>

        <View>
          <Text>Enter a Number</Text>

          <TextInput placeholder='00'
            value={userInput}
            keyboardType='numeric'
            onChangeText={handleTextChange}
          />

          <View>
            <Button title='Reset' onPress={reset} />
            <Button title='Confirm' onPress={confirm} />
          </View>
        </View>
      </View>
      : null
      
    }

    {
      isPlaying ?
      <View>
        <View>
          <Text>Opponent's Guess</Text>
        </View>
        <View>
          <Text>{opponentGuess}</Text>
        </View>
        <View>
            <Text>Higher or lower?</Text>
            <View>
              <Button title='-' onPress={lower}/>
              <Button title='+' onPress={higher}/> 
            </View>
        </View>
        <View>
          <FlatList  
            data={opponentGuessHistory}
            renderItem={ itemData => {
              return (
                  <Text>#{itemData.item.id}  Opponent's Guess: {itemData.item.data} </Text> 
              )
            }}
          />
        </View>
      </View> : null
    }

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
