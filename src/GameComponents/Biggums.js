//Big purple enemy. Only enemy that takes more than one shot to kill.
//"Gets angrier" (shrinks and speeds up) every time it loses a health until dead.

import Enemy from './Enemy'
import store from '../store.js'

export default class Biggums extends Enemy{
  constructor(args){
    super(args)
    this.health=3
    this.color="purple"
    this.radius=args.radius+10
    this.speed=args.speed-1
  }

  stun = () => {
    this.oldSpeed=this.speed
    this.speed=0
    setTimeout(()=>{
      this.speed=this.oldSpeed
    }, 500)
  }

  die = (killed) => {
    store.getState().gamestate.music.playHit()
    if (!killed){
      this.health=this.health-1;
      if (this.health===0){
        this.alive=false
        store.dispatch({type: "INCREASE_POINTS", amount: 10})
      }else{
        this.radius=this.radius-5;
        this.speed=this.speed+1
        this.stun()
      }
    }else{
      this.alive=false
      this.radius=0
    }
  }
}
