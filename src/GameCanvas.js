//Runs the main game loop, controlls the canvas, and renders the elements that appear on top of the canvas 

import React, {Component} from 'react';
import TitleScreen from './ReactComponents/TitleScreen';
import GameOverScreen from './ReactComponents/GameOverScreen';
import Highscores from './ReactComponents/Highscores'
import MyHighscores from './ReactComponents/MyHighscores'
import Message from './ReactComponents/Message'
import Player from './GameComponents/Player.js'
import Cursor from './GameComponents/Cursor.js'
import Enemy from './GameComponents/Enemy.js'
import Curver from './GameComponents/Curver.js'
import Stopper from './GameComponents/Stopper.js'
import Sploder from './GameComponents/Sploder.js'
import Biggums from './GameComponents/Biggums.js'
import Display from './GameComponents/Display.js'
import PowerUp from './GameComponents/PowerUp.js'
import {  handleBulletCollision, handlePlayerEnemyCollision, getRandomInt, handlePowerUpCollision, handleEnemyBulletCollision } from './helper'
import { connect } from 'react-redux'
import { setGamestateId, setContext, incrementFrame, incrementLevel, resetGame, setGameId, scoreNotSaved, scoreSaved, scoreSaving } from './actions'
import {Route, withRouter} from 'react-router-dom'

const GameState = {
   StartScreen : 0,
   Playing : 1,
   GameOver : 2
};

class GameCanvas extends Component {
	state={
		cursorStyle: {cursor:'default'}
	}
	
	//Initiate instance variables used in the game
  constructor(){
    super();
    this.player = null
    this.display = null
    this.enemies = []
    this.enemyBullets = []
    this.powerups = []
    this.cursor = new Cursor()
  }
	
	//Set up keyboard input event listeners, save canvas context to store
  componentDidMount() {
    this.props.input.bindKeys();
    const context = this.refs.canvas.getContext('2d');
    this.props.setContext(context)
    requestAnimationFrame(() => {this.update()});
  }
	
  componentWillUnmount() {
    this.props.input.unbindKeys();
  }

	//Action when user desides to save their score. Sends game details to backend
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

