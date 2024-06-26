'use client';
import { Dispatch } from 'react';
import { HStack, Stack } from 'styled-system/jsx';
import { FormLabel } from '~/components/ui/form-label';
import { Input, type InputProps as IP } from '~/components/ui/input';
import EmojiPopover from './EmojiPopover';
import { css } from 'styled-system/css';

interface InputProps extends IP {
  id: string;
  label: string;
  placeholder?: string;
  inputValue: string | number;
  setInputValue: Dispatch<React.SetStateAction<string | number>>;
  type?: string;
  emoji?: string;
  setEmoji?: Dispatch<React.SetStateAction<string>>;
}

export const InputLabeled = ({
  id,
  label,
  placeholder,
  inputValue,
  setInputValue,
  type,
  emoji,
  setEmoji,
  ...props
}: InputProps) => {
  return (
    <Stack gap="1.5" width="full">
      <FormLabel
        className={css({ fontSize: '2 rem', textStyle: 'title3.bold' })}
        htmlFor={id}
      >
        {label}
      </FormLabel>
      <HStack position="relative">
        {emoji && setEmoji && (
          <EmojiPopover emoji={emoji} setEmoji={setEmoji} />
        )}
        <Input
          id={id}
          placeholder={placeholder}
          value={inputValue}
          type={type}
          step={100}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          {...props}
        />
      </HStack>
    </Stack>
  );
};

export default InputLabeled;
