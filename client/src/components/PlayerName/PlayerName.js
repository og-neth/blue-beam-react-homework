import React from 'react';
import {GAME_STATUS} from '../../data/models/GameStatus';
import { FormControl } from 'react-bootstrap';

export default class PlayerName extends React.Component {
    constructor(props) {
        super(props);
        this.player = this.props.player;
    }

    handleChange(e) {
        this.props.onNewPlayer(e.target.value, this.player);
    }

    render() {
        return(
            <FormControl
                type="text"
                placeholder={`Enter Player ${this.player} Name`}
                onBlur={this.handleChange.bind(this)} />
        )
    }
}