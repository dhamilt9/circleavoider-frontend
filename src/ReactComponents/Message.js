import React, { Component } from 'react';
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'

class Message extends Component {
  render() {
    return (
      <div>
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
