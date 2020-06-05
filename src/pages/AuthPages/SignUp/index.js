import React, { useRef, useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { Form } from '@unform/mobile';
import * as Yup from 'yup';

import PropTypes from 'prop-types';
import getValidationErrors from '../../../utils/getValidationErrors';

import api from '../../../services/api';

import strings from '../../../assets/strings';

import {
  Wrapper,
  FormContainer,
  FormInput,
  FormInputMasked,
  SignUpButton,
  SignInLink,
  SignInLinkText,
} from './styles';

import AuthLayout from '../../__layout/AuthLayout';

export default function SignUp({ navigation }) {
  const formRef = useRef(null);
  const emailInputRef = useRef(null);
  const cpfInputRef = useRef(null);
  const phoneInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const confirmPasswordInputRef = useRef(null);

  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    async (data) => {
      try {
        formRef.current?.setErrors({});
        setLoading(true);

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome requerido'),
          email: Yup.string()
            .required('E-mail requerido')
            .email('Formato de e-mail inválido'),
          cpf: Yup.string()
            .min(11, 'Formato 11 dígitos')
            .max(11, 'Formato 11 dígitos')
            .required('CPF requerido'),
          phone: Yup.string()
            .min(11, 'Formato 11 dígitos')
            .max(11, 'Formato 11 dígitos')
            .required('Telefone requerido'),
          password: Yup.string().min(6, 'Mínimo 6 caracteres'),
          password_confirmation: Yup.string()
            .required('Confirme a senha')
            .when('password', (password, field) =>
              password
                ? field.oneOf([Yup.ref('password')], 'Senhas diferentes')
                : field
            ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('users', data);

        navigation.navigate('SignIn');
      } catch (err) {
        err.name === 'ValidationError'
          ? formRef.current?.setErrors(getValidationErrors(err))
          : Alert.alert(
              'Falha no cadastro',
              err?.response?.data
                ? String(
                    err?.response?.data.map((validation) => {
                      return validation.message;
                    })
                  )
                : 'Verifique os dados, tente novamente'
            );

        setLoading(false);
      }
    },
    [navigation]
  );

  return (
    <Wrapper>
      <AuthLayout styles={{ marginTop: 30 }}>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <FormContainer>
            <FormInput
              title={`${strings.input_name}`}
              name="name"
              autoCapitalize="words"
              returnKeyType="next"
              onSubmitEditing={() => {
                emailInputRef.current.focus();
              }}
            />
            <FormInput
              ref={emailInputRef}
              title={`${strings.input_email}`}
              name="email"
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"
              onSubmitEditing={() => {
                cpfInputRef.current.focus();
              }}
            />
            <FormInputMasked
              ref={cpfInputRef}
              title={`${strings.input_cpf}`}
              name="cpf"
              type="cpf"
              keyboardType="number-pad"
              returnKeyType="next"
              onSubmitEditing={() => {
                phoneInputRef.current.focus();
              }}
            />
            <FormInputMasked
              ref={phoneInputRef}
              title={`${strings.input_phone}`}
              name="phone"
              type="cel-phone"
              options={{
                maskType: 'BRL',
                withDDD: true,
                dddMask: '(99) ',
              }}
              keyboardType="phone-pad"
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
              returnKeyType="next"
              onSubmitEditing={() => {
                confirmPasswordInputRef.current.focus();
              }}
            />
            <FormInput
              ref={confirmPasswordInputRef}
              title={`${strings.input_password_confirm}`}
              name="password_confirmation"
              secureTextEntry
              returnKeyType="send"
              onSubmitEditing={() => formRef.current?.submitForm()}
            />
            <SignUpButton
              loading={loading}
              onPress={() => formRef.current?.submitForm()}
            >
              {strings.submit_button_signup}
            </SignUpButton>
          </FormContainer>
        </Form>

        <SignInLink
          onPress={() => {
            navigation.navigate('SignIn');
          }}
        >
          <SignInLinkText>{strings.link_signin}</SignInLinkText>
        </SignInLink>
      </AuthLayout>
    </Wrapper>
  );
}

SignUp.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
