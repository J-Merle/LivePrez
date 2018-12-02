const selectedReducer = (state = { slid: {} }, action) => {
    switch (action.type) {
        case 'UPDATE_SELECTED_SLID':
            const newState1 = { slid: action.obj };
            return newState1;
        case 'DRAGGED_ELT':
            return action.obj;
        default:
            return state;
    }
}
export default selectedReducer;