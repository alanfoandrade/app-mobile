import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

import Logo from '../../../components/Logo';

export default function AuthLayout({ styles, children }) {
  return (
    <Container>
      <Logo style={styles} />
      {children}
    </Container>
  );
}

AuthLayout.propTypes = {
  styles: PropTypes.shape(),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
  ]).isRequired,
};

AuthLayout.defaultProps = {
  styles: {},
};
