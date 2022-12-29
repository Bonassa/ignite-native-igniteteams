import React from 'react';
import { useTheme } from 'styled-components/native';
import { TextInput, TextInputProps } from 'react-native';
import { Container } from './styles';

interface InputProps extends TextInputProps {
  inputRef?: React.RefObject<TextInput>;
}

export const Input: React.FC<InputProps> = ({inputRef, ...rest }) => {
  const { COLORS } = useTheme();
  return (
    <Container
      ref={inputRef}
      placeholderTextColor={COLORS.GRAY_300}
      {...rest}
    />
  );
}