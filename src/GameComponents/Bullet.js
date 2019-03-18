//Bullets used by players and enemies. Probably should have extended GamePiece and uses the update and render functions there.

import store from '../store.js'
import { provide } from 'js-redux';
import { calculateMove } from '../helper.js'

provide(store)

export default class Bullet {
    constructor(args) {
        this.position = args.position;
        this.speed = args.speed;
        this.radius = args.radius;
        this.delete = false;
        this.direction = args.direction;
        this.alive = true;
        this.color=args.color
        if(!this.color){
          this.color="yellow"
        }
    }

    die = (player) => {
      this.alive = false;
    }

    update() {
      let movement=calculateMove(this.direction, this.speed)
      this.position.x=this.position.x+movement.x
      this.position.y=this.position.y+movement.y
    }

    render() {
        const canvas=store.getState().canvas
        const context=canvas.context
        context.save();
        context.translate(this.position.x, this.position.y);
        context.fillStyle = this.color;
        context.lineWidth = 0.5;
        context.beginPath();
        context.arc(0, 0, 3, 0, 2 * Math.PI);
        context.closePath();
        context.fill();
        context.restore();
    }
}
