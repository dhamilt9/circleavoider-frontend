//Default enemy. Other enemies extend from this. Always points towards player and then updates position according to current speed

import GamePiece from './GamePiece'
import { calculateDirection } from '../helper'
import store from '../store.js'
import { provide } from 'js-redux';

provide(store)

export default class Enemy extends GamePiece{
  constructor(args){
    super(args)
    this.cycle=0
    this.color="red"
    this.radius=15
    this.speed=(1+3*Math.random()+store.getState().gamestate.level)/2
  }

  setDirection = (player) => {
    this.direction=calculateDirection(this.position, player.position)
  }

  update = () => {
    let movement=this.calculateMove(this.direction, this.speed)
    this.position.x=this.position.x+movement.x
    this.position.y=this.position.y+movement.y
  }
}
