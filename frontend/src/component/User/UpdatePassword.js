import React, { useState, useEffect, Fragment } from 'react'
import './UpdatePassword.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { clearErrors, updatePassword } from '../../actions/userAction';
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstant';
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from '@material-ui/icons/Lock'
import VpnKeyIcon from '@material-ui/icons/VpnKey'

const UpdatePassword = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const history = useNavigate()

    const { error, isUpdated } = useSelector((state) => state.profile);

    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const updatePasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("oldPassword", oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);

        dispatch(updatePassword(myForm));
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success("Profile Updated Successfully");
            history("/account");

            dispatch({
                type: UPDATE_PASSWORD_RESET,
            })
        }

    }, [dispatch, error, alert, history, isUpdated])

    return (
        <Fragment>
            <div className='updatePasswordcontainer'>
                <div className='updatePasswordbox'>
                    <h2>Update Profile</h2>
                    <form className='updatePasswordForm' onSubmit={updatePasswordSubmit}>
                        <div className='loginPassword'>
                            <VpnKeyIcon />
                            <input
                                type="password"
                                placeholder='Old Password'
                                required
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                            />
                        </div>
                        <div className='loginPassword'>
                            <LockOpenIcon />
                            <input
                                type="password"
                                placeholder='New Password'
                                required
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>
                        <div className='loginPassword'>
                            <LockIcon />
                            <input
                                type="password"
                                placeholder='Confirm Password'
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <input type="submit" value="Change Password" className='updatePasswordBtn' />

                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default UpdatePassword