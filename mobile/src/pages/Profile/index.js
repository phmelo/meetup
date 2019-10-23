import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Background from '~/components/Background';
import { signOut, editAuthRequest } from '~/store/modules/auth/actions';

import {
  Container,
  Separator,
  Form,
  FormInput,
  SubmitButton,
  SignOutButton,
} from './styles';

export default function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.auth.user);

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordNewRef = useRef();
  const confirmPasswordRef = useRef();

  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [password, setPassword] = useState(``);
  const [password_new, setNewPassword] = useState(``);
  const [password_confirm, setConfirmpassword] = useState(``);

  function handleSignOut() {
    dispatch(signOut());
  }

  function handleSubmit() {
    if (password) {
      dispatch(
        editAuthRequest({
          name,
          email,
          password,
          password_new,
          password_confirm,
        }),
      );
    } else {
      dispatch(
        editAuthRequest({
          name,
          email,
        }),
      );
    }
    setPassword('');
    setNewPassword('');
    setConfirmpassword('');
  }

  return (
    <Background>
      <Container>
        <Form>
          <FormInput
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite seu nome"
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current.focus()}
            value={name}
            onChangeText={setName}
          />
          <FormInput
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite seu email"
            ref={emailRef}
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
            value={email}
            onChangeText={setEmail}
          />
          <Separator />
          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Digite sua senha atual"
            ref={passwordRef}
            returnKeyType="next"
            onSubmitEditing={() => passwordNewRef.current.focus()}
            value={password}
            onChangeText={setPassword}
          />
          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Digite a nova senha"
            ref={passwordNewRef}
            returnKeyType="next"
            onSubmitEditing={() => confirmPasswordRef.current.focus()}
            value={password_new}
            onChangeText={setNewPassword}
          />
          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Confirme a nova senha"
            ref={confirmPasswordRef}
            returnKeyType="send"
            value={password_confirm}
            onChangeText={setConfirmpassword}
          />
          <SubmitButton onPress={handleSubmit}>Atualizar Perfil</SubmitButton>
          <SignOutButton onPress={handleSignOut}>Sair do Meetapp</SignOutButton>
        </Form>
      </Container>
    </Background>
  );
}

Profile.navigationOptions = {
  tabBarLabel: 'Meu perfil',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="person" size={20} color={tintColor} />
  ),
};
