import { Text } from 'react-native-elements'
import PropTypes from 'prop-types'
import React from 'react'
import { StyleSheet } from 'react-native'

const TitleHeader = props => {
  return <Text style={styles.headerTitle}>{props.title}</Text>
}

TitleHeader.propTypes = {
  title: PropTypes.string.isRequired
}

const styles = StyleSheet.create({
  headerTitle: {
    color: '#fff',
    fontWeight: 'bold'
  }
})

export default TitleHeader
