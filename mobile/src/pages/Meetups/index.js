import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Background from '~/components/Background';
import Meetup from '~/components/Meetup';
import DatePicker from '~/components/DatePicker';
import api from '~/services/api';
import { Container, List } from './styles';

export default function Meetups() {
  const [meetups, setMeetups] = useState([]);

  async function loadMeetups(date, page = 1) {
    const response = await api.get('/meetups', {
      params: { date, page },
    });
    setMeetups(response.data);
  }

  return (
    <Background>
      <DatePicker onChangeDate={date => loadMeetups(date)} />
      <Container>
        <List
          data={meetups}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => <Meetup data={item} />}
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
