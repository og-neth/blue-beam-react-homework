import Dispatcher from './Dispatcher';
import {ACTION_TYPES} from './models/ActionTypes';


export function playerMove(playersMove){
    Dispatcher.dispatch({
        type: ACTION_TYPES.PLAYER_MOVE,
        playersMove
    });
}

export function changeGameStatus(status) {
    Dispatcher.dispatch({
        type: ACTION_TYPES.GAME_STATUS_CHANGE,
        status,
    })
}

export function newPlayer(name, player) {
    Dispatcher.dispatch({
        type: ACTION_TYPES.NEW_PLAYER,
        name,
        player
    });
}

export function changePlayer(player) {
    Dispatcher.dispatch({
        type: ACTION_TYPES.PLAYER_CHANGE,
        player
    });
}

export function newGame(){
    Dispatcher.dispatch({
        type: ACTION_TYPES.NEW_GAME
    });
}

export function getLeaders() {
    Dispatcher.dispatch({
        type: ACTION_TYPES.GET_LEADERS
    })
}
