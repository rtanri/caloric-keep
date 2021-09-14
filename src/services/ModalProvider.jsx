import React, { useState } from 'react'

export const ModalContext = React.createContext()


const ModalProvider = (props) => {
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');

    const handleOk = () => {
      setModalText('The modal will be closed after two seconds');
      setConfirmLoading(true);
      setTimeout(() => {
        setVisible(false);
        setConfirmLoading(false);
      }, 2000);
    };

    const handleCancel = () => {
      console.log('Clicked cancel button');
      setVisible(false)
    };
  
    const showModal = () => {
      setVisible(true);
    };

      return (
            <ModalContext.Provider value={{ handleCancel, handleOk, showModal, visible, modalText, confirmLoading }}>
              {props.children}
            </ModalContext.Provider>

      )
}

export default ModalProvider;

