import React from 'react';
import Tile from '../Tiles/Tile';
import LeaderRow from '../LeaderRow/LeaderRow';
import PlayerName from '../PlayerName/PlayerName';
import { GAME_STATUS } from '../../data/models/GameStatus';
import { Grid, Row, Col, Button, Modal, FormGroup, ButtonToolbar, Table } from 'react-bootstrap';
import * as PlayerService from '../../services/playerService';

'use strict';

export default class Body extends React.Component {

    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.newGame = this.newGame.bind(this);
        this.showLeaderBoard = this.showLeaderBoard.bind(this);

        this.state = {
            showModal: true,
            showLeaderBoard: false,
            leaders: []
        }
    }

    handleClose() {
        this.setState({ showModal: false, showLeaderBoard: false });
    }

    newGame() {
        this.setState({showModal: true});
        this.props.onChangeGameStatus(GAME_STATUS.NEW_GAME);
        this.props.onNewGame();
    }

    renderTile(id, combos) {
        return <Tile
                checkForWinner={this.props.checkForWinner}
                onChangeGameStatus={this.props.onChangeGameStatus}
                id={id}
                gameStatus={this.props.gameStatus}
                combos={combos}
                onPlayerMove={this.props.onPlayerMove}
                onChangePlayer={this.props.onChangePlayer}
                currentPlayer={this.props.currentPlayer} />
    }

    renderPlayerInput(id) {
        return <PlayerName onNewPlayer={this.props.onNewPlayer} gameStatus={this.props.gameStatus} player={id} />
    }

    showLeaderBoard() {
        this.getPlayers();
        this.setState({showLeaderBoard: true});
    }

    getPlayers() {
        PlayerService.getPlayers({'limit': 10}).then(data => this.setState({leaders: data}));
    }

    render() {
        return (
            <Grid>
                <Row className="show-grid board">
                    <Col xs={12} md={3} className={`player-1 text-center my-turn ${this.props.currentPlayer === 1}`}>
                        <p>{this.props.playerOneName}</p>
                    </Col>
                    <Col xs={12} md={6} className="text-center">
                        <div className={`list-group player-${this.props.currentPlayer }-turn`}>
                            {this.renderTile('a1', 'r1,c1,d1')}
                            {this.renderTile('a2', 'r1,c2')}
                            {this.renderTile('a3', 'r1,d2,c3')}

                            {this.renderTile('b1', 'r2,c1')}
                            {this.renderTile('b2', 'r2,c2,d1,d2')}
                            {this.renderTile('b3', 'r2,c3')}

                            {this.renderTile('c1', 'r3,d2,c1')}
                            {this.renderTile('c2', 'r3,c2')}
                            {this.renderTile('c3', 'r3,c3,d1')}
                        </div>

                        <ButtonToolbar>
                            <Button bsStyle="primary" bsSize="large" onClick={this.newGame} block>
                                New Game
                            </Button>
                            <Button bsStyle="info" bsSize="large" onClick={this.showLeaderBoard} block>
                                LeaderBoard
                            </Button>
                        </ButtonToolbar>
                    </Col>
                    <Col xs={12} md={3} className={`player-2 text-center my-turn ${this.props.currentPlayer === 2}`}>
                        <p>{this.props.playerTwoName}</p>
                    </Col>
                </Row>
                <Modal backdrop="static" show={this.state.showModal} bsSize="small">
                    <Modal.Header>
                        <Modal.Title>Let's get ready to Rumble!!!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>    
                        <FormGroup>
                            {this.renderPlayerInput(1)}
                            <br />
                            {this.renderPlayerInput(2)}
                        </FormGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="info" onClick={this.handleClose}>Fight</Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.state.showLeaderBoard} bsSize="large">
                    <Modal.Header>
                        <Modal.Title>CREAM OF THE CROP</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>   
                    <Table striped bordered condensed hover>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Wins</th>
                                <th>Losses</th>
                                <th>Draws</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.state.leaders.map(leader => 
                            <LeaderRow key={leader.id} 
                                name={leader.username} 
                                wins={leader.games.win} 
                                losses={leader.games.loss} 
                                draws={leader.games.draw} />
                        )}
                        </tbody>
                    </Table>

                        
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="info" onClick={this.handleClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </Grid>
        )
    };
} 