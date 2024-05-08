'use client';
import { useState } from 'react';
import { Stack } from 'styled-system/jsx';
import { FormLabel } from '~/components/ui/form-label';
import { Input, type InputProps as IP } from '~/components/ui/input';
import { css } from 'styled-system/css';
interface InputProps extends IP {
  id: string;
  label: string;
  placeholder?: string;
  value?: string;
  type?: string;
}

export const InputLabeled = ({
  id,
  label,
  placeholder,
  value,
  type,
  ...props
}: InputProps) => {
  let [inputValue, setInputValue] = useState(value);
  return (
    <Stack gap="1.5" width="full">
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <Input
        id={id}
        placeholder={placeholder}
        value={inputValue}
        type={type}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        {...props}
      />
    </Stack>
  );
};

export default InputLabeled;
