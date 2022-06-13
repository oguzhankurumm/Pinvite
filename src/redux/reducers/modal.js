import { CLEAR_MODAL, MODAL_OPEN_COMMENT_SECTION, MODAL_OPEN_MENU_SECTION } from "../constants/modal";

const initialState = {
    open: false,
    data: null,
    modalType: -1,
    snapPoints: ['60%']
}

const modal = (state = initialState, action) => {
    switch (action.type) {
        case MODAL_OPEN_COMMENT_SECTION:
            return {
                ...state,
                open: action.open,
                data: action.data,
                modalType: action.modalType,
                snapPoints: ['60%']
            }
        case MODAL_OPEN_MENU_SECTION:
            return {
                ...state,
                open: action.open,
                data: action.data,
                modalType: action.modalType,
                snapPoints: ['25%']
            }
        case CLEAR_MODAL:
            return initialState;
        default:
            return state;
    }
}

export default modal;