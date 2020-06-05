import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { Text } from 'react-native';
import { useField } from '@unform/core';
import PropTypes from 'prop-types';

import { Wrapper, InputTitle, Container, TInput } from './styles';

function Input({ name, title, style, ...rest }, ref) {
  const inputElementRef = useRef(null);

  const { registerField, defaultValue = '', fieldName, error } = useField(name);

  const inputValueRef = useRef({ value: defaultValue });

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    },
  }));

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(_, value) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({ text: value });
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    <Wrapper style={style}>
      <InputTitle {...rest}>{title}</InputTitle>
      <Container {...rest}>
        <TInput
          {...rest}
          ref={inputElementRef}
          defaultValue={defaultValue}
          onChangeText={(value) => {
            inputValueRef.current.value = value;
          }}
        />
        <Text style={{ color: '#C53030' }}>{error}</Text>
      </Container>
    </Wrapper>
  );
}

export default forwardRef(Input);

Input.propTypes = {
  name: PropTypes.string.isRequired,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  title: PropTypes.string.isRequired,
};

Input.defaultProps = {
  style: {},
};
