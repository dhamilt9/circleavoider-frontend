//Helper functions, mostly math stuff (collision detection, vector math, etc), useful in many places of the app.

import store from './store.js'
import { provide } from 'js-redux';

provide(store)

export const convertToDegrees = (input) => {
  if (input<0){
    return 360+input
  }else if(input>=360){
    return 360-input
  }else{
    return input
  }
}

export const calculateMove = (direction, velocity) => {
  let rads=direction*Math.PI/180
  let x=Math.sin(rads)*velocity
  let y=Math.cos(rads)*velocity
  return {x: x, y: y}
}

export const calculateDirection = (point1, point2) => {
  let dX=point1.x-point2.x
  let dY=point1.y-point2.y
  let returnValue = (convertToDegrees((Math.atan2(dX, dY) * 180 / Math.PI)+180))
  return returnValue
}

export const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
}

export const handlePlayerEnemyCollision = (player, enemies) => {
  enemies.forEach((enemy) => {
    if(checkCollision(player, enemy)){
      enemy.die(true)
      player.takeDamage(1)
    }
  })
}

export const handleBulletCollision = (player, enemies, increasePoints) => {
  let bulletArray=[]
  enemies.forEach((enemy) => {
    player.bullets.forEach((bullet) => {
      if (checkCollision(enemy, bullet)){
        bulletArray=(enemy.die(false))
        bullet.die()
      }
    })
  })
  return bulletArray
}

export const handleEnemyBulletCollision = (bullets, player) => {
  bullets.forEach((bullet)=>{
    if (checkCollision(bullet, player)){
      player.takeDamage(1)
      bullet.die()
      store.getState().gamestate.music.playHit()
    }
  })
}

export const handleEnemyAvoidance = (enemy, enemies) => {
  enemies.forEach((enemy2)=>{
    if(checkCloseness(enemy, enemy2, 25)){
      enemy.avoid(enemy2)
      enemy2.avoid(enemy)
    }else{
      enemy.decreaseDirectionModifier()
      enemy2.decreaseDirectionModifier()
    }
  });
}

const checkCloseness = (item1, item2, distance) => {
  let dX=item1.position.x-item2.position.x
  let dY=item1.position.y-item2.position.y
  let hyp=Math.sqrt(dX*dX + dY*dY)
  if (hyp-distance<item1.radius+item2.radius){
    return true
  }else{
    return false
  }
}

export const calculateDistance = (item1, item2) => {
  let dX=item1.position.x-item2.position.x
  let dY=item1.position.y-item2.position.y
  let hyp=Math.sqrt(dX*dX + dY*dY)
  return hyp-item1.radius-item2.radius
}

export const handlePowerUpCollision = (player, powerups) => {
  powerups.forEach((powerup) => {
    if (!powerup.collected){
      if (checkCollision(powerup, player)){
        powerup.collected=true
        player.collectPowerup(powerup.type)
      }
    }
  })
}

export const checkCollision = (item1, item2) => {
  let dX=item1.position.x-item2.position.x
  let dY=item1.position.y-item2.position.y
  let hyp=Math.sqrt(dX*dX + dY*dY)
  if (hyp<item1.radius+item2.radius){
    return true
  }else{
    return false
  }
}
