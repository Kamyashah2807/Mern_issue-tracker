import React, { Fragment, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockOpenIcon from '@material-ui/icons/LockOpen';

import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, login } from '../../actions/userAction';
import { useAlert } from 'react-alert'
import './LoginSignup.css';

const Login = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const history = useNavigate();

    const { error, isAuthenticated } = useSelector(state => state.user);

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const loginSubmit = (e) => {
        e.preventDefault();
        dispatch(login(loginEmail, loginPassword));
        history("/account")
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

    }, [dispatch, error, alert, history, isAuthenticated])

    return (
        <Fragment>
            <div className='loginsignupcontainer'>
                <div className='loginsignupbox'>
                    <h2>Login Form</h2>
                    <form className='loginForm' onSubmit={loginSubmit}>
                        <div className='loginEmail'>
                            <MailOutlineIcon />
                            <input
                                type="email"
                                placeholder='Email'
                                required
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                            />
                        </div>
                        <div className='loginPassword'>
                            <LockOpenIcon />
                            <input
                                type="password"
                                placeholder='Password'
                                required
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                            />
                        </div>
                        <Link to="/password/forgot">Forgot Password?</Link>
                        <input type="submit" value="Login" className='loginBtn' />

                        <Link to="/register">Don't have an account?</Link>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default Login