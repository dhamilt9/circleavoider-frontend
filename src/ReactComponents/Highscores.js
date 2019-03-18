//Gets a list of global highscores for the game

import React, { Component } from 'react';
import Highscore from './Highscore'

class Highscores extends Component {
  state={games: []}

  componentDidMount() {
    let hostName=window.location.hostname
    fetch(`http://${hostName}:3001/api/v1/highscores`)
    .then(r=>r.json())
    .then(res=>{
      this.setState({games: res})
    })
  }
  render() {
    return (
      <div className="overlay-container">
        <div className="overlay-div">
          <h1>High Scores</h1>
          {this.state.games.map((game, index)=>{
            return <Highscore score={game.score} key={game.id} username={game.username} index={index+1}/>
          })}
        </div>
      </div>
    );
  }

}

export default Highscores;
