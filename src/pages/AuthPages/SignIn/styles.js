import { Platform } from 'react-native';
import styled from 'styled-components/native';

import Input from '../../../components/Input';
import InputMasked from '../../../components/InputMasked';
import SubmitButton from '../../../components/SubmitButton';

import colors from '../../../styles/colors';

export const Wrapper = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})``;

export const FormContainer = styled.View`
  align-self: stretch;
  margin-top: 40px;
`;

export const FormInput = styled(Input).attrs({
  color: `${colors.primary}`,
  inputColor: `${colors.secondary}`,
})`
  margin-bottom: 30px;
  color: ${colors.primary};
`;

export const FormInputMasked = styled(InputMasked).attrs({
  color: `${colors.primary}`,
  inputColor: `${colors.secondary}`,
})`
  margin-bottom: 30px;
  color: ${colors.primary};
`;

export const SignInButton = styled(SubmitButton)`
  margin-top: 10px;
  background: ${colors.primaryVariant};
`;

export const LinkBar = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-self: stretch;
`;

export const PassRecovery = styled.TouchableOpacity`
  margin-top: 20px;
`;

export const PassRecoveryText = styled.Text`
  color: ${colors.white};
  font-weight: bold;
  font-size: 16px;
`;

export const SignUpLink = styled.TouchableOpacity`
  margin-top: 20px;
`;

export const SignUpLinkText = styled.Text`
  color: ${colors.white};
  font-weight: bold;
  font-size: 16px;
`;
