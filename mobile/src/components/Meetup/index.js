import React, { useMemo } from 'react';
import { format, parseISO } from 'date-fns';
import locale from 'date-fns/locale/pt-BR';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  Top,
  Banner,
  Info,
  Title,
  SubscribeButton,
  InfoItem,
} from './styles';

export default function Meetup({ data }) {
  const dateFormatted = useMemo(() => {
    return format(parseISO(data.datetime), "dd 'de' MMMM', às' HH:mm ", {
      locale,
    });
  }, [data.datetime]);

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
      <SubscribeButton onPress={() => {}}>Realizar Inscrição</SubscribeButton>
    </Container>
  );
}
