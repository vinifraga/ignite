import styled from 'styled-components';

const Title = styled.h1`
  font-size: 64px;
  color: #8257e6;
`;

export function App() {
  return (
    <div className="App">
      <Title>
        Hello World
        <button>Salvar</button>
      </Title>
    </div>
  );
}
