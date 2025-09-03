import { View, Text, Pressable, StyleSheet } from "react-native"
import Colors from "../../utils/colors"
export default function PrimaryBtn({ children, onPress }) {
  return (

    <View style={styles.btnOutterContainer}>
      <Pressable style={ ({pressed}) =>  pressed ? [styles.btnInnerContainer, styles.pressed] : styles.btnInnerContainer} onPress={onPress}>
        <Text style={styles.btnText}>{children}</Text>
      </Pressable>
    </View>

  )
}

const styles = StyleSheet.create({
   btnOutterContainer: {
    borderRadius: 20,
    margin: 4,
    overflow: 'hidden',
   },

  btnInnerContainer: {
    backgroundColor: Colors.primary500,
    paddingHorizontal: 16,
    paddingVertical: 8,
    elevation: 2
  },

  btnText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 20
  },

   pressed: {
    opacity: 0.75,
  }
})

