import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from '@rocketseat/unform';
import { MdAddCircleOutline } from 'react-icons/md';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { Container } from './styles';
import BannerInput from './BannerInput';
import Datepicker from './Datepicker';
import api from '../../services/api';

const schema = Yup.object().shape({
  banner_id: Yup.number().required('A imagem é obrigatória'),
  title: Yup.string().required('O título é obrigatório'),
  description: Yup.string().required('A descrição é obrigatória'),
  datetime: Yup.string()
    .required('A data e hora são obrigatórias')
    .nullable(),
  location: Yup.string().required('A localização é obrigatória'),
});

export default function Meetup({ match, history }) {
  const [meetup, setMeetup] = useState([]);
  const [description, setDescription] = useState('');
  const meetupId = match.params.id;

  async function saveMeetup(data) {
    try {
      if (meetupId) {
        await api.put('/meetups', data);
        toast.success('Meetup alterado com sucesso');
      } else {
        await api.post('/meetups', data);
        toast.success('Meetup criado com sucesso');
      }
    } catch (err) {
      console.tron.error(err);
      toast.error('Error ao criar o meetup');
    }
  }

  function handleSubmit(data) {
    saveMeetup(meetupId ? { ...data, id: meetupId } : data);
    console.tron.log(meetupId ? { ...data, id: meetupId } : data);
  }

  useEffect(() => {
    async function loadMeetup() {
      const response = await api.get(`/meetups/${meetupId}`);
      const { data } = response;
      setMeetup(data[0]);
      setDescription(data[0].description);
    }
    if (meetupId) {
      loadMeetup();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meetupId]);

  return (
    <Container>
      <Form schema={schema} initialData={meetup} onSubmit={handleSubmit}>
        {meetup.File ? (
          <BannerInput
            name="banner_id"
            imageId={meetup.banner_id}
            imageUrl={meetup.File.url}
          />
        ) : (
          <BannerInput name="banner_id" imageId={meetup.banner_id} />
        )}

        <Input name="title" placeholder="Titulo do Meetup" autoComplete="off" />
        <Input
          multiline
          name="description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Descrição completa"
        />
        <Datepicker
          name="datetime"
          meetupDate={meetup.datetime}
          initialDate={meetup.datetime}
        />
        <Input name="location" placeholder="Localização" autoComplete="off" />
        <button type="submit">
          <div>
            <MdAddCircleOutline size={18} color="#FFF" />
            <strong>Salvar meetup</strong>
          </div>
        </button>
      </Form>
    </Container>
  );
}
Meetup.propTypes = {
  meetup: PropTypes.object,
};

Meetup.defaultProps = {
  meetup: {
    title: '',
    description: '',
    datetime: null,
    location: '',
    banner_id: null,
    File: {
      url: '',
    },
  },
};
