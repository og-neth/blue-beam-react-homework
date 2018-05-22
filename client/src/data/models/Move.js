import Immutable from 'immutable';

const Move = Immutable.Record({
    block: '',
    move: '',
    player: '',
    combos: ''
});

export default Move;