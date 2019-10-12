import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdAddCircleOutline } from 'react-icons/md';
import { Input, Form } from '@rocketseat/unform';
import * as Yup from 'yup';
import { editAuthRequest } from '../../store/modules/auth/actions';
import { Container } from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string()
    .test('validate', 'A senha deve possuir no mínimo 6 caracteres', function(
      value
    ) {
      if (value) {
        const pass = Yup.string().min(6);
        return pass.isValidSync(value);
      }
      return true;
    })
    .when('password_new', (password_new, field) =>
      password_new
        ? field
            .min(6, 'A senha deve ter pelo menos 6 caracteres')
            .required('Senha é obrigatória')
        : field
    ),
  password_new: Yup.string()
    .notRequired()
    .test('validate', 'A senha deve possuir no mínimo 6 caracteres', function(
      value
    ) {
      if (value) {
        const pass = Yup.string().min(6);
        return pass.isValidSync(value);
      }
      return true;
    }),

  password_confirm: Yup.string().when('password_new', (password_new, field) =>
    password_new
      ? field
          .required('A senha é obrigatória')
          .min(6, 'A senha deve ter no mínimo 6 caracteres')
          .oneOf(
            [Yup.ref('password_new')],
            'A nova senha não está igual a confirmação'
          )
      : field
  ),
});

export default function Profile() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  function handleSubmit(data) {
    const { name, email, password, password_confirm } = data;
    const { password_new } = data;
    const requestData = !password
      ? { name, email }
      : { name, email, password, password_new, password_confirm };

    dispatch(editAuthRequest(requestData));
  }

  return (
    <Container>
      <Form schema={schema} initialData={user} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Nome Completo" />
        <Input name="email" type="email" placeholder="E-mail" />
        <hr />
        <Input type="password" name="password" placeholder="Sua senha atual" />
        <Input
          type="password"
          name="password_new"
          placeholder="Sua nova senha"
        />
        <Input
          type="password"
          name="password_confirm"
          placeholder="Confirme a nova senha"
        />

        <button type="submit">
          <div>
            <MdAddCircleOutline size={18} color="#FFF" />
            <strong>Salvar perfil</strong>
          </div>
        </button>
      </Form>
    </Container>
  );
}
