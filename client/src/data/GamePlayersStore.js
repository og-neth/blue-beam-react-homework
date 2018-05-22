import Immutable from 'immutable';
import { ReduceStore } from 'flux/utils';
import Dispatcher from './Dispatcher';
import { ACTION_TYPES } from './models/ActionTypes';
import Player from './models/Player';

class GamePlayersStore extends ReduceStore {
    constructor() {
        super(Dispatcher);
    }

    getInitialState() {
        return Immutable.Map();
    }

    reduce(state, action) {
        switch(action.type) {
            case ACTION_TYPES.NEW_PLAYER: {
                console.log(action.type);
                let key = action.player === 1 ? 'playerOneName' : 'playerTwoName';
                return state.set(key, action.name);
            }
            case ACTION_TYPES.NEW_GAME: {
                console.log(action.type);
                return state.clear();
            }
            default: 
            return state;
        }
    }
}

export default new GamePlayersStore();