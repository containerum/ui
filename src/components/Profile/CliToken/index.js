import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

export default class CliToken extends Component {
    render() {
        return (
            <div className='col-md-13 coltoken'>
                <div className='col-md-5'>
                    <h4>CLI Token</h4>
                    <h5>To use our CLI tool, you need a personal access token. You find operating system specific
                        instructions for using the token below.</h5>
                    <h5>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</h5>
                    <button className='btn btn-default clitool' type='submit'>Download CLI tool</button>
                </div>
                <div className='col-md-4'>
                    <Tabs selectedIndex={2}>
                        <TabList className='TabList'>
                            <Tab className='Tab'>LINUX</Tab>
                            <Tab className='Tab'>WINDOWS</Tab>
                            <Tab className='Tab'>MAC</Tab>
                        </TabList>
                        <TabPanel className='TabPanel'>
                            <h2>1</h2>
                        </TabPanel>
                        <TabPanel className='TabPanel'>
                            <h2>2</h2>
                        </TabPanel>
                        <TabPanel className='TabPanel'>
                            <h2>3</h2>
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
        );
    }
}
