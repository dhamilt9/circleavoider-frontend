import React, { Component } from 'react';

import { Button } from 'react-bootstrap'

export default class TitleScreen extends Component {
  state={instructions:false}

  render() {
    return (
      <div className="overlay-container">
        <div className="overlay-div">

          {!this.state.instructions && <div>
            <h1>Circle Avoider</h1>
            <p>Created By Dan Hamilton</p>
            <p>Featuring:</p>
            <p>Stunning 60fps gameplay</p>
            <p>5 unique enemies</p>
            <p>4 game changing powerups</p>
            <p>State of the art highscore system</p>
            <p>Original musical score by Dan Hamilton</p>
          </div>}
          {this.state.instructions && <div>
            <p>Avoid the circles (what did you expect?)</p>
            <p>W/A/S/D or ⇧/⇦/⇩/⇨ to move</p>
            <p>Click to shoot</p>
            <p>Powerups appear every 50 points</p>
          </div>}
          <Button className="mr-1" onClick={this.props.startGame}>
            Begin Game
          </Button>
          <Button onClick={() => {
              this.setState({instructions: !this.state.instructions})
            }}>
            {!this.state.instructions ? "Instructions" : "Back"}
          </Button>
        </div>
      </div>
    );
  }
}
