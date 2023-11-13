import { Grommet } from 'grommet';
import { useState } from 'react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';

import { Equip } from './equip/equip.component';
import { GameContainer } from './game.component';
import gameService from './game.service';
import { UserProvider } from './user.context';

const StartGame = () => {
  const createGame = () => {
    gameService.createGame().then(res => console.log(res));
  }
  return <button onClick={createGame}>Start Game</button>;
};

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = () => {
    gameService.signin(username, password).then(res => console.log(res));
  }

  const handler = () => {
    gameService.getAuthUser().then(res => console.log(res));
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
        <input type="password" onChange={event => {
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
    <Grommet full>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/new" element={<StartGame />} />
          <Route path="/player" element={<UserProvider user={{ username: 'steve' }}><Outlet /></UserProvider>} >
            <Route path="equip" element={<Equip />} />
          </Route>
          <Route path="/:id" element={<GameContainer />} />
        </Routes>
      </BrowserRouter>
    </Grommet>
  );
}

export default App;
