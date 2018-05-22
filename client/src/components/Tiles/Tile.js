import React from 'react';
import { GAME_STATUS } from '../../data/models/GameStatus';

export default class Tile extends React.Component {
    constructor(props) {
        super(props);
        this.currentMoveToMake = '';
        this.handleClick = this.handleClick.bind(this);
        this.lastPlayer = this.props.currentPlayer;
        this.state = {
            move: '',
            selected: false,
        };
    }

    handleClick(e) {

        if (this.currentMoveToMake === '' && this.props.gameStatus !== GAME_STATUS.WINNER_DECLARED && this.props.gameStatus !== GAME_STATUS.SKAT_GAME) {
            this.currentMoveToMake = this.props.currentPlayer === 1 ? 'X' : 'O';
            const playerMove = {
                move: this.currentMoveToMake,
                block: e.target.id,
                player: this.lastPlayer,
                combos: e.target.dataset.combos
            };
            this.props.onChangeGameStatus(GAME_STATUS.CURRENT_GAME);
            this.props.onPlayerMove(playerMove);
            this.props.onChangePlayer(this.currentMoveToMake === 'X' ? 2 : 1);

            this.setState({ move: this.currentMoveToMake, selected: true });
            this.props.checkForWinner();
        }
    }

    render() {
        const isNew = this.props.gameStatus === GAME_STATUS.NEW_GAME;

        if (isNew) {
            this.currentMoveToMake = ''
        }
        return (
            <div className={`list-group-item ${this.currentMoveToMake}`}>
                <div id={this.props.id}
                    data-move={this.state.move}
                    data-combos={this.props.combos}
                    data-selected={isNew ? false : this.state.selected}
                    className="list-group-item-text"
                    onClick={this.handleClick}>
                    {this.currentMoveToMake}
                </div>
            </div>
        )
    };
} 