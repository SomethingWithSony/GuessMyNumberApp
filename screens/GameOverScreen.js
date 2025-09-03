import { Text, Image, StyleSheet, View } from "react-native"
import Title from "../components/ui/Title"
import PrimaryBtn from "../components/ui/PrimaryBtn"

export default function GameOverScreen({userNumber, numberOfRounds, onNewGame}){
  return (
    <View style={styles.appContainer}>
      <Title color='#ffffff'>GAME OVER!</Title>
      <View style={styles.imgContainer}>
        <Image style={styles.image} source={require('../assets/success.png')} />
      </View>
      <Text style={styles.text}>Your phone needed <Text style={styles.highlight}>{numberOfRounds}</Text> rounds to guess the number <Text style={styles.highlight}>{userNumber}</Text>.</Text>
      <PrimaryBtn onPress={onNewGame}>New Game</PrimaryBtn>
    </View>
  )
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    marginHorizontal: 24,
    gap: 20,
    alignItems: 'center',
    justifyContent: 'center'

  },
  imgContainer: {

    borderRadius: 150,
    overflow: 'hidden',
    width: 300,
    height: 300,
    borderWidth: 3,
    borderColor: '#ffffff'
  },
  image: {
    width: '100%',
    height: '100%'
  },
   text: {
    color: '#ffffff',
    fontSize: 24,
    textAlign: 'center'
  },
  highlight: {
    fontWeight: 'bold'
  }
})