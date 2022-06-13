import { CLEAR_MODAL, MODAL_OPEN_COMMENT_SECTION, MODAL_OPEN_MENU_SECTION } from "../constants/modal"

export const openCommentModal = (open, data) => dispatch => {
    return dispatch({
        data,
        open,
        modalType: 0,
        type: MODAL_OPEN_COMMENT_SECTION
    })
}

export const openMenuModal = (open, data) => dispatch => {
    return dispatch({
        data,
        open,
        modalType: 1,
        type: MODAL_OPEN_MENU_SECTION
    })
}

export const clearModal = () => dispatch => {
    return dispatch({
        type: CLEAR_MODAL
    })
}