import { Button } from '@components/Button'
import { Header } from '@components/Header'
import { Input } from '@components/Input'
import { yupResolver } from '@hookform/resolvers/yup'
import { VStack } from 'native-base'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const registerValidationSchema = yup
   .object({
      patrimony: yup.string().required('Campo obrigatório'),
      description: yup.string().required('Campo obrigatório')
   })
   .required()

type RegisterFormData = yup.InferType<typeof registerValidationSchema>

export function Register() {
   const {
      control,
      handleSubmit,
      formState: { errors }
   } = useForm<RegisterFormData>({
      resolver: yupResolver(registerValidationSchema)
   })

   const onSubmit = (data: RegisterFormData) => console.log(data)

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

         <Button title="Cadastrar" mt={5} onPress={handleSubmit(onSubmit)} />
      </VStack>
   )
}
