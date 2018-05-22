import Immutable from 'immutable';
import { ReduceStore } from 'flux/utils';
import Dispatcher from './Dispatcher';
import { ACTION_TYPES } from './models/ActionTypes';

class CombosStore extends ReduceStore {
    constructor() {
        super(Dispatcher);
    }

    getInitialState() {
        // winning combonitations
        /*
            //rows
            ['a1','a2','a3'],
            ['b1','b2','b3'],
            ['c1','c2','c3'],
            //diagnols
            ['a1','b2','c3'],
            ['a3','b2','c1'],
            //columns
            ['a1','b1','c1'],
            ['a2','b2','c2'],
            ['a3','b3','c3'],
        */

        return {
            r1: [],
            r2: [],
            r3: [],
            d1: [],
            d2: [],
            c1: [],
            c2: [],
            c3: []
        }

    }

    reduce(state, action) {
        switch (action.type) {
            case ACTION_TYPES.PLAYER_MOVE: {
                console.log(action.type);
                const comboArray = action.playersMove.combos.split(',');
                for (let i = 0; i < comboArray.length; i++) {
                    state[comboArray[i]].push(action.playersMove.move);
                }
                console.log('combos: ', state);
                return state;
            }
            case ACTION_TYPES.NEW_GAME: {
                console.log(action.type);
                for(let key in state) {
                    if(state.hasOwnProperty(key)) {
                        state[key] = [];
                    }
                }
                console.log('combos state: ', state);
                return state;
            }
            default:
                return state;
        }
    }
}

export default new CombosStore();