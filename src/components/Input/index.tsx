import {
   Input as NativeBaseInput,
   IInputProps,
   VStack,
   Text,
   HStack,
   useTheme
} from 'native-base'
import { WarningCircle } from 'phosphor-react-native'
import { Controller, Control, FieldValues, Path } from 'react-hook-form'

interface InputProps<T extends FieldValues = FieldValues> extends IInputProps {
   name: Path<T>
   control?: Control<T>
   error?: string
}

export function Input<T extends FieldValues = FieldValues>({
   control,
   name,
   error,
   ...rest
}: InputProps<T>) {
   const { colors } = useTheme()
   return (
      <VStack>
         <Controller
            name={name}
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
               <NativeBaseInput
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  bg="gray.700"
                  h={14}
                  size="md"
                  borderWidth={0}
                  fontSize="md"
                  w="full"
                  fontFamily="body"
                  color="white"
                  placeholderTextColor="gray.300"
                  _focus={{
                     borderWidth: 1,
                     borderColor: 'green.500',
                     bg: 'gray.700'
                  }}
                  {...rest}
               />
            )}
         />
         {!!error && (
            <HStack mt={1} alignItems="center" space={2}>
               <WarningCircle size={14} color={colors.red[500]} />

               <Text color="red.500">{error}</Text>
            </HStack>
         )}
      </VStack>
   )
}
