import Logo from '@assets/logo_primary.svg'
import { Button } from '@components/Button'
import { Input } from '@components/Input'
import { yupResolver } from '@hookform/resolvers/yup'
import { Heading, Icon, useTheme, VStack } from 'native-base'
import { Envelope, Key } from 'phosphor-react-native'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const signInValidationSchema = yup
   .object({
      email: yup
         .string()
         .email('O e-mail está incorreto')
         .required('Campo obrigatório'),
      password: yup.string().required('Campo obrigatório')
   })
   .required()

type SignInFormData = yup.InferType<typeof signInValidationSchema>

export function SignIn() {
   const { colors } = useTheme()

   const {
      control,
      handleSubmit,
      formState: { errors }
   } = useForm<SignInFormData>({
      resolver: yupResolver(signInValidationSchema)
   })

   const onSubmit = (data: SignInFormData) => console.log(data)

   return (
      <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
         <Logo />

         <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
            Acesse sua conta
         </Heading>

         <Input
            name="email"
            control={control}
            error={errors.email?.message}
            placeholder="E-mail"
            InputLeftElement={
               <Icon as={<Envelope color={colors.gray[300]} />} ml={4} />
            }
         />

         <Input
            name="password"
            control={control}
            error={errors.password?.message}
            placeholder="Senha"
            InputLeftElement={
               <Icon as={<Key color={colors.gray[300]} />} ml={4} />
            }
            secureTextEntry
         />

         <Button title="Entrar" w="full" onPress={handleSubmit(onSubmit)} />
      </VStack>
   )
}
