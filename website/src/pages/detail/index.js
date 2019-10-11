import React, { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { Link } from 'react-router-dom';
import pt from 'date-fns/locale/pt';
import {
  MdEdit,
  MdDeleteForever,
  MdInsertInvitation,
  MdRoom,
} from 'react-icons/md';
import { toast } from 'react-toastify';
import api from '../../services/api';
import { Container, Header, DateLocal, Banner, Description } from './styles';

export default function Detail({ match, history }) {
  const meetupId = match.params.id;
  const [meetup, setMeetup] = useState([]);

  useEffect(() => {
    async function loadMeetup() {
      const response = await api.get(`/meetups/${meetupId}`);
      const { data } = response;

      const dataParsed = {
        ...data[0],
        formattedDate: format(
          parseISO(data[0].datetime),
          "d 'de' MMMM', às' HH 'horas'",
          {
            locale: pt,
          }
        ),
      };
      setMeetup(dataParsed);

      // setMeetup(data[0]);
    }
    if (meetupId) {
      loadMeetup();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meetupId]);

  async function handleDelete() {
    try {
      await api.delete(`/meetups/${meetupId}`);
      console.tron.log(`/meetups/${meetupId}`);
      toast.success('Meetup cancelado com sucesso');
      history.push('/dashboard');
    } catch (err) {
      console.tron.log(err);
      toast.error('Não é possivel cancelar esse Meetup');
    }
  }

  return (
    <Container>
      <Header>
        <h1>{meetup.title}</h1>
        <div>
          <Link to={`/edit/${meetupId}`}>
            <button type="button">
              <div>
                <MdEdit size={24} color="#FFF" />
              </div>
              <span>Editar</span>
            </button>
          </Link>
          <button type="button" onClick={handleDelete}>
            <div>
              <MdDeleteForever size={24} color="#FFF" />
            </div>
            <span>Cancelar</span>
          </button>
        </div>
      </Header>
      <div>
        {meetup.File ? (
          <Banner src={meetup.File.url} alt="Banner" />
        ) : (
          <Banner src="http://nofilefound" alt="No banner found" />
        )}
        <Description>
          <p>{meetup.description}</p>
        </Description>

        <DateLocal>
          <div>
            <MdInsertInvitation size={20} />
            <span>{meetup.formattedDate}</span>
          </div>
          <div>
            <MdRoom size={20} />
            <span>{meetup.location}</span>
          </div>
        </DateLocal>
      </div>
    </Container>
  );
}
