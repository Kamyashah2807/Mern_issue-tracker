import React, { Fragment, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import FaceIcon from "@material-ui/icons/FaceOutlined";

import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, register } from '../../actions/userAction';
import { useAlert } from 'react-alert'
import './LoginSignup.css';

const SignUp = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const history = useNavigate();

    const { error, isAuthenticated } = useSelector(state => state.user);

    const registerSubmit = (e) => {
        e.preventDefault();
        dispatch(register(name, email, password));
        alert.success("User Registration Successfully!!")
        history("/login")
    }

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    });

    const { name, email, password } = user;

    const onChange = (e) => {
        let { name, value } = e.target;
        setUser({ ...user, [name]: value });
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
                <h2>Register Form</h2>
                <form className='loginForm' onSubmit={registerSubmit}>
                <div className='loginEmail'>
                        <FaceIcon />
                        <input
                            type="text"
                            placeholder='Name'
                            required
                            value={name}
                            name="name"
                            onChange={onChange}
                        />
                    </div>
                    <div className='loginEmail'>
                        <MailOutlineIcon />
                        <input
                            type="email"
                            placeholder='Email'
                            required
                            value={email}
                            name="email"
                            onChange={onChange}
                        />
                    </div>
                    <div className='loginPassword'>
                        <LockOpenIcon />
                        <input
                            type="password"
                            placeholder='Password'
                            required
                            value={password}
                            name="password"
                            onChange={onChange}
                        />
                    </div>
                    <input type="submit" value="Register" className='loginBtn' />

                    <Link to="/login">Already have an account?</Link>
                </form>
            </div>
        </div>
    </Fragment>
    )
}

export default SignUp