	//Starts the music, sets up game variables, changes gamestate in store
  startGame = () => {
    this.props.music.playMusic()
    this.setState({cursorStyle: {cursor:'none'}})

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

	//Wipes the canvas. To be run every frame before render
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
	
	
	//Iterates through the list of enemies that gets rendered and removes dead enemies
  removeDeadEnemies = () => {
    this.enemies=this.enemies.filter((enemy) => {
      if (enemy.alive){
        return true
      }else{
        return false
      }
    })
  }

	//Spawns a powerup in a random location on the canvas
  spawnPowerUp = () => {
    let powerupX = this.props.canvas.width*Math.random()
    let powerupY = this.props.canvas.height*Math.random()
    let powerupPosition = {x: powerupX, y: powerupY}
    this.powerups.push(new PowerUp({position: powerupPosition}))
  }
	
	//Returns a spawn position for the enemy along one of the edges of the canvas
  calcuateEnemySpawnPosition = () => {
    let enemyX = this.props.canvas.width*Math.random()
    let enemyY = this.props.canvas.height*Math.random()

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
    return enemyPosition
  }
	
	//Creates an enemy of a random type, gives it a random speed that scales with current level.
	//There are surely more elegant ways than a switch statement to do this
  spawnEnemy = () => {
    let enemySpeed = (1+3*Math.random()+this.props.level)/2
    let enemyPosition=this.calcuateEnemySpawnPosition()
    let myRandomInt=getRandomInt(5)
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
      case 4:
        this.enemies.push(new Sploder({
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
	
	//Run every frame. Checks to see if the player is dead based on current health
  checkDeath = () => {
    if (this.player.health<=0){
      this.setState({cursorStyle: {cursor:'default'}})
      this.player.hitmarker=false
      this.props.setGamestateId(2)
      this.props.music.stopMusic()
      this.props.music.playGameOver()
    }
  }
	
	//Resets all game variables to starting state to prepare for a new game
  reset = () => {
    this.player=null
    this.enemies=[]
    this.powerups=[]
		this.enemyBullets = []
    this.display=null
    this.props.resetGame()
    this.clearBackground()
		this.props.input.resetKeys()
  }
	
	//Main game loop. Preforms all logic and rendering required for one frame of the game, then calls itself to move onto the next frame
  update = (currentDelta) => {
		
		//Get the state of the inputs for the frame
    const keys = this.props.input.pressedKeys;
    const joystick = this.props.input.joystickDirection;
    const mouseClick = this.props.input.mouseClick
		
		//Player can change the gamestate to Playing by clicking the "begin game" button.
    if (this.props.gameState === GameState.Playing) {
      this.checkDeath()
      this.clearBackground();
      if (this.player !== undefined && this.player !== null) {
				
				//Spawn an enemy every 100 frames and the max number of enemies allowed has not been reached.
				//The max number of enemies allowed starts at 3 and increases every level
        if (this.props.frame%100===0 && (this.enemies.length<3+this.props.level)){
          this.spawnEnemy()
        }
				
				//Spawn a powerup every 50 points, but don't spawn multiple!
        if (this.props.points%50===0 & this.props.points!==0 & this.powerups.length<this.props.points/50){
          this.spawnPowerUp()
        }
				
				//Increase the level every 500 frames
        if (this.props.frame%500===0 & this.props.frame!==0){
          this.props.incrementLevel()
        }
				
				//.update methods calculate new positions for players, enemies, bullets, and the cursor. .render methods place them on the canvas according to their updated paramaters
        this.player.update(keys, joystick, mouseClick);
        this.player.render();
        this.cursor.update(mouseClick)
        this.enemies.forEach((enemy)=>{
          enemy.setDirection(this.player)
          let enemybullet=enemy.update(this.player)
          if (enemybullet!==undefined){
            this.enemyBullets.push(enemybullet)
          }
          enemy.render()
        })
        this.powerups.forEach((powerup)=>{
          if (!powerup.collected){
            powerup.render()
          }
        })
        this.enemyBullets=this.enemyBullets.filter((bullet)=>{
          return bullet.alive===true
        })
        this.enemyBullets.forEach((bullet)=>{
          bullet.update()
          bullet.render()
        })
				
				//Check all relevant collisions
        handleEnemyBulletCollision(this.enemyBullets, this.player)
        handlePowerUpCollision(this.player, this.powerups)
        handlePlayerEnemyCollision(this.player, this.enemies)
				
				//Spawn bullets for exploding enemies
        let explosion=handleBulletCollision(this.player, this.enemies, this.increasePoints)
        if (explosion){
          if (explosion.length>0){
            explosion.forEach((bullet)=>{
              this.enemyBullets.push(bullet)
            })
          }
        }
				
        this.removeDeadEnemies()
        this.cursor.render()
      }
      if (this.display !== undefined && this.display !== null){
        this.display.render()
      }
			
			//Increases the frame counter in the store every frame
      this.props.incrementFrame()
    }
		
		//Stops animations if the current window or tab is not visible, otherwise call this function
    requestAnimationFrame(() => {this.update()})
  }
  render(){
    return(
      <div>
        { this.props.gameState === GameState.StartScreen && <Route exact path="/" render={() => (<TitleScreen startGame={this.startGame}/>)} /> }
        { this.props.gameState === GameState.GameOver && <Route exact path="/" render={() => (<GameOverScreen reset={this.reset} saveScore={this.saveScore}/>)} />}
        <Message />
        <Route exact path="/highscores" render={() => <Highscores />}></Route>
        {!(Object.entries(this.props.user).length === 0 && this.props.user.constructor === Object) && <Route exact path="/myhighscores" render={() => <MyHighscores />}></Route>}
        <canvas
          ref="canvas"
          style={this.state.cursorStyle}
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
