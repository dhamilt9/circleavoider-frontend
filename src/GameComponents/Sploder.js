import Enemy from './Enemy'
import Bullet from './Bullet'
import {calculateDirection} from '../helper.js'
import store from '../store.js'
import { provide } from 'js-redux';

provide(store)

export default class Stopper extends Enemy{

  constructor(args){
    super(args)
    this.color="white"
    this.radius=10
    this.speed=args.speed/2
    if (this.speed<.2){
      this.speed=1
    }
  }

  die = (killed) => {
    this.alive=false
    store.getState().gamestate.music.playHit()
    if (!killed){
      store.dispatch({type: "INCREASE_POINTS", amount: 10})
      let bullets=[]
      bullets.push(new Bullet({
        position: { x: this.position.x, y : this.position.y - 5 },
        speed: 3,
        radius: 4,
        direction : 0,
        color:"red"
      }))
      bullets.push(new Bullet({
        position: { x: this.position.x, y : this.position.y - 5 },
        speed: 3,
        radius: 4,
        direction : 45,
        color:"red"
      }))
      bullets.push(new Bullet({
        position: { x: this.position.x, y : this.position.y - 5 },
        speed: 3,
        radius: 4,
        direction : 90,
        color:"red"
      }))
      bullets.push(new Bullet({
        position: { x: this.position.x, y : this.position.y - 5 },
        speed: 3,
        radius: 4,
        direction : 135,
        color:"red"
      }))
      bullets.push(new Bullet({
        position: { x: this.position.x, y : this.position.y - 5 },
        speed: 3,
        radius: 4,
        direction : 180,
        color:"red"
      }))
      bullets.push(new Bullet({
        position: { x: this.position.x, y : this.position.y - 5 },
        speed: 3,
        radius: 4,
        direction : 225,
        color:"red"
      }))
      bullets.push(new Bullet({
        position: { x: this.position.x, y : this.position.y - 5 },
        speed: 3,
        radius: 4,
        direction : 270,
        color:"red"
      }))
      bullets.push(new Bullet({
        position: { x: this.position.x, y : this.position.y - 5 },
        speed: 3,
        radius: 4,
        direction : 315,
        color:"red"
      }))
      return bullets
    }
  }

  update = () => {
    let movement=this.calculateMove(this.direction, this.speed)
    this.position.x=this.position.x+movement.x
    this.position.y=this.position.y+movement.y
    if (this.cycle<8){
      this.color="red"
    }else{
      this.color="white"
    }
    this.cycle+=1
    if (this.cycle>16){
      this.cycle=0
    }
  }
}
