import React from 'react'
import { NativeBaseProvider } from 'native-base'
import Navigation from './navigation'

export default function App() {
  return (
    <NativeBaseProvider>
      <Navigation />
    </NativeBaseProvider>
  )
}
