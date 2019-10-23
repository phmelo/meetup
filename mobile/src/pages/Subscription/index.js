import React, { useState, useEffect } from 'react';
import { withNavigationFocus } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Background from '~/components/Background';

import Meetup from '~/components/Meetup';
import api from '~/services/api';
import { Container, List } from './styles';

export function Subscription({ isFocused }) {
  const [meetups, setMeetups] = useState([]);

  async function loadSubscriptions() {
    const response = await api.get('/signedupmeetups');
    console.tron.log(response.data);
    setMeetups(response.data);
  }
  useEffect(() => {
    if (isFocused) {
      loadSubscriptions();
    }
  }, [isFocused]);

  async function removeMeetup(id) {
    setMeetups(meetups.filter(m => m.id !== id));
  }

  return (
    <Background>
      <Container>
        <List
          data={meetups}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Meetup
              data={item.Meetup}
              onButtonClick={() => removeMeetup(item.id)}
              typeAction="unsubscribe"
              cardKey={item.id}
            />
          )}
        />
      </Container>
    </Background>
  );
}

Subscription.navigationOptions = {
  tabBarLabel: 'Inscrições',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="local-offer" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(Subscription);
