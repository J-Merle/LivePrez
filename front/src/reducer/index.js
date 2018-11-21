import { combineReducers } from 'redux';
import selectedReducer from './selectedReducer';
import updateModelReducer from './updateModelReducer';

/*const store = createStore(selectedReducer);

export default store;*/

const globalReducer = combineReducers({
    selectedReducer: selectedReducer,
    updateModelReducer: updateModelReducer
});

export default globalReducer;