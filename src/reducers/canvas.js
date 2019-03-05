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
