import { View, Text , StyleSheet} from "react-native"
export default function Number ({children}) {
  return (
    <View style={styles.container}>
      <Text style={styles.numberText}>{children}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#ffffff'

  },
  numberText: {
    padding: 30,
    fontSize: 64,
    color: '#ffffff',
    textAlign: 'center'

  }
})