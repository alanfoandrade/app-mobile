import styled from 'styled-components/native';

import { TextInputMask } from 'react-native-masked-text';

export const Wrapper = styled.View`
  align-items: flex-start;
`;

export const InputTitle = styled.Text`
  font-size: 16px;
  color: ${(props) => props.color};
`;

export const Container = styled.View`
  height: 45px;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.color};

  flex-direction: row;
`;

export const TInput = styled(TextInputMask).attrs({
  placeholderTextColor: '#999',
  textAlignVertical: 'bottom',
})`
  flex: 1;
  font-size: 16px;
  color: ${(props) => props.inputColor};
`;
