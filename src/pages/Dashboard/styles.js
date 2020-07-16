import styled from 'styled-components/native';

import SubmitButton from '../../components/SubmitButton';

import colors from '../../styles/colors';

export const Container = styled.View``;

export const LogoutButton = styled(SubmitButton).attrs({
  backgroundColor: `${colors.primary}`,
})`
  height: 38px;
`;
