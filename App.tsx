import React from 'react'

import { Loading } from '@components/Loading'
import {
   useFonts,
   Roboto_400Regular,
   Roboto_700Bold
} from '@expo-google-fonts/roboto'
import { AuthProvider } from '@hooks/useAuth'
import { NativeBaseProvider, StatusBar } from 'native-base'

import { Routes } from './src/routes'
import { THEME } from './src/styles/theme'

export default function App() {
   const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })

   if (!fontsLoaded) {
      return <Loading />
   }

   return (
      <NativeBaseProvider theme={THEME}>
         <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent
         />
         <AuthProvider>
            <Routes />
         </AuthProvider>
      </NativeBaseProvider>
   )
}
