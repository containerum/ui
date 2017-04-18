import React, { Component } from 'react';
import { Link } from 'react-router';
import ButtonInfo from './Button-info';
import ProgressRAM from './ProgressRAM';
import ButtonDropRight from './Button-drop-right';

export default class NavBar extends Component {
    render() {
        return (
            <nav className='navbar navbar-default'>
                <div className='container-fluid'>
                    <div className='navbar-header'>
                        <Link to='/' className='navbar-brand'>
                            <img alt='' src='...' />
                            <h3 >Containerum</h3>
                        </Link>
                        <div className='col-md-2 info'>
                            <ButtonInfo />
                        </div>
                        <div className='col-md-2 dataram'>
                            <h5>RAM usage 6 / 8</h5>
                            <ProgressRAM />
                        </div>
                        <div className='col-md-2 dataimg' >
                            <img src='http://www.esek.org.gr/images/ESET/eset_user.png' alt='...' className='img-circle' />
                        </div>
                        <div className='col-md-2 datamail'>
                            <h5>kfeofantov</h5>
                            <h6>Balance: 35 $</h6>
                        </div>
                        <div className='col-md-2 datadrop'>
                            <ButtonDropRight />
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}
