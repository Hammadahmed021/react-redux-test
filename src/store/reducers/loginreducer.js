import logintypes from '../types/logintypes'

const STATE = {
    isLoggedIn: '',
    isLoggedOut: ''
}

export default (state = STATE, action) => {
    switch (action.type) {
        case logintypes.lOGINSUCESS:
            return ({ ...state, ...action.payload, isLoggedIn: true })
        case logintypes.lOGINERROR:
            return ({ ...state })
        default:
            return STATE
    }
}