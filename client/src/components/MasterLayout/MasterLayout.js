import React from 'react';
import Body from '../ContentBody/Body';
import Header from '../Header/Header';
import { GAME_STATUS, PLAYER_STATUS } from '../../data/models/GameStatus';
import { Modal, Button } from 'react-bootstrap';
import * as PlayerService from '../../services/playerService';

'use strict';

const STATUS_TITLES = {
    WINNER: 'WINNER, WINNER CHICKEN DINNER',
    DRAW: 'WELL, WELL'
}

export default class MasterLayoutB extends React.Component {
    constructor(props) {
        super(props);

        this.handleClose = this.handleClose.bind(this);
        this.newGame = this.newGame.bind(this);
        this.checkForWinner = this.checkForWinner.bind(this);

        this.state = {
            statusTitle: '',
            statusMessage: '',
            showModal: false,
        };
    }

    handleClose() {
        this.setState({ showModal: false });
    }

    /**
     * 
     * @param {string} name 
     * @param {string} status 
     */
    prepareModelToPost(name, status) {
        const data = {
            "username": '',
            "games": {
                "win": 0,
                "loss": 0,
                "draw": 0
            },
        };
        data.username = name;
        data.games.win = status === PLAYER_STATUS.WON ? 1 : 0;
        data.games.loss = status === PLAYER_STATUS.LOST ? 1 : 0;
        data.games.draw = status === PLAYER_STATUS.TIED ? 1 : 0;

        PlayerService.postScores(`${PlayerService.PLAYER_SERVICE_ENDPOINT}/players`, data);
    }

    /**
     * 
     * @param {string} winner 
     * @param {string} loser 
     */
    postWinnerLoser(winner, loser) {
        this.prepareModelToPost(winner, PLAYER_STATUS.WON);
        this.prepareModelToPost(loser, PLAYER_STATUS.LOST);
    }

    postDraw() {
        this.prepareModelToPost(this.props.gamePlayers.get('playerOneName'), PLAYER_STATUS.TIED);
        this.prepareModelToPost(this.props.gamePlayers.get('playerTwoName'), PLAYER_STATUS.TIED);
    }

    checkForWinner() {
        const minMoves = 5;
        let winner = false;
        let winningPlayer = '';
        let losingPlayer = '';

        if (this.props.moves.size >= minMoves) {
            const winners = this.props.combos;

            for (let key in winners) {
                if (winners.hasOwnProperty(key) && winners[key].length === 3) {
                    let arr = winners[key];
                    if (arr[0] === arr[1] && arr[0] === arr[2]) {
                        winner = true;
                        winningPlayer = this.props.currentPlayer.get('player') === 1 ? this.props.gamePlayers.get('playerOneName') : this.props.gamePlayers.get('playerTwoName');
                        losingPlayer = this.props.currentPlayer.get('player') === 1 ? this.props.gamePlayers.get('playerTwoName') : this.props.gamePlayers.get('playerOneName');
                        this.setState({ statusTitle: STATUS_TITLES.WINNER, statusMessage: `${winningPlayer} WINS!`, showModal: true });
                        this.props.onChangeGameStatus(GAME_STATUS.WINNER_DECLARED);
                        this.postWinnerLoser(winningPlayer, losingPlayer);
                    }
                }
            }

            if (!winner && this.props.moves.size === 9 && this.props.game.get('status') == GAME_STATUS.CURRENT_GAME) {
                this.setState({ statusTitle: STATUS_TITLES.DRAW, statusMessage: `SKAT GAME! DRAW!`, showModal: true });
                this.props.onChangeGameStatus(GAME_STATUS.SKAT_GAME);
            }
        }
    };

    newGame() {
        this.setState({ statusMessage: '', statusTitle: '', showModal: false });
    };

    render() {
        return (
            <div>
                <Header />
                <Body
                    checkForWinner={this.checkForWinner}
                    onNewGame={this.props.onNewGame}
                    gameStatus={this.props.game.get('status')}
                    onChangeGameStatus={this.props.onChangeGameStatus}
                    onPlayerMove={this.props.onPlayerMove}
                    onChangePlayer={this.props.onChangePlayer}
                    onNewPlayer={this.props.onNewPlayer}
                    playerOneName={this.props.gamePlayers.get('playerOneName')}
                    playerTwoName={this.props.gamePlayers.get('playerTwoName')}
                    currentPlayer={this.props.currentPlayer.get('player')} />

                <Modal backdrop="static" show={this.state.showModal} bsSize="small">
                    <Modal.Header>
                        <Modal.Title>{this.state.statusTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.state.statusMessage}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="primary" onClick={this.newGame}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    };
} 