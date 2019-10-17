import React, { useEffect, useMemo, useState } from 'react';
import { addDays, format } from 'date-fns';
import locale from 'date-fns/locale/pt-BR';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Container, PickerButton, PickerDate } from './styles';

export default function DatePicker({ onChangeDate }) {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    onChangeDate(date);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  const dateFormatted = useMemo(
    () => format(date, "dd 'de' MMMM", { locale }),
    [date],
  );

  function handleNext() {
    setDate(addDays(date, 1));
  }
  function handlePrevious() {
    setDate(addDays(date, -1));
  }
  return (
    <Container>
      <PickerButton onPress={handlePrevious}>
        <Icon name="keyboard-arrow-left" size={36} color="#fff" />
      </PickerButton>
      <PickerDate>{dateFormatted}</PickerDate>
      <PickerButton onPress={handleNext}>
        <Icon name="keyboard-arrow-right" size={36} color="#fff" />
      </PickerButton>
    </Container>
  );
}
