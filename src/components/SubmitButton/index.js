import React from 'react';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

import {
  Container,
  IconContainer,
  Wrapper,
  StyledIcon,
  TextContainer,
  Text,
} from './styles';

export default function SubmitButton({
  name,
  size,
  children,
  loading,
  ...rest
}) {
  return (
    <Container {...rest}>
      <IconContainer name={name} backgroundColor={rest.backgroundColor}>
        <StyledIcon name={name} size={size} />
      </IconContainer>

      <Wrapper>
        {loading ? (
          <TextContainer name={name}>
            <ActivityIndicator size="small" color="#fff" />
          </TextContainer>
        ) : (
          <TextContainer name={name}>
            <Text>{children}</Text>
          </TextContainer>
        )}
      </Wrapper>
    </Container>
  );
}

SubmitButton.propTypes = {
  name: PropTypes.string,
  size: PropTypes.number,
  children: PropTypes.string.isRequired,
  loading: PropTypes.bool,
};

SubmitButton.defaultProps = {
  name: null,
  size: 20,
  loading: false,
};
