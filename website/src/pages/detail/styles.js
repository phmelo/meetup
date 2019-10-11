import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  align-items: center;
  margin-top: 50px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  h1 {
    font-size: 32px;
    color: #fff;
  }
  div {
    display: flex;
    > button {
      background: #f94d6a;
      width: 138px;
      height: 42px;
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
        align-self: center;
        flex: 1;
        text-align: left;
        font-weight: bold;
      }
    }
  }
  button {
    margin-left: 20px;
    background: #4dbaf9;
    width: 138px;
    height: 42px;
    color: #fff;
    border: 0;
    border-radius: 4px;
    overflow: hidden;
    margin-top: auto;
    display: flex;
    align-self: flex-end;
    transition: background 0.2s;
    &:hover {
      background: ${darken(0.03, '#4DBAF9')};
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
      align-self: center;
      text-align: left;
      font-weight: bold;
    }
  }
`;

export const Banner = styled.img`
  margin-top: 30px;
  align-self: center;
  height: 300px;
  object-fit: cover;
`;

export const DateLocal = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 30px;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgba(255, 255, 255, 0.6);
    svg {
      margin-right: 10px;
    }
  }
  div + div {
    margin-left: 30px;
  }
`;

export const Description = styled.div`
  margin-top: 25px;
  p {
    font-size: 18px;
    line-height: 32px;
    color: #fff;
  }
`;
