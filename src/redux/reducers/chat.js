import {
    CHATS_SET,
    RESET_CHATS
} from "../constants/chat";

const initialState = {
    list: [],
    loaded: false
}

const chat = (state = initialState, action) => {
    switch (action.type) {
        case CHATS_SET:
            return {
                ...state,
                loaded: true,
                list: action.data
            }
        case RESET_CHATS:
            return {
                ...state,
                loaded: true,
                list: []
            }
        default:
            return state;
    }
};

export default chat;