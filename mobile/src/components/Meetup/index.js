import React, { useMemo, useState } from 'react';
import { Alert } from 'react-native';
import { format, parseISO } from 'date-fns';
import locale from 'date-fns/locale/pt-BR';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '~/services/api';

import {
  Container,
  Top,
  Banner,
  Info,
  Title,
  SubscribeButton,
  InfoItem,
} from './styles';

export default function Meetup({ data, onButtonClick }) {
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);

  const dateFormatted = useMemo(() => {
    return format(parseISO(data.datetime), "dd 'de' MMMM', às' HH:mm ", {
      locale,
    });
  }, [data.datetime]);

  async function handleSubscription(id) {
    try {
      setIsSubscribing(true);

      await api.post(`/meetup/subscribe/${id}`);
      onButtonClick(id);
      // console.tron.log(response.error);
      // setMeetups(meetups.filter(m => m.id !== id));

      Alert.alert(`Inscrição realizada. ID: ${id}`);
    } catch (error) {
      Alert.alert(`Não foi possível se inscrever no Meetup`);
    } finally {
      setIsSubscribing(false);
    }
  }

  return (
    <Container>
      <Banner source={{ uri: data.File.url }} />
      <Top>
        <Title>{data.title}</Title>
        <Info>
          <Icon name="event" size={20} color="rgba(153,153,153,1)" />
          <InfoItem>{dateFormatted}</InfoItem>
        </Info>
        <Info>
          <Icon name="place" size={20} color="rgba(153,153,153,1)" />
          <InfoItem>{data.location}</InfoItem>
        </Info>
        <Info>
          <Icon name="person" size={20} color="rgba(153,153,153,1)" />
          <InfoItem>Organizador: {data.User.name}</InfoItem>
        </Info>
      </Top>
      <SubscribeButton
        loading={isSubscribing}
        onPress={() => handleSubscription(data.id)}
      >
        Realizar Inscrição
      </SubscribeButton>
    </Container>
  );
}
