import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Background from '~/components/Background';
import Meetup from '~/components/Meetup';
import DatePicker from '~/components/DatePicker';
import api from '~/services/api';
import { Container, List } from './styles';

export default function Meetups() {
  const [meetups, setMeetups] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentDate, setCurrentDate] = useState(new Date());

  async function loadMeetups(date, page = 1) {
    const response = await api.get('/meetups', {
      params: { date, page },
    });

    if (date === currentDate) {
      if (response.data.length <= 0) {
        return;
      }

      setCurrentPage(page);
      setMeetups([...meetups, ...response.data]);
    } else {
      setCurrentPage(1);
      setCurrentDate(date);
      setMeetups(response.data);
    }
  }

  async function loadMoreMeetups() {
    const nextPage = currentPage + 1;
    loadMeetups(currentDate, nextPage);
  }

  async function removeMeetup(id) {
    setMeetups(meetups.filter(m => m.id !== id));
  }

  return (
    <Background>
      <DatePicker onChangeDate={date => loadMeetups(date)} />
      <Container>
        <List
          data={meetups}
          onEndReachedThreshold={0.1}
          onEndReached={loadMoreMeetups}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Meetup data={item} onButtonClick={id => removeMeetup(id)} />
          )}
        />
      </Container>
    </Background>
  );
}

Meetups.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="format-list-bulleted" size={20} color={tintColor} />
  ),
};
