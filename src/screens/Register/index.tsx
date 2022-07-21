import { useState } from 'react'

import { Button } from '@components/Button'
import { Header } from '@components/Header'
import { Input } from '@components/Input'
import { yupResolver } from '@hookform/resolvers/yup'
import firestore from '@react-native-firebase/firestore'
import { useNavigation } from '@react-navigation/native'
import { VStack } from 'native-base'
import { useForm } from 'react-hook-form'
import { Alert } from 'react-native'
import * as yup from 'yup'
const registerValidationSchema = yup
   .object({
      patrimony: yup.string().required('Campo obrigatório'),
      description: yup.string().required('Campo obrigatório')
   })
   .required()

type RegisterFormData = yup.InferType<typeof registerValidationSchema>

export function Register() {
   const [isLoading, setIsLoading] = useState(false)
   const navigation = useNavigation()
   const {
      control,
      handleSubmit,
      formState: { errors }
   } = useForm<RegisterFormData>({
      resolver: yupResolver(registerValidationSchema)
   })

   function handleNewOrderRegister(data: RegisterFormData) {
      setIsLoading(true)

      firestore()
         .collection('orders')
         .add({
            patrimony: data.patrimony,
            description: data.description,
            status: 'open',
            created_at: firestore.FieldValue.serverTimestamp()
         })
         .then(() => {
            Alert.alert('Solicitação', 'Solicitação registrada com sucesso!')
            navigation.goBack()
         })
         .catch((error) => {
            console.log(error)
            setIsLoading(false)
            return Alert.alert(
               'Solicitação',
               'Não foi possível registrar a solicitação.'
            )
         })
   }

   return (
      <VStack flex={1} p={6} bg="gray.600">
         <Header title="Nova solicitação" />

         <Input
            name="patrimony"
            control={control}
            error={errors.patrimony?.message}
            placeholder="Número do patrimônio"
         />

         <Input
            name="description"
            control={control}
            error={errors.description?.message}
            placeholder="Descrição do problema"
            flex={1}
            mt={5}
            multiline
            textAlignVertical="top"
         />

         <Button
            title="Cadastrar"
            mt={5}
            onPress={handleSubmit(handleNewOrderRegister)}
            isLoading={isLoading}
         />
      </VStack>
   )
}
