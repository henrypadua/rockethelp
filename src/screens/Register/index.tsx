import { Button } from '@components/Button'
import { Header } from '@components/Header'
import { Input } from '@components/Input'
import { yupResolver } from '@hookform/resolvers/yup'
import { Text, VStack } from 'native-base'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

type FormData = {
   patrimony: string
   description: string
}

const schema = yup
   .object({
      patrimony: yup.string().required('Campo obrigatório'),
      description: yup.string().required('Campo obrigatório')
   })
   .required()

export function Register() {
   const {
      control,
      handleSubmit,
      formState: { errors }
   } = useForm({
      resolver: yupResolver(schema)
   })

   const onSubmit = (data: FormData) => console.log(data)

   return (
      <VStack flex={1} p={6} bg="gray.600">
         <Header title="Nova solicitação" />

         <Input
            placeholder="Número do patrimônio"
            control={control}
            name="patrimony"
         />
         {errors.patrimony && (
            <Text mt={1} color="red.500">
               {errors.patrimony.message}
            </Text>
         )}

         <Input
            placeholder="Descrição do problema"
            flex={1}
            mt={5}
            multiline
            textAlignVertical="top"
            name="description"
            control={control}
         />
         {errors.description && (
            <Text mt={1} color="red.500">
               {errors.description.message}
            </Text>
         )}

         <Button title="Cadastrar" mt={5} onPress={handleSubmit(onSubmit)} />
      </VStack>
   )
}
