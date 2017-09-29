import React, { Component } from 'react';

import arrows from '../../images/arrows.png';

class Footer extends Component {
    render() {
        return (
            <footer className="footer">
                <div className="footer-wrapper">
                    <div className="footer-container container">
                        <div className="footer__logo">Created by Exon Lab</div>
                        <a target="_blank" href="https://github.com/containerum/chkit/releases/latest" className="footer__download_cli">
                            Download CLI <img src={arrows} alt="Download CLI" />
                        </a>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;
