import GamePiece from './GamePiece'
import Bullet from './Bullet'
import { calculateDirection } from '../helper.js'
import store from '../store.js'
import { provide } from 'js-redux';

provide(store)

export default class Player extends GamePiece{
  constructor(args){
    super(args)
    this.score=0
    this.bullets=[];
    this.lastShot=0;
    this.lasthit=0;
    this.shotspeed=700
    this.hitmarker=false;
    this.color="green";
    this.radius=20;
    this.direction=180;
    this.speed=0;
    this.turnspeed=10;
    this.health=3;
    this.acceleration=.3;
    this.maxSpeed=3;
    this.deacceleration=.4;
  }

  collectPowerup = (type) => {
    store.getState().gamestate.music.playPickup()
    switch(type){
      case 0:
        this.maxSpeed+=1.5
        store.dispatch({type: "SET_MESSAGE", message: "+SPEED"})
        store.dispatch({type: "TOGGLE_MESSAGE"})
        setTimeout(() => {
          store.dispatch({type: "TOGGLE_MESSAGE"})
        }, 2000)
        break;
      case 1:
        this.health+=1
        store.dispatch({type: "SET_MESSAGE", message: "+HEALTH"})
        store.dispatch({type: "TOGGLE_MESSAGE"})
        setTimeout(() => {
          store.dispatch({type: "TOGGLE_MESSAGE"})
        }, 2000)
        break;
      case 2:
        store.dispatch({type: "INCREASE_POINTS", amount: 50})
        store.dispatch({type: "SET_MESSAGE", message: "+POINTS"})
        store.dispatch({type: "TOGGLE_MESSAGE"})
        setTimeout(() => {
          store.dispatch({type: "TOGGLE_MESSAGE"})
        }, 2000)
        break;
      case 3:
        store.dispatch({type: "SET_MESSAGE", message: "+SHOTSPEED"})
        store.dispatch({type: "TOGGLE_MESSAGE"})
        setTimeout(() => {
          store.dispatch({type: "TOGGLE_MESSAGE"})
        }, 2000)
        this.shotspeed-=100
        if (this.shotspeed<200){
          this.shotspeed=200
        }
        break;
      default:
        break
    }
  }

  takeDamage = (damage) => {
    this.health=this.health-damage
    this.hitmarker=true
    this.lasthit=Date.now()
  }

  turnTowards = (joystickDirection) =>{
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
        default:
          break;

      }
      this.direction=currentDirection
    }
    if (this.direction>359){
      this.direction=360-this.direction
    }else if(this.direction<0){
      this.direction=this.direction+360
    }
  }

  updateSpeed = (joystickDirection) => {
    let currentDirection=this.direction
    if (joystickDirection!==null){
      if (joystickDirection===180){
        if (currentDirection<20 || currentDirection>340){
          this.speed-=this.deacceleration
        }else{
          this.speed+=this.acceleration
        }
      }else if(joystickDirection===225){
        if(currentDirection>(45-20) && currentDirection<(45+20)){
          this.speed-=this.deacceleration
        }else{
          this.speed+=this.acceleration
        }
      }else if(joystickDirection===270){
        if(currentDirection>(90-20) && currentDirection<(90+20)){
          this.speed-=this.deacceleration
        }else{
          this.speed+=this.acceleration
        }
      }else if(joystickDirection===315){
        if(currentDirection>(135-20) && currentDirection<(135+20)){
          this.speed-=this.deacceleration
        }else{
          this.speed+=this.acceleration
        }
      }else if(joystickDirection===0){
        if(currentDirection>(180-20) && currentDirection<(180+20)){
          this.speed-=this.deacceleration
        }else{
          this.speed+=this.acceleration
        }
      }else if(joystickDirection===45){
        if(currentDirection>(225-20) && currentDirection<(225+20)){
          this.speed-=this.deacceleration
        }else{
          this.speed+=this.acceleration
        }
      }else if(joystickDirection===90){
        if(currentDirection>(270-20) && currentDirection<(270+20)){
          this.speed-=this.deacceleration
        }else{
          this.speed+=this.acceleration
        }
      }else if(joystickDirection===135){
        if(currentDirection>(315-20) && currentDirection<(315+20)){
          this.speed-=this.deacceleration
        }else{
          this.speed+=this.acceleration
        }
      }
    }else{
      this.speed-=this.deacceleration
    }
    if (this.speed>this.maxSpeed){
      this.speed=this.maxSpeed
    }
    if (this.speed<0){
      this.speed=0
    }
  }

  renderBullets() {
    this.bullets=this.bullets.filter((bullet) => {
      return bullet.alive===true
    })
    this.bullets.forEach((bullet)=>{
      bullet.update();
      bullet.render();
    })
  }
  update = (keys, joystickDirection, mouseClick) => {
    this.turnTowards(joystickDirection)
    this.updateSpeed(joystickDirection)
    if (Date.now() - this.lasthit > 100){
      this.hitmarker=false;
    }
    let movement=this.calculateMove(this.direction, this.speed)
    this.position.x=this.position.x+movement.x
    this.position.y=this.position.y+movement.y
    const mouseCoords={x: mouseClick.x, y: mouseClick.y}
    if (mouseClick.clicked && Date.now() - this.lastShot > this.shotspeed) {
      const bullet = new Bullet({
        position: { x: this.position.x, y : this.position.y - 5 },
        speed: 6,
        radius: 4,
        direction : calculateDirection(this.position, mouseCoords)
      });
      this.bullets.push(bullet);
      store.getState().gamestate.music.playShot()
      this.lastShot = Date.now();
    }
  }

  render(){
    super.render()
    this.renderBullets()
  }
}
