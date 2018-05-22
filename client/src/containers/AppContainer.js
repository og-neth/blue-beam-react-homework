import AppView from '../views/AppView';
import {Container} from 'flux/utils';
import MovesStore from '../data/MovesStore';
import CurrentPlayerStore from '../data/CurrentPlayerStore';
import GamePlayersStore from '../data/GamePlayersStore';
import GameStore from '../data/GameStore';
import CombosStore from '../data/CombosStore';
import * as Actions from '../data/Actions';

function getStores() {
    return [
        MovesStore,
        CurrentPlayerStore,
        GamePlayersStore,
        GameStore,
        CombosStore
    ];
}

function getState() {
    return {
        moves: MovesStore.getState(),
        currentPlayer: CurrentPlayerStore.getState(),
        gamePlayers: GamePlayersStore.getState(),
        game: GameStore.getState(),
        combos: CombosStore.getState(),

        onNewGame: Actions.newGame,
        onPlayerMove: Actions.playerMove,
        onNewPlayer: Actions.newPlayer,
        onChangePlayer: Actions.changePlayer,
        onChangeGameStatus: Actions.changeGameStatus
    };
}

export default Container.createFunctional(AppView, getStores, getState);
