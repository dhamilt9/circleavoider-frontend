//Originally used for debugging
//This is where any text rendered by the canvas rather than react would go
//Displays the player's health, points, and level.

import store from '../store.js'
import { provide } from 'js-redux';

provide(store)

export default class Display {

  constructor(args){
    this.player=args.player
    this.position=args.position
  }

  getPoints = () => {
    return store.getState().gamestate.points
  }

  render() {
    const storeData=store.getState()
    const context=storeData.canvas.context
    const level=storeData.gamestate.level
    context.save();
    context.translate(this.position.x, this.position.y)
    context.font = "20px Courier"
    context.moveTo(0,0);
    context.fillStyle="White"
    // context.fillText(`Frame: ${state.frame}`, 20, 20)
    // context.fillText(`Speed: ${this.player.speed}`, 20, 40)
    // context.fillText(`Direction: ${this.player.direction}`, 20, 60)
    context.fillText(`Score: ${this.getPoints()}`, 20, 20)
    context.fillText(`Health: ${this.player.health}`, 20, 50)
    context.fillText(`Level: ${level}`, 20, 80)
    // context.fillText(`Joystick Direction: ${state.input.joystickDirection}`, 20, 120)
    // context.fillText(`Player X: ${this.player.position.x}`, 20, 140)
    // context.fillText(`Player Y: ${this.player.position.y}`, 20, 160)
    // context.fillText(`MouseClick clicked: ${state.input.mouseClick.clicked}`, 20, 180)
    // context.fillText(`MouseClick X: ${state.input.mouseClick.x}`, 20, 200)
    // context.fillText(`MouseClick Y: ${state.input.mouseClick.y}`, 20, 220)
    context.restore()
  }
}
