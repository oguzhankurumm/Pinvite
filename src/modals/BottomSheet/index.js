import React, { useEffect, useRef } from 'react';
import { View } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { useDispatch, useSelector } from 'react-redux';
import CommentModal from '../comment';
import { clearModal } from '../../redux/actions/modal';
import MenuModal from '../menu';

const Modal = () => {
    const dispatch = useDispatch();
    const modalState = useSelector(state => state.modalReducer);
    const bottomSheetRef = useRef(null);

    useEffect(() => {
        if (modalState.open && bottomSheetRef.current) {
            bottomSheetRef.current.expand();
        }
    }, [modalState])


    const onClose = () => {
        dispatch(clearModal())
    }

    const renderContent = () => {
        switch (modalState.modalType) {
            case 0:
                return <CommentModal post={modalState.data} />
            case 1:
                return <MenuModal />
            default:
                return <View></View>
        }
    }

    return (
        <BottomSheet
            keyboardBehavior="extend"
            android_keyboardInputMode="adjustPan"
            ref={bottomSheetRef}
            snapPoints={modalState.snapPoints || ['60%']}
            index={-1}
            handleHeight={40}
            onClose={onClose}
            enablePanDownToClose
        >
            {renderContent()}
        </BottomSheet>
    )
}

export default Modal