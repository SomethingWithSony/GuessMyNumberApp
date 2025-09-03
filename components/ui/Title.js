import { View, Text, StyleSheet } from "react-native";
export default function Title({ color, children }) {
  return (
    <Text style={[styles.titleText, {color: color, borderColor: color}]}>{children}</Text>
  )
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 32,
    textAlign: 'center',
    padding: 16,
    borderWidth: 2,
    borderRadius: 10
  },
});

