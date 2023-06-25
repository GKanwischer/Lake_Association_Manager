import Modal from 'react-modal';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

export default function AddPropModal({isOpen, onClose}){
    const dispatch = useDispatch();
    const [descriptInput, setDescriptInput] = useState('');

    function submitProposal(){
        dispatch({ type: 'ADD_PROP', payload: {description: descriptInput }})
        onClose();
    }

    return(
        <Modal
        isOpen={isOpen}
        shouldCloseOnOverlayClick={true}
        onRequestClose={onClose}
        style={{
            overlay: {
                backdropFilter: 'blur(10px)',
                backgroundColor: 'rgba(255, 255, 255, .5)',
            },
            content: {
                height: '70%',
                width: '70%',
                margin: 'auto',
                backgroundColor: 'whitesmoke',
                color: 'black',
                borderRadius: '20px'
            }
        }}
    >
        <div className="modal-header">
            <h2>Add a Proposal</h2>
        </div>
        <div className="modal-body">
            <textarea 
            placeholder='Proposal Description'
            value={descriptInput}
            rows={4}
            cols={40}
            onChange={e => setDescriptInput(e.target.value)}/>
            <button onClick={submitProposal}>Submit</button>

        </div>
    </Modal>
    )
}