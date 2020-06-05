import React, { useState, useRef, useCallback } from 'react';
import { Alert } from 'react-native';
import { Form } from '@unform/mobile';
import * as Yup from 'yup';

import PropTypes from 'prop-types';
import getValidationErrors from '../../../utils/getValidationErrors';
import strings from '../../../assets/strings';

import api from '../../../services/api';

import {
  FormContainer,
  FormInput,
  RecoverPasswordButton,
  LinkBar,
  SignInLink,
  SignInLinkText,
} from './styles';

import AuthLayout from '../../__layout/AuthLayout';

export default function ForgotPassword({ navigation }) {
  const formRef = useRef(null);

  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    async (data) => {
      try {
        formRef.current?.setErrors({});
        setLoading(true);

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail requerido')
            .email('Formato de e-mail inválido'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('passwords', data);

        Alert.alert(
          'Verifique sua caixa de e-mail',
          'Copie o token recebido para fazer a alteração da senha'
        );

        navigation.navigate('ResetPassword');
      } catch (err) {
        err.name === 'ValidationError'
          ? formRef.current?.setErrors(getValidationErrors(err))
          : Alert.alert(
              'Falha ao enviar e-mail de recuperação de senha',
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
            title={`${strings.input_email}`}
            name="email"
            autoCapitalize="none"
            keyboardType="email-address"
            returnKeyType="send"
            blurOnSubmit={false}
            onSubmitEditing={() => formRef.current?.submitForm()}
          />

          <RecoverPasswordButton
            loading={loading}
            onPress={() => formRef.current?.submitForm()}
          >
            {strings.submit_button_recover_password}
          </RecoverPasswordButton>
        </FormContainer>
      </Form>

      <LinkBar>
        <SignInLink onPress={() => navigation.navigate('SignIn')}>
          <SignInLinkText>{strings.link_back_to_login}</SignInLinkText>
        </SignInLink>

        <SignInLink onPress={() => navigation.navigate('ResetPassword')}>
          <SignInLinkText>{strings.link_reset_password}</SignInLinkText>
        </SignInLink>
      </LinkBar>
    </AuthLayout>
  );
}

ForgotPassword.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
