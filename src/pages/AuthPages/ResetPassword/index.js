import React, { useState, useRef, useCallback } from 'react';
import { Form } from '@unform/mobile';
import * as Yup from 'yup';
import { Alert } from 'react-native';

import PropTypes from 'prop-types';
import getValidationErrors from '../../../utils/getValidationErrors';
import strings from '../../../assets/strings';

import api from '../../../services/api';

import {
  FormContainer,
  FormInput,
  RecoverPasswordButton,
  SignInLink,
  SignInLinkText,
} from './styles';

import AuthLayout from '../../__layout/AuthLayout';

export default function ForgotPassword({ navigation }) {
  const formRef = useRef(null);
  const passwordInputRef = useRef(null);
  const confirmPasswordInputRef = useRef(null);

  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    async (data) => {
      try {
        formRef.current?.setErrors({});
        setLoading(true);

        const schema = Yup.object().shape({
          token: Yup.string().required('Token requerido'),
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

        await api.put('passwords', data);

        navigation.navigate('SignIn');
      } catch (err) {
        err.name === 'ValidationError'
          ? formRef.current?.setErrors(getValidationErrors(err))
          : Alert.alert(
              'Falha ao alterar senha',
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
    <AuthLayout>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <FormContainer>
          <FormInput
            title={`${strings.input_token}`}
            name="token"
            autoCapitalize="none"
            returnKeyType="next"
            onSubmitEditing={() => {
              passwordInputRef.current.focus();
            }}
          />

          <FormInput
            ref={passwordInputRef}
            title={`${strings.input_new_password}`}
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
            secureTextEntry
            name="password_confirmation"
            returnKeyType="send"
            onSubmitEditing={() => formRef.current?.submitForm()}
          />

          <RecoverPasswordButton
            loading={loading}
            onPress={() => formRef.current?.submitForm()}
          >
            {strings.submit_button_save}
          </RecoverPasswordButton>
        </FormContainer>
      </Form>

      <SignInLink onPress={() => navigation.navigate('SignIn')}>
        <SignInLinkText>{strings.link_back_to_login}</SignInLinkText>
      </SignInLink>
    </AuthLayout>
  );
}

ForgotPassword.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
