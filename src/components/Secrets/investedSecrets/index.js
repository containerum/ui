import React, { Component } from 'react'
import { connect } from 'react-redux';
import Box from './Box';
import Data from './Data';

let table_data = [
    {id: '1', name: 'default-token-1kst', time: '29.01.2017'},
    {id: '2', name: 'default-token-2kst', time: '29.01.2017'},
    {id: '3', name: 'default-token-3kst', time: '29.01.2017'},
    {id: '4', name: 'default-token-4kst', time: '29.01.2017'},
    {id: '5', name: 'default-token-5kst', time: '29.01.2017'},
    {id: '6', name: 'default-token-6kst', time: '29.01.2017'}
];

class Secrets_1 extends Component {
    render() {
        let { data } = this.props;
        let renderSecrets = table_data.map(function(item, index){
            if (item.id == data.id) {
                return (
                    <div className='row' key={index}>
                        <Box item={item}/>
                        <Data />
                    </div>
                );
            }
        });
        return (
            <div>
                {renderSecrets}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        data: state.dataDeployment
    }
}

export default connect(mapStateToProps)(Secrets_1);
