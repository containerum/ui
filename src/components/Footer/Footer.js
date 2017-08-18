import React, { Component } from 'react';
import Translate from 'react-translate-component';

import '../../localization/en/footer';
import '../../localization/ru/footer';

class Footer extends Component {
    render() {
        return (
            <footer className="footer">
                <div className="container-fluid">
                    <a target="_blank" href="http://blog.containerum.io/" className="text-muted mr-3">
                        <Translate content="footer.blog">Blog</Translate>
                    </a>
                    <a target="_blank" href="https://containerum.com/documentation/start-guide" className="text-muted mr-3">
                        <Translate content="footer.documentations">Documentations</Translate>
                    </a>
                    {/*<a target="_blank" href="http://blog.containerum.io/" className="text-muted">*/}
                    {/*<Translate content="footer.tutorials">Tutorials</Translate>*/}
                    {/*</a>*/}
                    <span className="text-muted float-right">
                        Copyright Exon Lab Company © {new Date().getFullYear()}
                    </span>
                </div>
            </footer>
        );
    }
}

export default Footer;
