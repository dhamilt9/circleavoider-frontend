import Enemy from './Enemy'

//Uses a sin function on a 32 tic cicle to modify the direction to wiggle the enemy as it approaches the player

export default class Curver extends Enemy{
  constructor(args){
    super(args)
    this.directionModifier=0
    this.color="blue"
  }
  update = () => {
    let myNumber=(this.cycle/32)
    this.directionModifier=(Math.sin(Math.PI*myNumber)*50)
    let movement=this.calculateMove(this.direction+this.directionModifier, this.speed)
    this.position.x=this.position.x+movement.x
    this.position.y=this.position.y+movement.y
    this.cycle+=1
  }
}
