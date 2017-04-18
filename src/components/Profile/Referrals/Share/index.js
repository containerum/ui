import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

export default class Share extends Component {
    render() {
        return (
            <div className='col-md-13 reftabbottom'>
                <div className='col-md-4'>
                    <h4>Email</h4>
                    <button className='btn btn-default' type='submit'>Connect with Gmail</button>
                    <Tabs selectedIndex={2} className='Tabs'>
                        <TabList className='TabList-2'>
                            <Tab className='Tab-2'>Email</Tab>
                            <Tab className='Tab-2'>Gmail</Tab>
                        </TabList>
                        <TabPanel className='TabPanel-2'>
                            <h2>1</h2>
                        </TabPanel>
                        <TabPanel className='TabPanel-2'>
                            <h2>2</h2>
                        </TabPanel>
                        <TabPanel className='TabPanel-2'>
                            <h2>3</h2>
                        </TabPanel>
                    </Tabs>
                    <button className='btn btn-default btnsend' type='submit'>Send</button>
                    <h5>$0 in potential account credits</h5>
                </div>
                <div className='col-md-5'>
                    <ul>
                        <li><h4>Link</h4></li>
                        <h5 className='share'>Share your link</h5>
                        <h5>Copy your personal referral link and share it with your friends and followers</h5>
                    </ul>
                    <input
                        type='text'
                        className='form-control'
                        value='https://containerum.com/c/fbc37656vhe93f'
                        aria-label='Amount (to the nearest dollar)'
                    />
                </div>
                <div className='col-md-3'>
                    <ul>
                        <li><h4>SHARE VIA</h4></li>
                        <button className='btn btn-default social' type='submit'>Facebook</button>
                        <button className='btn btn-default social-2' type='submit'>Twitter</button>
                        <button className='btn btn-default social-3' type='submit'>Вконтакте</button>
                    </ul>
                </div>
            </div>
        );
    }
}
