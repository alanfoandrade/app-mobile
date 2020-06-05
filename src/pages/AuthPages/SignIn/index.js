import React, { useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from '@unform/mobile';
import * as Yup from 'yup';

import PropTypes from 'prop-types';
import getValidationErrors from '../../../utils/getValidationErrors';
import strings from '../../../assets/strings';

import { signInRequest } from '../../../store/modules/auth/actions';

import {
  FormContainer,
  FormInput,
  FormInputMasked,
  SignInButton,
  LinkBar,
  PassRecovery,
  PassRecoveryText,
  SignUpLink,
  SignUpLinkText,
} from './styles';

import AuthLayout from '../../__layout/AuthLayout';

export default function SignIn({ navigation }) {
  const formRef = useRef(null);
  const passwordInputRef = useRef(null);

  const loading = useSelector((state) => state.auth.loading);

  const dispatch = useDispatch();

  const handleSubmit = useCallback(
    async (data) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          cpf: Yup.string()
            .min(11, 'Formato 11 dígitos')
            .max(11, 'Formato 11 dígitos')
            .required('CPF requerido'),
          password: Yup.string().required('Senha requerida'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        dispatch(signInRequest(data.cpf, data.password));
      } catch (err) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
      }
    },
    [dispatch]
  );

  return (
    <AuthLayout>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <FormContainer>
          <FormInputMasked
            title={`${strings.input_cpf}`}
            name="cpf"
            type="cpf"
            keyboardType="number-pad"
            returnKeyType="next"
            onSubmitEditing={() => {
              passwordInputRef.current.focus();
            }}
          />

          <FormInput
            ref={passwordInputRef}
            title={`${strings.input_password}`}
            name="password"
            secureTextEntry
            returnKeyType="send"
            onSubmitEditing={() => formRef.current?.submitForm()}
          />

          <SignInButton
            loading={loading}
            onPress={() => formRef.current?.submitForm()}
          >
            {strings.submit_button_signin}
          </SignInButton>
        </FormContainer>
      </Form>

      <LinkBar>
        <PassRecovery
          onPress={() => {
            formRef.current?.reset();
            formRef.current?.setErrors({});
            navigation.navigate('ForgotPassword');
          }}
        >
          <PassRecoveryText>{strings.link_forgot_password}</PassRecoveryText>
        </PassRecovery>

        <SignUpLink
          onPress={() => {
            formRef.current?.reset();
            formRef.current?.setErrors({});
            navigation.navigate('SignUp');
          }}
        >
          <SignUpLinkText>{strings.link_signup}</SignUpLinkText>
        </SignUpLink>
      </LinkBar>
    </AuthLayout>
  );
}

SignIn.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
