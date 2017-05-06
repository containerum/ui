import React, { Component } from 'react';
import NavLink from '../NavLink/index';

class Footer extends Component {
    render() {
        return (
            <footer className="footer">
                <div className="container-fluid">
                    <NavLink to="/Blog" className="text-muted mr-3">Blog</NavLink>
                    <NavLink to="/Documentations" className="text-muted mr-3">Documentations</NavLink>
                    <NavLink to="/Tutorials" className="text-muted">Tutorials</NavLink>
                </div>
            </footer>
        );
    }
}

export default Footer;
