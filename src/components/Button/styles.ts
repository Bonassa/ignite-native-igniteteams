import styled, { css } from 'styled-components/native';
import { TouchableOpacity } from 'react-native';

export type ButtonStylesType = 'PRIMARY' | 'SECONDARY';

interface ButtonStylesProps {
  type: ButtonStylesType;
}

export const Container = styled(TouchableOpacity)<ButtonStylesProps>`
  flex: 1;
  align-items: center;
  justify-content: center;

  min-height: 56px;
  max-height: 56px;

  background-color: ${({ theme, type }) => type === 'PRIMARY' ? theme.COLORS.GREEN_700 : theme.COLORS.RED_DARK};
  border-radius: 6px;
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.MD}px;
    font-family: ${theme.FONT_FAMILY.BOLD};
    color: ${theme.COLORS.WHITE};
  `}
`;