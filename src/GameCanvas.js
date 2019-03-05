import React, {Component} from 'react';
import TitleScreen from './ReactComponents/TitleScreen';
import GameOverScreen from './ReactComponents/GameOverScreen';
import Highscores from './ReactComponents/Highscores'
import MyHighscores from './ReactComponents/MyHighscores'
import Player from './GameComponents/Player.js'
import Enemy from './GameComponents/Enemy.js'
import Curver from './GameComponents/Curver.js'
import Stopper from './GameComponents/Stopper.js'
import Biggums from './GameComponents/Biggums.js'
import Display from './GameComponents/Display.js'
import PowerUp from './GameComponents/PowerUp.js'
import {  handleBulletCollision, handlePlayerEnemyCollision, getRandomInt, handlePowerUpCollision } from './helper'
import { connect } from 'react-redux'
import { setGamestateId, setContext, incrementFrame, incrementLevel, resetGame, setGameId, scoreNotSaved, scoreSaved, scoreSaving } from './actions'
import {Route, withRouter} from 'react-router-dom'

const GameState = {
   StartScreen : 0,
   Playing : 1,
   GameOver : 2
};

class GameCanvas extends Component {

  constructor(){
    super();
    this.player = null
    this.display = null
    this.enemies = []
    this.powerups = []
  }
  componentDidMount() {
    this.props.input.bindKeys();
    const context = this.refs.canvas.getContext('2d');
    this.props.setContext(context)
    requestAnimationFrame(() => {this.update()});
  }
  componentWillUnmount() {
    this.props.input.unbindKeys();
  }

