//A message that can be flashed on top of the canvas.  Used when a powerup is picked up. Can be toggled and set by redux.

import React, { Component } from 'react';
import { connect } from 'react-redux'
import { toggleMessage } from '../actions'



class Message extends Component {
  state={flash: true}

  flashText = () => {
    this.intervalId=setInterval(()=>{
      this.setState({flash: !this.state.flash})
    }, 100)
  }

  componentDidMount(){
    this.flashText()
  }

  componentWillUnmount(){
    clearInterval(this.intervalId)
  }

  render() {
    return (
      <div className="message-container">
        <div className="message-div">
          <p className="message">{this.props.message_display && this.state.flash && this.props.message}</p>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
    message: state.message.message,
    message_display: state.message.display,
})

const mapDispatchToProps = dispatch => ({
  toggleMessage: () => dispatch(toggleMessage())
})

export default connect(mapStateToProps, mapDispatchToProps)(Message)
