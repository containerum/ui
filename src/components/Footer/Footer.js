import React, { Component } from 'react';
import Translate from 'react-translate-component';

import NavLink from '../NavLink/index';

import '../../localization/en/footer';
import '../../localization/ru/footer';

class Footer extends Component {
    render() {
        return (
            <footer className="footer">
                <div className="container-fluid">
                    <NavLink to={window.location.pathname} className="text-muted mr-3">
                        <Translate content='footer.blog'>Blog</Translate>
                    </NavLink>
                    <NavLink to={window.location.pathname} className="text-muted mr-3">
                        <Translate content='footer.documentations'>Documentations</Translate>
                    </NavLink>
                    <NavLink to={window.location.pathname} className="text-muted">
                        <Translate content='footer.tutorials'>Tutorials</Translate>
                    </NavLink>
                    <span className="text-muted float-right">
                        Copyright EXON LAB Company © {new Date().getFullYear()}
                    </span>
                </div>
            </footer>
        );
    }
}

export default Footer;
