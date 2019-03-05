import React, { Component } from 'react';
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'

class GameOverScreen extends Component {
  render() {
    return (
      <div className="overlay-container">
        <div className="overlay-div">
          <h1>GAME OVER</h1>
          <Button className="mr-1" onClick={this.props.reset}>
            Reset
          </Button>
          <Button disabled={this.props.saved===0 ? false : true} onClick={this.props.saveScore}>
            {this.props.saved===0 && "Save highscore"}
            {this.props.saved===1 && "Saving highscore"}
            {this.props.saved===2 && "Highscore saved"}
          </Button>
        </div>
      </div>
    );
  }
}


const mapDispatchToProps = dispatch => ({
})

const mapStateToProps = state => ({
    saved: state.gamestate.saved,
})

export default connect(mapStateToProps, mapDispatchToProps)(GameOverScreen)
