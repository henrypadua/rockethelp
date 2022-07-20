import { Input as NativeBaseInput, IInputProps } from 'native-base'
import { Controller, Control } from 'react-hook-form'

type Props = IInputProps & {
   control?: Control
   name: string
}

export function Input({ control, name, ...rest }: Props) {
   return (
      <Controller
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
         name={name}
      />
   )
}
