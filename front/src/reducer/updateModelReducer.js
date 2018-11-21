var Tools = require('../services/Tools.js');

const updateModelReducer = (state = { presentation: {}, content_map: {} }, action) => {
    console.log(action);
    switch (action.type) {
        case 'UPDATE_PRESENTATION':
            return state.presentation;
        case 'UPDATE_PRESENTATION_SLIDS':
            return state.presentation.slidArray;
        case 'UPDATE_CONTENT_MAP':
            return state.content_map;
        case 'ADD_CONTENT':
            return;
        default:
            return state;
    }
}
export default updateModelReducer;