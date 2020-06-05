import React from 'react';
import PropTypes from 'prop-types';

import { TextLogo } from './styles';

export default function Logo({ style }) {
  return <TextLogo style={style}>palmcar</TextLogo>;
}

Logo.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

Logo.defaultProps = {
  style: {},
};
