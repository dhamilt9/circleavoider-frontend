import Enemy from './Enemy'
import Bullet from './Bullet'
import {calculateDirection} from '../helper.js'
import store from '../store.js'
import { provide } from 'js-redux';

provide(store)

export default class Stopper extends Enemy{
  constructor(args){
    super(args)
    this.color="orange"
  }

  update = (player) => {
    if (this.cycle<40){
      let movement=this.calculateMove(this.direction, this.speed)
      this.position.x=this.position.x+movement.x
      this.position.y=this.position.y+movement.y
    }
    if (this.cycle===60){
      // console.log(player.position)
      const bullet = new Bullet({
        position: { x: this.position.x, y : this.position.y - 5 },
        speed: 3,
        radius: 4,
        direction : calculateDirection(this.position, player.position)
      });
      this.cycle+=1
      store.getState().gamestate.music.playEnemyShot()
      return bullet
    }
    this.cycle+=1
    if (this.cycle>80){
      this.cycle=0
    }
  }
}
