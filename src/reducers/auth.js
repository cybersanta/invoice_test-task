import { load } from 'redux-localstorage-simple'

let AUTH = load({ namespace: 'invoice_test-task'})

if(!AUTH || !AUTH.auth) {
  AUTH.auth = {
    user: null
  }
}

export default (state = AUTH.auth, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return {
        ...state,
        user: action.payload
      }
    case 'LOGOUT':
      return {
        ...state,
        user: null
      }
    default:
      return state
  }
}