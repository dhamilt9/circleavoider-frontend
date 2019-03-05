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
  die = (killed) => {
    store.getState().gamestate.music.playHit()
    if (!killed){
      console.log("Not fuck")
      this.health=this.health-1;
      if (this.health===0){
        this.alive=false
        store.dispatch({type: "INCREASE_POINTS", amount: 10})
      }else{
        this.radius=this.radius-5;
        this.speed=this.speed+1
      }
    }else{
      console.log("FUCK")
      this.alive=false
      this.radius=0
    }
  }
}
