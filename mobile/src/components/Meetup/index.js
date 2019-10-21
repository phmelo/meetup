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

export default function Meetup({ data, onButtonClick, typeAction, cardKey }) {
  const [isSubscribing, setIsSubscribing] = useState(false);

  const dateFormatted = useMemo(() => {
    return format(parseISO(data.datetime), "dd 'de' MMMM', às' HH:mm ", {
      locale,
    });
  }, [data]);

  async function handleSubscription(id) {
    console.tron.log(`ID: ${id}`);
    console.tron.log(`cardKey: ${cardKey}`);
    console.tron.log(`typeAction: ${typeAction}`);
    try {
      setIsSubscribing(true);
      if (typeAction && typeAction === 'subscribe') {
        await api.post(`/meetup/subscribe/${id}`);
        Alert.alert(`Inscrição realizada. ID: ${id}`);
        setIsSubscribing(false);
        onButtonClick(id);
      } else {
        await api.delete(`/meetup/unsubscribe/${cardKey}`);
        Alert.alert(`Inscrição excluida. ID: ${cardKey}`);
        setIsSubscribing(false);
        onButtonClick(cardKey);
      }
    } catch (error) {
      Alert.alert(error.response.data.error);
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
        {typeAction === 'subscribe'
          ? 'Realizar Inscrição'
          : 'Cancelar Inscrição'}
      </SubscribeButton>
    </Container>
  );
}
