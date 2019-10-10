import styled from 'styled-components';

export const Container = styled.div`
  align-self: center;
  width: 100%;
  label {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 300px;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 4px;

    &:hover {
      opacity: 0.7;
    }

    img {
      height: 300px;
    }
    div {
      display: flex;
      flex-direction: column;
      align-items: center;

      strong {
        font-size: 20px;
        line-height: 23px;
        color: rgba(255, 255, 255, 0.3);
      }
    }
    input {
      display: none;
    }
  }
`;
