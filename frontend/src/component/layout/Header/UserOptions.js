import React, { Fragment, useState } from 'react';
import './Header.css';
import { SpeedDial, SpeedDialAction } from '@material-ui/lab';
import DashBoardIcon from '@material-ui/icons/Dashboard';
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ListAltIcon from '@material-ui/icons/ListAlt';
import Backdrop from '@material-ui/core/Backdrop';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../../actions/userAction';
import { useAlert } from 'react-alert'

const UserOptions = ({ user }) => {
    const [open, setOpen] = useState(false);

    let history = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();

    const options = [
        { icon: <ListAltIcon />, name: "Issues", func: issues },
        { icon: <PersonIcon />, name: "Profile", func: account },
        { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
    ];

    if (user.role === "admin") {
        options.unshift({
            icon: <DashBoardIcon />,
            name: "Dashboard",
            func: dashboard
        })
    }

    function dashboard() {
        history("/dashboard")
    }

    function issues() {
        history("/issues")
    }

    function account() {
        history("/profile")
    }

    function logoutUser() {
        dispatch(logout())
        alert.success("Logout Successfully");
        history("/login")
    }

    return <Fragment>
        <Backdrop open={open} style={{zIndex:"10"}}/>
        <SpeedDial
            ariaLabel='SpeedDial tootlip example'
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            style={{zIndex:"11"}}
            open={open}
            direction="down"
            className='speedDial' 
            icon={
                <img 
                    className='speedDialIcon'
                    src="https://media.istockphoto.com/vectors/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620?k=20&m=1300845620&s=612x612&w=0&h=f4XTZDAv7NPuZbG0habSpU0sNgECM0X7nbKzTUta3n8="
                    alt='Profile'
                />
            }       
        >
            {options.map((item) => (
                <SpeedDialAction icon={item.icon} tooltipTitle={item.name} key={item.id} onClick={item.func} />
            ))}

        </SpeedDial>
    </Fragment>

}

export default UserOptions