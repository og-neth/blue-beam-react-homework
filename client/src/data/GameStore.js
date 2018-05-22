import Immutable from 'immutable';
import { ReduceStore } from 'flux/utils';
import Dispatcher from './Dispatcher';
import { ACTION_TYPES } from './models/ActionTypes';
import { GAME_STATUS } from './models/GameStatus';

class GameStore extends ReduceStore {
    constructor() {
        super(Dispatcher);
    }

    getInitialState() {
        return Immutable.Map().set('status', GAME_STATUS.NEW_GAME);
    }

    reduce(state, action) {
        switch(action.type) {
            case ACTION_TYPES.GAME_STATUS_CHANGE: {
                console.log(action.type);
                return state.set('status', action.status);
            }
            default: 
            return state;
        }
    }
}

export default new GameStore();