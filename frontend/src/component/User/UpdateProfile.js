import React, { useState, useEffect, Fragment } from 'react'
import './UpdateProfile.css';
import { useNavigate } from 'react-router-dom';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import FaceIcon from '@material-ui/icons/Face';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import {  clearErrors, updateProfile } from '../../actions/userAction';
import { UPDATE_PROFILE_RESET } from '../../constants/userConstant';

const UpdateProfile = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const history = useNavigate()

    const { user } = useSelector((state) => state.user)
    const { error, isUpdated } = useSelector((state) => state.profile);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const updateProfileSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("email", email)
        dispatch(updateProfile(myForm));
    }


    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success("Profile Updated Successfully");

            history("/account");

            dispatch({
                type: UPDATE_PROFILE_RESET,
            })
        }

    }, [dispatch, error, alert, history, user, isUpdated])

    return (
        <Fragment>
            <div className='updateProfilecontainer'>
                <div className='updateProfilebox'>
                    <h2>Update Profile</h2>
                    <form className='updateProfileForm' onSubmit={updateProfileSubmit}>
                        <div className='updateProfileName'>
                            <FaceIcon />
                            <input
                                type="text"
                                placeholder='Name'
                                required
                                value={name}
                                name="name"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className='updateProfileEmail'>
                            <MailOutlineIcon />
                            <input
                                type="email"
                                placeholder='Email'
                                required
                                value={email}
                                name="email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <input type="submit" value="Update Profile" className='updateProfileBtn' />

                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default UpdateProfile