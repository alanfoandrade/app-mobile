import styled from 'styled-components/native';

import Input from '../../../components/Input';
import SubmitButton from '../../../components/SubmitButton';

import colors from '../../../styles/colors';

export const Wrapper = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
  align-self: stretch;
`;

export const FormContainer = styled.View`
  align-self: stretch;
  margin-top: 40px;
`;

export const FormInput = styled(Input).attrs({
  color: `${colors.primary}`,
  inputColor: `${colors.secondary}`,
})`
  margin-bottom: 30px;
`;

export const SignUpButton = styled(SubmitButton)`
  margin-top: 10px;
  background: ${colors.primaryVariant};
`;

export const SignInLink = styled.TouchableOpacity`
  margin-top: 20px;
`;

export const SignInLinkText = styled.Text`
  color: ${colors.white};
  font-weight: bold;
  font-size: 16px;

  margin-bottom: 20px;
`;
