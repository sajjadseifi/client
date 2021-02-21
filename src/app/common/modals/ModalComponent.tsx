import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Modal } from 'semantic-ui-react';
import { RootStoreContext } from '../../stores/rootStore';

const ModalComponent =()=>{
    const rootStore = useContext(RootStoreContext);
    const {Close,modal:{open,body}} = rootStore.modalStore;
    console.log({open,body});
    return(
        <Modal open={open} onClose={Close} >
            <Modal.Content>{body}</Modal.Content>
        </Modal>
    )
};

export default  observer(ModalComponent);