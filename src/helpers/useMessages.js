import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createChat, createGroupChat, messagesListener } from "./chat";

export const useMessages = (chatId, contactId) => {
    const { currentUser } = useSelector(state => state.authReducer);
    const chats = useSelector(state => state.chatReducer.list);
    const [messages, setMessages] = useState([]);
    const [chatIdInst, setChatIdInst] = useState(chatId);

    const handleMessagesChange = useCallback(
        (change) => {
            if (change) setMessages(change.docs.map(item => ({ _id: item.id, ...item.data() })));
        },
        [],
    )

    useEffect(() => {
        let listenerInstance;
        if (!chatIdInst) {
            let chat = chats.find(item => !item.isGroup && item.members.some(member => member === contactId));
            if (!chat) {
                if (Array.isArray(contactId)) {
                    const members = contactId.map(item => item._id);
                    createGroupChat(members, currentUser._id)
                        .then((res) => {
                            setChatIdInst(res.id)
                        })
                } else {
                    createChat(contactId, currentUser._id)
                        .then((res) => {
                            setChatIdInst(res.id);
                        })
                }
            } else {
                setChatIdInst(chat._id);
            }
        }
        if (currentUser !== null && chatIdInst) {
            listenerInstance = messagesListener(handleMessagesChange, chatIdInst);
        }

        return () => {
            listenerInstance && listenerInstance();
        }
    }, [handleMessagesChange, currentUser, chatIdInst])

    return { messages, chatIdInst }
}