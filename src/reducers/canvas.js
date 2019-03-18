//Reducer for information about the canvas the game is being played on. Need to access context any time the canvas is altered.

const canvas = (state = {height: 600, width: 1200, ratio: 1, context: null}, action) =>
{
  switch(action.type){
    case 'SET_CONTEXT':
      return {...state, context: action.context}
    default:
      return state;
  }
}

export default canvas
