import Logo from '@assets/logo_primary.svg'
import { Button } from '@components/Button'
import { Input } from '@components/Input'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAuth } from '@hooks/useAuth'
import {
   Box,
   Heading,
   Icon,
   KeyboardAvoidingView,
   useTheme,
   VStack
} from 'native-base'
import { Envelope, Key } from 'phosphor-react-native'
import { useForm } from 'react-hook-form'
import { Keyboard, TouchableWithoutFeedback } from 'react-native'
import * as yup from 'yup'

const signInValidationSchema = yup
   .object({
      email: yup
         .string()
         .email('Insira um e-mail válido')
         .required('Campo obrigatório'),
      password: yup
         .string()
         .min(6, 'Mínimo 6 caracteres')
         .required('Campo obrigatório')
   })
   .required()

type SignInFormData = yup.InferType<typeof signInValidationSchema>

export function SignIn() {
   const { signIn, isLoading } = useAuth()
   const { colors } = useTheme()

   const {
      control,
      handleSubmit,
      formState: { errors }
   } = useForm<SignInFormData>({
      resolver: yupResolver(signInValidationSchema)
   })

   function handleSignIn({ email, password }: SignInFormData) {
      signIn(email, password)
   }

   return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
         <Box flex={1} bg="gray.600">
            <KeyboardAvoidingView behavior="position" enabled>
               <VStack
                  flex={1}
                  alignItems="center"
                  bg="gray.600"
                  px={8}
                  pt={24}
               >
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
                        <Icon
                           as={<Envelope color={colors.gray[300]} />}
                           ml={4}
                        />
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
                     mt={4}
                  />

                  <Button
                     title="Entrar"
                     w="full"
                     mt={8}
                     onPress={handleSubmit(handleSignIn)}
                     isLoading={isLoading}
                     isLoadingText="Entrando..."
                  />
               </VStack>
            </KeyboardAvoidingView>
         </Box>
      </TouchableWithoutFeedback>
   )
}
