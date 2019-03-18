//A list of the currently logged in user's high scores

import React, { Component } from 'react';
import Highscore from './Highscore'
import { connect } from 'react-redux'

class MyHighscores extends Component {
  state={games: []}

  componentDidMount() {
    let hostName=window.location.hostname
    let token = localStorage.getItem("token")
    if(token){
      fetch(`http://${hostName}:3001/api/v1/auth`, {
        headers: {
          "Authorization": token
        }
      })
      .then(r=>r.json())
      .then(data=>this.setState({games: data.games}))
    }
  }
  render() {
    return (
      <div className="overlay-container">
        <div className="overlay-div">
          <h1>Personal Scores</h1>
          {this.state.games.sort((a,b) => {return b.score-a.score}).slice(0,5).map((game, index)=>{
            return <Highscore key={game.id} score={game.score} username={game.username} index={index+1}/>
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.user
})

export default connect(mapStateToProps)(MyHighscores);
