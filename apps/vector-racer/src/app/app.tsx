import { useState } from 'react';
import styled from 'styled-components';
import { Game, GameContainer } from './game.component';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import gameService from './game.service';

const StyledApp = styled.div`
  // Your style here
`;

const StartGame = () => {
  const navigate = useNavigate();
  return <button onClick={() => navigate('1')}>Start Game</button>;
};

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = () => {
    gameService.signin(username, password).then(res=>console.log(res));
  }

  const handler = () => {
    gameService.getAuthUser().then(res=>console.log(res));
  }

  return (
    <div>
      <div>
        <label>Username: </label>
        <input type="text" onChange={event => {
          setUsername(event.target.value)
        }} value={username}></input>
      </div>
      <div>
        <label>Password: </label>
        <input type="password" onChange={event =>{
          setPassword(event.target.value)
        }} value={password}></input>
      </div>
      <button onClick={submitHandler}>Submit</button>

      <button onClick={handler}>Token</button>
    </div>
  );
};

export function App() {
  return (
    <StyledApp>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/:id" element={<GameContainer />} />
        </Routes>
      </BrowserRouter>
    </StyledApp>
  );
}

export default App;
