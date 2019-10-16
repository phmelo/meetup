import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, Button, Date } from './styles';

export default function DatePicker() {
  return (
    <Container>
      <Button>
        <Icon name="keyboard-arrow-left" size={36} color="#fff" />
      </Button>
      <Date>12 de Maio</Date>
      <Button>
        <Icon name="keyboard-arrow-right" size={36} color="#fff" />
      </Button>
    </Container>
  );
}
