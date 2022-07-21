import { useEffect, useState } from 'react'

import { Loading } from '@components/Loading'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { NavigationContainer } from '@react-navigation/native'
import { SignIn } from '@screens/SignIn'

import { AppRoutes } from './app.routes'

export function Routes() {
   const [isLoading, setIsLoading] = useState(true)
   const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null)

   useEffect(() => {
      const subscriber = auth().onAuthStateChanged((response) => {
         setUser(response)
         setIsLoading(false)
      })

      return subscriber
   }, [user])

   if (isLoading) {
      return <Loading />
   }

   return (
      <NavigationContainer>
         {user ? <AppRoutes /> : <SignIn />}
      </NavigationContainer>
   )
}
