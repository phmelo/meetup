import React from 'react';
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

export default function Meetup() {
  return (
    <Container>
      <Banner
        source={{
          uri:
            'https://secure.meetupstatic.com/photos/event/3/c/0/7/highres_485235367.jpeg',
        }}
      />
      <Top>
        <Title>Nome do Evento</Title>
        <Info>
          <Icon name="event" size={20} color="rgba(153,153,153,1)" />
          <InfoItem>24 de Novembro, as 20:00</InfoItem>
        </Info>
        <Info>
          <Icon name="place" size={20} color="rgba(153,153,153,1)" />
          <InfoItem>Rua Pereira Nunes, 153</InfoItem>
        </Info>
        <Info>
          <Icon name="person" size={20} color="rgba(153,153,153,1)" />
          <InfoItem>Organizador: Paulo Henrique</InfoItem>
        </Info>
      </Top>
      <SubscribeButton onPress={() => {}}>Realizar Inscrição</SubscribeButton>
    </Container>
  );
}
