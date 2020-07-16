import React from 'react';
import { useDispatch } from 'react-redux';

import { signOut } from '../../store/modules/auth/actions';

import { Container, LogoutButton } from './styles';

const Dashboard = () => {
  const dispatch = useDispatch();

  return (
    <Container>
      <LogoutButton
        name="power-settings-new"
        size={25}
        onPress={() => dispatch(signOut())}
      >
        SAIR
      </LogoutButton>
    </Container>
  );
};

export default Dashboard;
