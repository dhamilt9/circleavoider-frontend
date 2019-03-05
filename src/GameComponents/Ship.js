export default class Ship {
  constructor(args){
    this.position = args.position;
    this.speed = args.speed;
    this.radius = args.radius;
    this.turnspeed = args.turnspeed;
    this.delete = false;
    this.onDie = args.onDie;
    this.direction=args.direction;
  }

  convertToDegrees(input){
    if (input<0){
      return 360+input
    }else if(input>=360){
      return 360-input
    }else{
      return input
    }
  }

  turnTowards(joystickDirection){
    if (joystickDirection!==null){
      let currentDirection=this.direction
      switch(joystickDirection){
        case 0:
          if(currentDirection<200 && currentDirection>160){
            if (this.speed<0.3){
              currentDirection=0
            }
          }
          else if(currentDirection<20 || currentDirection>340){
            currentDirection=0
          }
          else if(currentDirection>180){
            currentDirection=currentDirection+this.turnspeed
          }else{
            currentDirection=currentDirection-this.turnspeed
          }
          break;
        case 45:
          console.log(currentDirection)
          if(currentDirection<245 && currentDirection>205){
            if (this.speed<0.3){
              currentDirection=45
            }
          }
          else if(currentDirection<55 && currentDirection>35){
            currentDirection=45
          }
          else if(currentDirection>225 || currentDirection<45){
            currentDirection=currentDirection+this.turnspeed
          }else{
            currentDirection=currentDirection-this.turnspeed
          }
          break;
        case 90:
          if(currentDirection<290 && currentDirection>250){
            if (this.speed<0.3){
              currentDirection=90
            }
          }
          else if(currentDirection<100 && currentDirection>80){
            currentDirection=90
          }
          else if(currentDirection>270 || currentDirection<90){
            currentDirection=currentDirection+this.turnspeed
          }else{
            currentDirection=currentDirection-this.turnspeed
          }
          break;
        case 135:
          if(currentDirection<335 && currentDirection>295){
            if (this.speed<0.3){
              currentDirection=135
            }
          }
          else if(currentDirection<145 && currentDirection>125){
            currentDirection=135
          }
          else if(currentDirection>135 && currentDirection<315){
            currentDirection=currentDirection-this.turnspeed
          }else{
            currentDirection=currentDirection+this.turnspeed
          }
          break;
        case 180:
          if(currentDirection<20 || currentDirection>340){
            if (this.speed<0.3){
              currentDirection=180
            }
          }
          else if(currentDirection<190 && currentDirection>170){
            currentDirection=180
          }
          else if(currentDirection<180){
            currentDirection=currentDirection+this.turnspeed
          }else{
            currentDirection=currentDirection-this.turnspeed
          }
          break;
        case 225:
          if(currentDirection<65 && currentDirection>25){
            if (this.speed<0.3){
              currentDirection=225
            }
          }
          else if(currentDirection<235 && currentDirection>215){
            currentDirection=225
          }
          else if(currentDirection<225 && currentDirection>45){
            currentDirection=currentDirection+this.turnspeed
          }else{
            currentDirection=currentDirection-this.turnspeed
          }
          break;
        case 270:
          if(currentDirection<110 && currentDirection>70){
            if (this.speed<0.3){
              currentDirection=270
            }
          }
          else if(currentDirection<280 && currentDirection>260){
            currentDirection=270
          }
          else if(currentDirection<270 && currentDirection>90){
            currentDirection=currentDirection+this.turnspeed
          }else{
            currentDirection=currentDirection-this.turnspeed
          }
          break;
        case 315:
          if(currentDirection<155 && currentDirection>115){
            if (this.speed<0.3){
              currentDirection=315
            }
          }
          else if(currentDirection<325 && currentDirection>305){
            currentDirection=315
          }
          else if(currentDirection<315 && currentDirection>135){
            currentDirection=currentDirection+this.turnspeed
          }else{
            currentDirection=currentDirection-this.turnspeed
          }
          break;

      }
      this.direction=currentDirection
    }
    if (this.direction>359){
      this.direction=360-this.direction
    }
    if(this.direction<0){
      this.direction=this.direction+360
    }
  }

  updateSpeed(joystickDirection){
    let currentDirection=this.direction
    if (joystickDirection!==null){
      if (joystickDirection===180){
        if (currentDirection<20 || currentDirection>340){
          this.speed-=.1
        }else{
          this.speed+=.1
        }
      }else if(joystickDirection===225){
        if(currentDirection>(45-20) && currentDirection<(45+20)){
          this.speed-=.1
        }else{
          this.speed+=.1
        }
      }else if(joystickDirection===270){
        if(currentDirection>(90-20) && currentDirection<(90+20)){
          this.speed-=.1
        }else{
          this.speed+=.1
        }
      }else if(joystickDirection===315){
        if(currentDirection>(135-20) && currentDirection<(135+20)){
          this.speed-=.1
        }else{
          this.speed+=.1
        }
      }else if(joystickDirection===0){
        if(currentDirection>(180-20) && currentDirection<(180+20)){
          this.speed-=.1
        }else{
          this.speed+=.1
        }
      }else if(joystickDirection===45){
        if(currentDirection>(225-20) && currentDirection<(225+20)){
          this.speed-=.1
        }else{
          this.speed+=.1
        }
      }else if(joystickDirection===90){
        if(currentDirection>(270-20) && currentDirection<(270+20)){
          this.speed-=.1
        }else{
          this.speed+=.1
        }
      }else if(joystickDirection===135){
        if(currentDirection>(315-20) && currentDirection<(315+20)){
          this.speed-=.1
        }else{
          this.speed+=.1
        }
      }
    }else{
      this.speed-=.1
    }
    if (this.speed>2){
      this.speed=2
    }
    if (this.speed<0){
      this.speed=0
    }
  }

  update(keys, joystickDirection) {
    this.turnTowards(joystickDirection)
    this.updateSpeed(joystickDirection)
    let movement=this.calculateMove(this.direction, this.speed)
    this.position.x=this.position.x+movement.x
    this.position.y=this.position.y+movement.y
  }

  calculateMove(direction, velocity){
    let rads=direction*Math.PI/180
    let x=Math.sin(rads)*velocity
    let y=Math.cos(rads)*velocity
    return {x: x, y: y}
  }

  render(state) {
    const context = state.context;
    context.save();
    if(this.position.x > state.screen.width) {
       this.position.x = 0;
    } else if(this.position.x < 0) {
       this.position.x = state.screen.width;
    }
    context.translate(this.position.x, this.position.y);
    context.strokeStyle = '#ffffff';
    context.fillStyle = '#ffffff';
    context.lineWidth = 2;
    context.moveTo(0,0);
    let movement=this.calculateMove(this.direction, this.speed)
    context.lineTo(movement.x*30, movement.y*30);
    context.stroke()
    context.beginPath();
    context.arc(0, 0, 20, 0, 2 * Math.PI);
    context.closePath();
    context.fill();
    context.stroke();
    context.restore();
  }
}
