import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
// import { utcToZonedTime } from 'date-fns-tz';
import { Link } from 'react-router-dom';
import pt from 'date-fns/locale/pt';

import { MdAddCircleOutline, MdKeyboardArrowRight } from 'react-icons/md';
import { Container, Meetup } from './styles';
import api from '../../services/api';

export default function Dashboard() {
  const [meetup, setMeetup] = useState([]);

  useEffect(() => {
    async function loadMeetup() {
      // const dateParam = format(new Date(), 'yyyy-MM-dd', { locale: pt });
      const response = await api.get('meetups', {
        // params: { date: dateParam },
      });

      const data = response.data.map(d => ({
        ...d,
        formattedDate: format(
          parseISO(d.datetime),
          "d 'de' MMMM', às' HH 'horas'",
          {
            locale: pt,
          }
        ),
      }));
      setMeetup(data);
    }
    loadMeetup();
  }, []);

  return (
    <Container>
      <header>
        <strong>Meus meetups</strong>
        <Link to="/create">
          <button type="button">
            <div>
              <MdAddCircleOutline size={24} color="#FFF" />
            </div>
            <span>Novo meetup</span>
          </button>
        </Link>
      </header>

      <ul>
        {meetup &&
          meetup.map(m => (
            <Meetup key={m.id}>
              <Link to={`/edit/${m.id}`}>
                <button type="button">
                  <div>
                    <strong>{m.description}</strong>
                    <div>
                      <span>{m.formattedDate} </span>
                      <MdKeyboardArrowRight size={24} color="#FFF" />
                    </div>
                  </div>
                </button>
              </Link>
            </Meetup>
          ))}
      </ul>
    </Container>
  );
}
