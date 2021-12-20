import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk'
import loginreducer from './reducers/loginreducer'

const store = createStore(
    loginreducer,
    {},
    applyMiddleware(thunk)
)

export default store