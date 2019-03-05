import InputManager from '../InputManager';
import MusicHandler from '../GameComponents/MusicHandler'

const initialState={gameid: null, saved: 0, points: 0, gamestateId: 0, frame: 0, level: 1, input: new InputManager(), music: new MusicHandler()}

const gamestate = (state = initialState, action) =>
{
  switch(action.type){
    case 'INCREASE_POINTS':
      return {...state, points: state.points + action.amount}
    case 'INCREMENT_FRAME':
      return {...state, frame: state.frame+1}
    case 'INCREMENT_LEVEL':
      return {...state, level: state.level+1}
    case 'SET_GAMESTATE_ID':
      return {...state, gamestateId: action.gameStateId}
    case 'RESET_GAME':
      return initialState
    case 'SET_GAME_ID':
      return {...state, gameid: action.id}
    case 'SCORE_NOT_SAVED':
      return {...state, saved: 0}
    case 'SCORE_SAVING':
      return {...state, saved: 1}
    case 'SCORE_SAVED':
      return {...state, saved: 2}
    default:
      return state;
  }
}

export default gamestate
