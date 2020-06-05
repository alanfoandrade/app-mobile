import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { darken } from 'polished';

import Icon from 'react-native-vector-icons/MaterialIcons';

import colors from '../../styles/colors';

export const Container = styled(RectButton)`
  align-self: stretch;
  height: 38px;
  border-radius: 4px;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const StyledIcon = styled(Icon)`
  color: ${colors.secondary};
`;

export const Wrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const IconContainer = styled.View`
  width: 50px;
  height: 38px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  background: ${(props) =>
    props.backgroundColor
      ? darken(0.05, props.backgroundColor)
      : colors.secondary};

  display: ${(props) => (props.name ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
`;

export const TextContainer = styled.View`
  height: 38px;
  align-self: stretch;
  padding-right: ${(props) => (props.name ? '50px' : 0)};

  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Text = styled.Text`
  color: ${colors.white};
  font-weight: bold;
  font-size: 16px;
`;
