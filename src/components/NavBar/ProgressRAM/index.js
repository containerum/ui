import React, { Component } from 'react';

export default class ProgressRAM extends Component {
    render() {
        return (
            <div className='progress'>
                <div
                    className='progress-bar'
                    role='progressbar'
                    aria-valuenow='70'
                    aria-valuemin='0'
                    aria-valuemax='100'
                    style={{width: '70%'}}
                >
                    <span className='sr-only'>70 % Complete</span>
                </div>
            </div>
        );
    }
}
