import React, { useRef, useEffect, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import pt from 'date-fns/locale/pt';
import { useField } from '@rocketseat/unform';
import { parseISO } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';

export default function DatePicker({ name, meetupDate }) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [selected, setSelected] = useState(defaultValue);

  useEffect(() => {
    setSelected(meetupDate ? parseISO(meetupDate) : null);
  }, [meetupDate]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.selected',
      clearValue: pickerRef => {
        pickerRef.clear();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  return (
    <>
      <ReactDatePicker
        name={fieldName}
        selected={selected}
        onChange={date => setSelected(date)}
        ref={ref}
        minDate={new Date()}
        showTimeSelect
        locale={pt}
        timeFormat="HH:mm"
        dateFormat="dd 'de' MMMM', às' HH:mm"
        placeholderText="Data do meetup"
        autoComplete="off"
      />
      {error && <span>{error}</span>}
    </>
  );
}
