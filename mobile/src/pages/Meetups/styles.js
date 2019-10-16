import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const DateModifier = styled.Text`
  font-weight: bold;
  font-size: 14px;
  color: #333;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { paddingLeft: 15, paddingRight: 15 },
})``;
