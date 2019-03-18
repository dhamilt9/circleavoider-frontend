//Listens to keyboard input/mouse and changes instance variable to refelect which keys are pressed, used by other parts of the app whenever they need user input
//Specifically, stores the state of the arrow keys, W/A/S/D, Space, Enter, Mouse Position, and Mouse Click.
//Also a justickDirection angle, which is a virtual 8-position joystick that's input is determied by the user directional input.
//Instance is kept in the store so it can be referenced anywhere
//Should move this to GameComponents.

const KEY = {
   LEFT:  37,
   RIGHT: 39,
   A: 65,
   D: 68,
   W: 87,
   S: 83,
   SPACE: 32,
   ENTER: 13,
   UP: 38,
   DOWN: 40,
};

export default class InputManager{
  constructor() {
    this.pressedKeys = { left: 0, right: 0, space: 0, enter: 0, up: 0, down: 0 };
    this.joystickDirection = null
    this.mouseClick = { clicked: false, x: 0, y: 0 }
  }
  resetKeys() {
    this.pressedKeys = { left: 0, right: 0, space: 0, enter: 0, up: 0, down: 0 };
    this.joystickDirection = null
    this.mouseClick = { clicked: false, x: 0, y: 0 }
  }
  
  bindKeys() {
    window.addEventListener('keyup',   this.handleKeys.bind(this, false));
    window.addEventListener('keydown', this.handleKeys.bind(this, true));
    document.getElementsByTagName('canvas')[0].addEventListener('mousedown', this.handleMouse.bind(this, true))
    document.getElementsByTagName('canvas')[0].addEventListener('mouseup', this.handleMouse.bind(this, false))
    document.getElementsByTagName('canvas')[0].addEventListener('mousemove', this.handleMouseMove)
  }
  unbindKeys() {
    window.removeEventListener('keyup', this.handleKeys);
    window.removeEventListener('keydown', this.handleKeys);
  }

  handleMouse(value, e){
    let mouse=this.mouseClick
    let coords=this.relMouseCoords(e)
    if (value){
      this.mouseClick = { clicked: true, x: coords.x, y: coords.y}
    }else{
      this.mouseClick = { ...mouse, clicked: false }
    }
  }

  handleMouseMove = (e) => {
    let coords=this.relMouseCoords(e)
    this.mouseClick = { ...this.mouseClick, x: coords.x, y: coords.y}
  }

  relMouseCoords = (event) => {
    let totalOffsetX = 0;
    let totalOffsetY = 0;
    let canvasX = 0;
    let canvasY = 0;
    let currentElement = event.target;

    do{
        totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
        totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
    }
    while(currentElement === currentElement.offsetParent)

    canvasX = event.pageX - totalOffsetX;
    canvasY = event.pageY - totalOffsetY;
    return {x:canvasX, y:canvasY}
  }

  handleKeys(value, e){
    let keys = this.pressedKeys;
    switch (e.keyCode) {
      case KEY.LEFT:
      case KEY.A:
        keys.left  = value;
        break;
      case KEY.RIGHT:
      case KEY.D:
        keys.right  = value;
        break;
      case KEY.SPACE:
        keys.space  = value;
        break;
      case KEY.ENTER:
        keys.enter = value;
        break;
      case KEY.W:
      case KEY.UP:
        keys.up = value;
        break;
      case KEY.S:
      case KEY.DOWN:
        keys.down = value;
        break;
      default:
        break;
    }
    let joystick = this.joystickDirection;
    if (keys.up){
      if (keys.right){
        joystick=135
      }else if(keys.left){
        joystick=225
      }else{
        joystick=180
      }
    }
    else if (keys.right){
      if(keys.down){
        joystick=45
      }else{
        joystick=90
      }
    }
    else if (keys.down){
      if(keys.left){
        joystick=315
      }else{
        joystick=0
      }
    }
    else if (keys.left){
      joystick=270
    }
    else{
      joystick=null
    }
    this.joystickDirection=joystick
  }
}
