export default class MusicHandler{
  constructor(){
    this.music=new Audio('music_loop_1.mp3')
    this.shot=new Audio('shoot.wav')
    this.hit=new Audio('hit.wav')
    this.gameOver=new Audio('gameover.wav')
    this.pickup=new Audio('collect.wav')
    this.enemyshot=new Audio('shoot2.wav')


    this.music.addEventListener('timeupdate', function(){
                var buffer = .435
                if(this.currentTime > this.duration - buffer){
                    this.currentTime = 0
                    this.play()
                }}, false);
  }

  playMusic = () => {
    this.music.play()
  }

  stopMusic = () => {
    this.music.pause()
    this.music.currentTime = 0
  }

  playShot = () => {
    this.shot.play()
  }

  playHit = () => {
    this.hit.play()
  }

  playGameOver = () => {
    this.gameOver.play()
  }

  playPickup = () => {
    this.pickup.play()
  }

  playEnemyShot = () => {
    this.enemyshot.play()
  }
}
