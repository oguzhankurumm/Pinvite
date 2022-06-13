import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setChats } from "../redux/actions/chat";
import { chatsListener } from "./chat";

export const useChats = () => {
    const dispatch = useDispatch();
    const { currentUser } = useSelector(state => state.authReducer);

    const handleChatsChange = useCallback(
        (change) => {
            if(change) dispatch(setChats(change.docs.map(item => ({ _id: item.id, ...item.data() }))));
        },
        [dispatch],
    )

    useEffect(() => {
        let listenerInstance;
        if (currentUser !== null) {
            listenerInstance = chatsListener(handleChatsChange, currentUser._id);
        }

        return () => {
            listenerInstance && listenerInstance();
        }
    }, [currentUser])
}