import styled from 'styled-components/native';
import logo from '../../assets/logo.png';

export const Image = styled.Image.attrs({
  source: logo,
})`
  width: 24px;
  height: 24px;
`;

export const Container = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
`;
