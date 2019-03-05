import store from '../store.js'
import { provide } from 'js-redux';

provide(store)

export default class Cursor {
  constructor(args){
    this.position={x: 0, y: 0}
    this.radius=5
  }

  update = (mouseClick) => {
    this.position={x: mouseClick.x, y: mouseClick.y}
  }

  render(){
    const canvas=store.getState().canvas
    const context=canvas.context
    context.save();
    context.translate(this.position.x, this.position.y);
    context.strokeStyle = "white";
    context.fillStyle = "white";
    context.lineWidth = 2;
    context.beginPath();
    context.arc(0, 0, this.radius, 0, 2 * Math.PI);
    context.stroke();
    context.closePath();
    context.strokeStyle = "white";
    context.fillStyle = "white";
    context.beginPath();
    context.moveTo(-10, 0)
    context.lineTo(10,0)
    context.stroke()
    context.closePath();
    context.beginPath();
    context.moveTo(0, -10)
    context.lineTo(0, 10)
    context.stroke()
    context.closePath();
    context.restore();
  }
}
