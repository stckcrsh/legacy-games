import { InventoryDto, RacerActionDto } from '@vector-racer/lib';

class GameService {
  signin(username: string, password: string) {
    return fetch('api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
  }
  createGame() {
    return fetch('api/game-runtime', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  getAuthUser() {
    return fetch('api/auth', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  getGame(id: string) {
    return fetch(`api/game-runtime/${id}`).then((res) => res.json());
  }

  move(id: string, move: RacerActionDto) {
    return fetch(`api/game-runtime/${id}/move`, {
      method: 'POST',
      body: JSON.stringify({
        ...move,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());
  }
  getInventory(): Promise<InventoryDto> {
    return fetch('api/player/inventory', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());
  }
}

// create instance of gameService
const gameService = new GameService();

export default gameService;
