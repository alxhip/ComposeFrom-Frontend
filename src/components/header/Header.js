import React from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../login/AuthService';

class Header extends React.Component {
    handleClick = () => {
        AuthService.logout();
    }
    render() {
        if (window.location.pathname === '/login') return null;
        return (
            <div className="ui secondary pointing menu">
                <Link to="/" className="item">
                    Home
                </Link>
                {localStorage.getItem("role") === "Admin" &&
                    <Link to="/create" className="item">
                        Create
                    </Link>
                }
                {localStorage.getItem("role") === "Admin" &&
                    <Link to="/submittedForms" className="item">
                        Submitted forms
                    </Link>
                }
                < div className="right menu">
                    <Link to="/" className="item" onClick={this.handleClick.bind(this)}>
                        Log out
                    </Link>
                </div>
            </div >
        );
    }

}

export default Header;