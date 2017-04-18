import React, { Component } from 'react';

export default class Post extends Component {
    render() {
        return (
            <div className='col-sm-6 col-md-4'>
                <div className='thumbnail'>
                    <img src='http://placehold.it/350x200' alt='...'/>
                    <div className='caption'>
                        <h4>Header</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod</p>
                    </div>
                </div>
            </div>
        );
    }
}
