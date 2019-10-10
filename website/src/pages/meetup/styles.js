import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;

  align-items: center;
  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    > div {
      margin: 0 0 10px;
    }

    input {
      background: rgba(0, 0, 0, 0.2);
      border: 0;
      border-radius: 4px;
      font-size: 18px;
      height: 44px;
      padding: 0 15px;
      color: #fff;
      margin: 0 0 10px;
      width: 100%;

      &::placeholder {
        color: rgba(255, 255, 255 0.7);
      }
    }

    textarea {
      background: rgba(0, 0, 0, 0.2);
      border: 0;
      border-radius: 4px;
      font-size: 18px;
      height: 200px;
      padding: 0 15px;
      color: #fff;
      margin: 0 0 10px;
      font-family: Roboto;

      &::placeholder {
        color: rgba(255, 255, 255 0.7);
      }
    }

    > button {
      background: #f94d6a;
      width: 150px;
      color: #fff;
      border: 0;
      border-radius: 4px;
      overflow: hidden;
      margin-top: auto;
      display: flex;
      align-self: flex-end;
      transition: background 0.2s;
      &:hover {
        background: ${darken(0.03, '#f94d6a')};
      }
      div {
        display: flex;
        align-items: center;
        padding: 12px;
        background: rgba(0, 0, 0, 0);
        svg {
          margin-right: 4px;
        }
      }
      span {
        flex: 1;
        text-align: left;
        font-weight: bold;
      }
    }
  }
`;
