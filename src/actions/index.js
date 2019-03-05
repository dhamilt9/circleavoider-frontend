export const addPoints = amount => ({
  type: 'ADD_POINTS',
  amount
})

export const setGamestateId = gameStateId => ({
  type: 'SET_GAMESTATE_ID',
  gameStateId
})

export const setContext = context => ({
  type: 'SET_CONTEXT',
  context
})

export const scoreNotSaved = () => ({
  type: 'SCORE_NOT_SAVED'
})
export const scoreSaving = () => ({
  type: 'SCORE_SAVING'
})
export const scoreSaved = () => ({
  type: 'SCORE_SAVED'
})

export const setGameId = (data) => {
  return dispatch => {
    let hostName=window.location.hostname
    fetch(`http://${hostName}:3001/api/v1/games`, {
      method: "POST",
      headers: {
        "Authorization": localStorage.getItem("token"),
        'Content-Type': "application/json",
        'Accept': "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(r=>r.json())
    .then(response=>{
      dispatch({type: 'SET_GAME_ID', id: response.id})
    })
  }
}


export const register = (username, password) => {
  return dispatch => {
    let hostName=window.location.hostname
    fetch(`http://${hostName}:3001/api/v1/users`, {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
        'Accept': "application/json"
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
    .then(r=>r.json())
    .then((response) => {
        if (response.errors){
          console.log(response.errors)
        } else {
          localStorage.setItem("token", response.token)
          dispatch({type: 'SET_USER', user: response.user})
        }
      })
  }
}

export const login = (username, password) => {
  return dispatch => {
    let hostName=window.location.hostname
    fetch(`http://${hostName}:3001/api/v1/login`, {
      method: "POST",
			headers: {
				'Content-Type': "application/json",
				'Accept': "application/json"
			},
			body: JSON.stringify({username, password})
    })
    .then(res=>res.json())
    .then((response) => {
  		if (response.errors){
  			console.log(response.errors)
  		} else {
        localStorage.setItem("token", response.token)
  			dispatch({type: 'SET_USER', user: response.user})
  		}
  	})
  }
}


export const clearUser = () => ({
  type: 'CLEAR_USER'
})

export const tokenLogin = (token) => {
  return dispatch => {
    if(localStorage.token){
      let hostName=window.location.hostname
      fetch(`http://${hostName}:3001/api/v1/auth`, {
        headers: {
          "Authorization": token
        }
      })
      .then(res => res.json())
      .then((response) => {
        dispatch({type: 'SET_USER', user: response})
      })
    }
  }
}

export const incrementFrame = () => ({
  type: 'INCREMENT_FRAME'
})

export const incrementLevel = () => ({
  type: 'INCREMENT_LEVEL'
})

export const resetGame = () => ({
  type: 'RESET_GAME'
})
