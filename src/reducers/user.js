//Reducer for the user currently logged in.

const user = (state = {user: {}}, action) =>
{
  switch(action.type){
    case 'SET_USER':
      return {user: action.user}
    case 'CLEAR_USER':
      return {user: {}}
    default:
      return state;
  }
}

export default user
