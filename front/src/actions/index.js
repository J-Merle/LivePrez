export const setSelectedSlid = (slid_obj) => {
    return {
        type: 'UPDATE_SELECTED_SLID',
        obj: slid_obj
    };
}

export const updateContentMap = (content_map) => {
    return {
        type: 'UPDATE_CONTENT_MAP',
        obj: content_map
    };
}

export const updatePresentation = (pres_obj) => {
    return {
        type: 'UPDATE_PRESENTATION',
        obj: pres_obj
    };
}

export const updateSlid = (slid_obj) => {
    return {
        type: 'UPDATE_PRESENTATION_SLIDS',
        obj: slid_obj
    };
}

export const updateDraggedElt = (dragged_elt) => {
    return {
        type: 'DRAGGED_ELT',
        obj: dragged_elt
    }
}

export const addContent = (content_obj) => {
    return {
        type: 'ADD_CONTENT',
        obj: content_obj
    }
}