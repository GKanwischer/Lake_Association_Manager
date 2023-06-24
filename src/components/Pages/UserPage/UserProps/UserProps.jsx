import React from 'react';
import Modal from 'react-modal';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import UserPropItem from './UserPropItem/UserPropItem';
import AddPropModal from '../../AddPropModal/AddPropModal';

Modal.setAppElement('#react-root');

export default function UserProps(){
    const dispatch = useDispatch();
    const userProps = useSelector((store) => store.props.user);
    const [modalOpen, setModalOpen] = useState(false);

    console.log('user proposals: ', userProps);
  
    useEffect(() => {
      dispatch({ type: 'FETCH_USER_PROPS' });
    }, []);

    return(
        <div className="user-props">
        <h3>Your Proposals</h3>
        <button onClick={() => setModalOpen(true)}>Add Proposal</button>
        <AddPropModal isOpen={modalOpen} onClose={() => setModalOpen(false)}/>
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Date created</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {userProps.map(prop => <UserPropItem key={prop.id} prop={prop} />)}
          </tbody>
        </table>
      </div>
    )
}