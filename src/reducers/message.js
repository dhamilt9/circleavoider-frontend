//Reducer for controlling the message on the Message react element

const canvas = (state = {message: "", display: false}, action) =>
{
  switch(action.type){
    case 'SET_MESSAGE':
      return {...state, message: action.message}
    case 'TOGGLE_MESSAGE':
      return {...state, display: !state.display}
    default:
      return state;
  }
}

export default canvas
