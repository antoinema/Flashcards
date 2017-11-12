import { StyleSheet } from 'react-native'
import { Constants } from 'expo'
import * as colors from './colors'

export const mystyles = StyleSheet.create({
  header: {
    height: 53 + Constants.statusBarHeight,
    backgroundColor: colors.header
  },
  title: {
    paddingTop: 20,
    textAlign: 'center'
  },
  title2: {
    paddingTop: 5,
    paddingBottom: 40,
    textAlign: 'center'
  },
  button: {
    marginTop: 15
  }
})

export const statusBarStyle = {
  backgroundColor: colors.background,
  barStyle: 'light-content'
}

export const centerHeaderComponentStyle = {
  color: '#fff',
  fontSize: 17
}

export const iconHeaderComponentStyle = {
  color: '#fff',
  underlayColor: '#324C66'
}
