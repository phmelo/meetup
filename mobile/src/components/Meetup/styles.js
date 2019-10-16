import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.View`
  margin-bottom: 15px;
  border-radius: 4px;
  background: #fff;
`;

export const Top = styled.View`
  display: flex;
  flex-direction: column;
  margin-top: 5px;
  margin-left: 15px;
  margin-bottom: 5px;
`;

export const Banner = styled.Image.attrs({ resizeMode: 'cover' })`
  width: 100%;
  height: 150px;
`;

export const Title = styled.Text`
  font-size: 22px;
  margin-top: 5px;
`;

export const Info = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
  margin-left: 5px;
`;

export const InfoItem = styled.Text`
  margin-left: 5px;
  font-size: 13px;
  color: #999999;
`;

export const SubscribeButton = styled(Button)`
  margin-top: 5px;
  margin-left: 15px;
  margin-right: 15px;
  height: 40px;
  margin-bottom: 15px;
`;
