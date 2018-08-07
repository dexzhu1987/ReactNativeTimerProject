import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native'

function SelectButtons({ title, color, background, onPress }) {
  return(
    <TouchableOpacity
      onPress={onPress}
      style={[ styles.button, { backgroundColor: background } ]}
      activeOpacity={0.5}
    >
      <View>
        <Text style={[ styles.buttonTitle, { color } ]}>{ title }</Text>
      </View>
    </TouchableOpacity>
  )
}

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonsRow}>
          <SelectButtons title='Custom Timer' color='#ffd11a'  background='#ffe680'/>
          <SelectButtons title='Short Break' color='#ffd11a' background='#ffe680'/>
          <SelectButtons title='Long Break' color='#ffd11a' background='#ffe680'/>
          <SelectButtons title='Loop' color='#ffd11a' background='#ffe680'/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  button: {
    width: 168,
    height: 50,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 15,
    borderColor: '#cc9900',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  }
});
