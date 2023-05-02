import React from 'react'
import { View } from 'react-native'

const Spacer = ({ horizontal, size }) => {

    const defaultValue = 'auto'

  return (
    <View style={{
        height: !horizontal ? size : defaultValue,
        width: horizontal ? size : defaultValue
    }}/>
  )
}

export default Spacer
