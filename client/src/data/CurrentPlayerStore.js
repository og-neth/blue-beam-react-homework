import Immutable from 'immutable';
import { ReduceStore } from 'flux/utils';
import Dispatcher from './Dispatcher';
import { ACTION_TYPES } from './models/ActionTypes';

class CurrentPlayerStore extends ReduceStore {
    constructor() {
        super(Dispatcher);
    }

    getInitialState() {
        return Immutable.Map({player: 1});
    }

    reduce(state, action) {
        switch (action.type) {
            case ACTION_TYPES.PLAYER_CHANGE: {
                return state.set('player', action.player);
            }
            case ACTION_TYPES.NEW_GAME: {
                console.log(action.type);
                return state.set('player', 1);
            }
            default:
                return state;
        }
    }
}

export default new CurrentPlayerStore();