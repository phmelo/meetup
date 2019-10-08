import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 900px;
  margin: 50px auto;
  display: flex;
  flex-direction: column;
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    strong {
      color: #fff;
      font-size: 24px;
      margin: 0 15px;
    }

    button {
      background: #f94d6a;
      width: 150px;
      color: #fff;
      border: 0;
      border-radius: 4px;
      overflow: hidden;
      margin-top: auto;
      display: flex;
      align-items: center;
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
  ul {
    list-style-type: none;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 15px;
    margin-top: 30px;
  }
`;

export const Meetup = styled.li`
  button {
    width: 900px;
    border: 0;
    div {
      padding: 20px;
      background: #000;
      display: flex;
      justify-content: space-between;
      strong {
        display: block;
        color: #fff;
        font-size: 20px;
        font-weight: normal;
        align-self: center;
      }
      div {
        display: flex;
        align-items: center;
        padding: 12px;

        span {
          display: block;
          color: #fff;
          opacity: 0.6;
          align-self: right;
        }
        svg {
          margin-left: 15px;
        }
      }
    }
  }
`;
