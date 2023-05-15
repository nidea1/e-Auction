import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detail } from '../../actions/userActions';
import { userUpdateProfileReset } from '../../reducers/userReducers';
import { useNavigate } from 'react-router-dom';
import ProfileDetails from './ProfileDetails';
import UpdateProfileModal from './UpdateProfileModal';
import DeleteProfileModal from './DeleteProfileModal';

function ProfileCard() {
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const updateModalClose = () => setShowUpdateModal(false);
    const updateModalShow = () => setShowUpdateModal(true);

    const deleteModalShow = () => {
        updateModalClose()
        setShowDeleteModal(true)
    };
    const deleteModalClose = () => {
        updateModalShow()
        setShowDeleteModal(false)
    };

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        userReducers: { user, userInfo, userUpdateProfileSuccess }
    } = useSelector((state) => state)

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        } else {
            if (!user || !user.name || userUpdateProfileSuccess) {
                dispatch(userUpdateProfileReset());
                dispatch(detail('profile'));
            }
        }
    }, [dispatch, navigate, userInfo, user, userUpdateProfileSuccess]);

    return (
        <>
            { user && <ProfileDetails user={user} updateModalShow={() => setShowUpdateModal(true)} /> }
            { user && <UpdateProfileModal show={showUpdateModal} onHide={() => setShowUpdateModal(false)} user={user} deleteModalShow={deleteModalShow} /> }               
            
            <DeleteProfileModal show={showDeleteModal} onHide={deleteModalClose}/>
        </>
    );
}

export default ProfileCard;
