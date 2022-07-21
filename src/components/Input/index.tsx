import {
   Input as NativeBaseInput,
   IInputProps,
   VStack,
   Text
} from 'native-base'
import { Controller, Control, FieldValues, Path } from 'react-hook-form'

interface InputProps<T extends FieldValues = FieldValues> extends IInputProps {
   name: Path<T>
   control: Control<T>
   error?: string
}

export function Input<T extends FieldValues = FieldValues>({
   control,
   name,
   error,
   ...rest
}: InputProps<T>) {
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
            <Text color="red.500" mt={1}>
               {error}
            </Text>
         )}
      </VStack>
   )
}
