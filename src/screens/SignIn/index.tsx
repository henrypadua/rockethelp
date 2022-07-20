import Logo from '@assets/logo_primary.svg'
import { Button } from '@components/Button'
import { Input } from '@components/Input'
import { yupResolver } from '@hookform/resolvers/yup'
import {
   FormControl,
   Heading,
   Icon,
   Text,
   useTheme,
   VStack,
   WarningOutlineIcon
} from 'native-base'
import { Envelope, Key } from 'phosphor-react-native'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

type FormData = {
   email: string
   password: string
}

const schema = yup
   .object({
      email: yup
         .string()
         .email('O e-mail está incorreto')
         .required('Campo obrigatório'),
      password: yup.string().required('Campo obrigatório')
   })
   .required()

export function SignIn() {
   const { colors } = useTheme()

   const {
      control,
      handleSubmit,
      formState: { errors }
   } = useForm({
      resolver: yupResolver(schema)
   })

   const onSubmit = (data: FormData) => console.log(data)

   return (
      <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
         <Logo />

         <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
            Acesse sua conta
         </Heading>

         <Input
            placeholder="E-mail"
            InputLeftElement={
               <Icon as={<Envelope color={colors.gray[300]} />} ml={4} />
            }
            control={control}
            name="email"
         />
         {errors.email && (
            <Text mt={1} color="red.500">
               {errors.email.message}
            </Text>
         )}

         <Input
            placeholder="Senha"
            InputLeftElement={
               <Icon as={<Key color={colors.gray[300]} />} ml={4} />
            }
            secureTextEntry
            control={control}
            name="password"
         />
         {errors.password && (
            <Text mt={1} color="red.500">
               {errors.password.message}
            </Text>
         )}

         <Button title="Entrar" w="full" onPress={handleSubmit(onSubmit)} />
      </VStack>
   )
}
