import Enemy from './Enemy'

export default class Stopper extends Enemy{
  constructor(args){
    super(args)
    this.color="orange"
  }

  update = () => {
    if (this.cycle<40){
      let movement=this.calculateMove(this.direction, this.speed)
      this.position.x=this.position.x+movement.x
      this.position.y=this.position.y+movement.y
    }
    this.cycle+=1
    if (this.cycle>60){
      this.cycle=0
    }
  }
}