  saveScore = () => {
    let hostName=window.location.hostname
    let data = {score: this.props.points}
    if (this.props.user.id){
      data['user_id']=this.props.user.id
    }
    this.props.scoreSaving()
    fetch(`http://${hostName}:3001/api/v1/games/${this.props.game_id}`, {
      method: "PATCH",
      headers: {
        "Authorization": localStorage.getItem("token"),
        'Content-Type': "application/json",
        'Accept': "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(r=>r.json())
    .then(response=>{
      this.props.scoreSaved()
      console.log(response)
    })
  }

  startGame = () => {
    this.props.music.playMusic()

    let player = new Player({
      position: {
        x: this.props.canvas.width/2,
        y: this.props.canvas.height/2
      }
    });
    this.player=player;
    let display = new Display({
      position: {
        x: 0,
        y: 0
      },
      player: player
    })
    this.display=display
    let data={}
    if (this.props.user.id){
      data={user_id: this.props.user.id}
    }
    this.props.setGameId(data)
    this.props.scoreNotSaved()
    this.props.setGamestateId(GameState.Playing)
  }

  clearBackground = () => {
    const context = this.props.canvas.context;
    context.save();
    if (this.player){
      if (this.player.hitmarker){
        context.fillStyle="red"
        context.strokeStyle="red"
      }
    }
    context.scale(this.props.canvas.ratio, this.props.canvas.ratio);
    context.fillRect(0, 0, this.props.canvas.width, this.props.canvas.height);
    context.globalAlpha = 1;
    context.restore();
  }

  removeDeadEnemies = () => {
    this.enemies=this.enemies.filter((enemy) => {
      if (enemy.alive){
        return true
      }else{
        return false
      }
    })
  }


  spawnPowerUp = () => {
    let powerupX = this.props.canvas.width*Math.random()
    let powerupY = this.props.canvas.height*Math.random()
    let powerupPosition = {x: powerupX, y: powerupY}
    this.powerups.push(new PowerUp({position: powerupPosition}))
  }

  spawnEnemy = () => {
    let enemyX = this.props.canvas.width*Math.random()
    let enemyY = this.props.canvas.height*Math.random()
    let enemySpeed = (1+3*Math.random()+this.props.level)/2

    switch(getRandomInt(4)){
      case 0:
        enemyX=this.props.canvas.width
        break
      case 1:
        enemyX=0
        break
      case 2:
        enemyY=this.props.canvas.height
        break
      case 3:
        enemyY=0
        break
      default:
        break
    }
    let enemyPosition={x: enemyX, y: enemyY}
    let myRandomInt=getRandomInt(4)
    switch(myRandomInt){
      case 0:
        let newEnemy=new Enemy({
          position: enemyPosition
        })
        this.enemies.push(newEnemy)
        break
      case 1:
        this.enemies.push(new Curver({
          position: enemyPosition,
          speed: (1+3*Math.random()+this.props.level)/2,
          radius: 15,
          turnspeed: 5,
          health: 5,
          direction: enemySpeed,
          alive: true
        }))
        break
      case 2:
        this.enemies.push(new Stopper({
          position: enemyPosition,
          speed: (1+3*Math.random()+this.props.level)/2,
          radius: 15,
          turnspeed: 5,
          health: 5,
          direction: enemySpeed,
          alive: true
        }))
        break
      case 3:
        this.enemies.push(new Biggums({
          position: enemyPosition,
          speed: (1+3*Math.random()+this.props.level)/2,
          radius: 15,
          turnspeed: 5,
          health: 5,
          direction: enemySpeed,
          alive: true
        }))
        break
      default:
        break
    }
  }

  checkDeath = () => {
    if (this.player.health<=0){
      this.player.hitmarker=false
      this.props.setGamestateId(2)
      this.props.music.stopMusic()
      this.props.music.playGameOver()
    }
  }

  reset = () => {
    this.player=null
    this.enemies=[]
    this.powerups=[]
    this.display=null
    this.props.resetGame()
    this.clearBackground()
  }

  update = (currentDelta) => {
    const keys = this.props.input.pressedKeys;
    const joystick = this.props.input.joystickDirection;
    const mouseClick = this.props.input.mouseClick
    if (this.props.gameState === GameState.Playing) {
      this.checkDeath()
      this.clearBackground();
      if (this.player !== undefined && this.player !== null) {
        if (this.props.frame%100===0 && (this.enemies.length<3+this.props.level)){
          this.spawnEnemy()
        }
        if (this.props.points%50===0 & this.props.points!==0 & this.powerups.length<this.props.points/50){
          this.spawnPowerUp()
        }
        if (this.props.frame%500===0 & this.props.frame!==0){
          this.props.incrementLevel()
        }
        this.player.update(keys, joystick, mouseClick);
        this.player.render();
        this.enemies.forEach((enemy)=>{
          enemy.setDirection(this.player)
          enemy.update()
          enemy.render()
        })
        this.powerups.forEach((powerup)=>{
          if (!powerup.collected){
            powerup.render()
          }
        })
        handlePowerUpCollision(this.player, this.powerups)
        handlePlayerEnemyCollision(this.player, this.enemies)
        handleBulletCollision(this.player, this.enemies, this.increasePoints)
        this.removeDeadEnemies()
      }
      if (this.display !== undefined && this.display !== null){
        this.display.render()
      }
      this.props.incrementFrame()
    }
    requestAnimationFrame(() => {this.update()})
  }
  render(){
    return(
      <div>
        { this.props.gameState === GameState.StartScreen && <Route exact path="/" render={() => (<TitleScreen startGame={this.startGame}/>)} />}
        { this.props.gameState === GameState.GameOver && <Route exact path="/" render={() => (<GameOverScreen reset={this.reset} saveScore={this.saveScore}/>)} />}
        <Route exact path="/highscores" render={() => <Highscores />}></Route>
        {!(Object.entries(this.props.user).length === 0 && this.props.user.constructor === Object) && <Route exact path="/myhighscores" render={() => <MyHighscores />}></Route>}
        <canvas
          ref="canvas"
          width={ this.props.canvas.width * this.props.canvas.ratio }
          height={ this.props.canvas.height * this.props.canvas.ratio }
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
    gameState: state.gamestate.gamestateId,
    canvas: state.canvas,
    frame: state.gamestate.frame,
    points: state.gamestate.points,
    level: state.gamestate.level,
    input: state.gamestate.input,
    music: state.gamestate.music,
    game_id: state.gamestate.gameid,
    user: state.user.user
})

const mapDispatchToProps = dispatch => ({
  setGamestateId: gameStateId => dispatch(setGamestateId(gameStateId)),
  setContext: context => dispatch(setContext(context)),
  incrementFrame: () => dispatch(incrementFrame()),
  incrementLevel: () => dispatch(incrementLevel()),
  resetGame: () => dispatch(resetGame()),
  setGameId: id => dispatch(setGameId(id)),
  scoreNotSaved: () => dispatch(scoreNotSaved()),
  scoreSaving: () => dispatch(scoreSaving()),
  scoreSaved: () => dispatch(scoreSaved())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GameCanvas))