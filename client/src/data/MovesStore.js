import Immutable from 'immutable';
import { ReduceStore } from 'flux/utils';
import Dispatcher from './Dispatcher';
import { GAME_STATUS } from './models/GameStatus';
import { ACTION_TYPES } from './models/ActionTypes';
import Move from './models/Move';

class MovesStore extends ReduceStore {

    constructor() {
        super(Dispatcher);
    }

    getInitialState() {
        return Immutable.List([]);
    }

    reduce(state, action) {
        switch (action.type) {
            case ACTION_TYPES.PLAYER_MOVE: {
                console.log(action.type);
                console.log('moves store:', [...state.values()].map(move => move));

                return state.push({
                    block: action.playersMove.block,
                    move: action.playersMove.move,
                    player: action.playersMove.player,
                    combos: action.playersMove.combos
                });
            }
            case ACTION_TYPES.NEW_GAME: {
                console.log(action.type);
                return state.clear();
            }
            default: {
                return state;
            }
        }
    }
}

export default new MovesStore();