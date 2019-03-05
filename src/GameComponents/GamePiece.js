import store from '../store.js'
import { provide } from 'js-redux';

provide(store)

export default class GamePiece {
  constructor(args){
    this.position = args.position;
    this.speed = args.speed;
    this.radius = args.radius;
    this.turnspeed = args.turnspeed;
    this.delete = false;
    this.direction=args.direction;
    this.color=args.color;
    this.alive=true;
    this.health=args.health;
  }


  die = (killed) => {
    this.alive=false
    store.getState().gamestate.music.playHit()
    if (!killed){
      store.dispatch({type: "INCREASE_POINTS", amount: 10})
    }
  }

  update = () => {
    let movement=this.calculateMove(this.direction, this.speed)
    this.position.x=this.position.x+movement.x
    this.position.y=this.position.y+movement.y
  }

  calculateMove = (direction, velocity) => {
    let rads=direction*Math.PI/180
    let x=Math.sin(rads)*velocity
    let y=Math.cos(rads)*velocity
    return {x: x, y: y}
  }

  render(){
    const canvas=store.getState().canvas
    const context=canvas.context
    context.save();
    if(this.position.x+this.radius > canvas.width) {
       this.position.x = canvas.width-this.radius;
    } else if(this.position.x-this.radius < 0) {
       this.position.x = this.radius;
    }
    if(this.position.y+this.radius > canvas.height) {
       this.position.y = canvas.height-this.radius;
    } else if(this.position.y-this.radius < 0) {
       this.position.y = this.radius;
    }
    context.translate(this.position.x, this.position.y);
    context.strokeStyle = this.color;
    context.fillStyle = this.color;
    context.lineWidth = 2;
    context.beginPath();
    context.arc(0, 0, this.radius, 0, 2 * Math.PI);
    context.fill();
    context.stroke();
    context.closePath();
    context.restore();
    context.save()
    context.strokeStyle = this.color;
    context.fillStyle = this.color;
    context.translate(this.position.x, this.position.y);
    let movement=this.calculateMove(this.direction, this.radius)
    context.beginPath()
    context.arc(movement.x, movement.y, 5, 0, 2 * Math.PI);
    context.stroke()
    context.fill();
    context.closePath()
    context.restore()
  }
}
