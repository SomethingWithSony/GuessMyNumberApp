import { ImageBackground, SafeAreaView, StyleSheet} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import Colors from './utils/colors';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

export default function App() {
  const [userNumber, setUserNumber] = useState(null);
  const [isGameOver, setIsGameOver] = useState(true);
  const [numberOfGuesses, setNumberOfGuesses] = useState(1);

  
  const startGameHandler = (pickedNumber) => {
    setUserNumber(pickedNumber)
    setIsGameOver(false)
  }

  let screen = <StartGameScreen onConfirmNumber={startGameHandler} />

  const gameOverHandler = () => {
    setIsGameOver(true)
  }

  const newGameHandler = () => {
    setUserNumber(null);
    setNumberOfGuesses(1);
  }

  console.log(numberOfGuesses)

  if (userNumber) {
    screen = (<GameScreen userNumber={userNumber} onGameOver={gameOverHandler} onGuess={(currentGuessNumber) => setNumberOfGuesses(numberOfGuesses + 1)}/>)
  }

  if (isGameOver && userNumber){
    screen = (<GameOverScreen userNumber={userNumber} onNewGame={newGameHandler} numberOfRounds={numberOfGuesses}/>)
  }

  
  
  return ( 
    <LinearGradient style={styles.rootScreen} colors={[Colors.primary500, Colors.secondary]}> 
      <ImageBackground source={require('./assets/background.png')} resizeMode="cover" style={styles.rootScreen} imageStyle={styles.backgroundImg}>
        <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImg : {
    opacity: 0.15
 
}

});
