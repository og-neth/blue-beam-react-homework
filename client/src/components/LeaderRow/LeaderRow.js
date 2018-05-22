import React from 'react';

'use strict';

export default class LeaderRow extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <tr>
                <td>{this.props.name}</td>
                <td>{this.props.wins}</td>
                <td>{this.props.losses}</td>
                <td>{this.props.draws}</td>
            </tr>
        )
    }
}