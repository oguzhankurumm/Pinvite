import { CHATS_SET } from "../constants/chat"

export const setChats = data => dispatch => {
    dispatch({ data, type: CHATS_SET })
}