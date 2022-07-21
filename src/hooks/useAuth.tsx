import React, {
   createContext,
   useContext,
   ReactNode,
   useState,
   useEffect
} from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage'
import auth from '@react-native-firebase/auth'
import { Alert } from 'react-native'

type User = {
   id: string
   name: string
   isAdmin: boolean
}

type AuthContextData = {
   signIn: (email: string, password: string) => Promise<void>
   signOut: () => Promise<void>
   forgotPassword: (email: string) => Promise<void>
   isLoading: boolean
   user: User | null
}

type AuthProviderProps = {
   children: ReactNode
}

const USER_COLLECTION = '@rockethelp:users'

export const AuthContext = createContext({} as AuthContextData)

function AuthProvider({ children }: AuthProviderProps) {
   const [user, setUser] = useState<User | null>(null)
   const [isLoading, setIsLoading] = useState(false)

   async function signIn(email: string, password: string) {
      setIsLoading(true)

      auth()
         .signInWithEmailAndPassword(email, password)
         .then((response) => {
            console.log(response)
            // await AsyncStorage.setItem(
            //    USER_COLLECTION,
            //    JSON.stringify(response)
            // )
            // setUser(response)
         })
         .catch((error) => {
            console.log(error)
            setIsLoading(false)

            if (error.code === 'auth/invalid-email') {
               return Alert.alert('Entrar', 'E-mail inválido.')
            }

            if (error.code === 'auth/wrong-password') {
               return Alert.alert('Entrar', 'E-mail ou senha inválida.')
            }

            if (error.code === 'auth/user-not-found') {
               return Alert.alert('Entrar', 'E-mail ou senha inválida.')
            }

            return Alert.alert('Entrar', 'Não foi possível acessar')
         })
         .finally(() => {
            setIsLoading(false)
         })
   }

   async function loadUserStorageData() {
      setIsLoading(true)

      const storedUser = await AsyncStorage.getItem(USER_COLLECTION)

      if (storedUser) {
         const userData = JSON.parse(storedUser) as User
         console.log(userData)
         setUser(userData)
      }

      setIsLoading(false)
   }

   async function signOut() {
      await auth().signOut()
      await AsyncStorage.removeItem(USER_COLLECTION)
      setUser(null)
   }

   async function forgotPassword(email: string) {
      if (!email) {
         return Alert.alert('Redefinir Senha', 'Informe o e-mail.')
      }

      auth()
         .sendPasswordResetEmail(email)
         .then(() =>
            Alert.alert(
               'Redefinir Senha',
               'Enviamos um link no seu e-mail para você redefinir sua senha.'
            )
         )
         .catch(() =>
            Alert.alert(
               'Redefinir Senha',
               'Não foi possível enviar o e-mail para redefinição da senha.'
            )
         )
   }

   useEffect(() => {
      loadUserStorageData()
   }, [])

   return (
      <AuthContext.Provider
         value={{
            user,
            signIn,
            signOut,
            isLoading,
            forgotPassword
         }}
      >
         {children}
      </AuthContext.Provider>
   )
}

function useAuth() {
   const context = useContext(AuthContext)

   return context
}

export { AuthProvider, useAuth }
