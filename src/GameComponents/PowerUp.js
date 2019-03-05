import store from '../store.js'
import { provide } from 'js-redux';
import { getRandomInt } from '../helper'

provide(store)

export default class PowerUp{
  constructor(args){
    this.position=args.position
    this.radius=15
    this.collected=false
    this.type=getRandomInt(4)
    switch(this.type){
      case 0:
        this.color="red"
        break;
      case 1:
        this.color="orange"
        break;
      case 2:
        this.color="yellow"
        break;
      case 3:
        this.color="green"
        break;
      default:
        break;
    }
  }
  render = () => {
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
    context.stroke();
    context.closePath();
    context.beginPath();
    context.arc(0, 0, this.radius-5, 0, 2 * Math.PI);
    context.stroke();
    context.closePath();
    context.beginPath();
    context.arc(0, 0, this.radius-10, 0, 2 * Math.PI);
    context.stroke();
    context.closePath();
    context.restore();
  }
}
