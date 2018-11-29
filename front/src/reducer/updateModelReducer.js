var Tools = require('../services/Tools.js');

const updateModelReducer = (state = { presentation: {}, content_map: {} }, action) => {
    switch (action.type) {
        case 'UPDATE_PRESENTATION':
            return state;
        case 'UPDATE_PRESENTATION_SLIDS':
            const newSlid = { presentation: action.obj };
            return newSlid;
        case 'UPDATE_CONTENT_MAP':
            return state;
        case 'ADD_CONTENT':
            return;
        default:
            return state;
    }
}
export default updateModelReducer;
