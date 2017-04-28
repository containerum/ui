import React, { Component } from 'react';
import Box from './Box';
import PanelPods from './PanelPods';
import { connect } from 'react-redux';
import axios from 'axios';

class Services_1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageSize: 4,
            data_services: []
        };
    }
    componentDidMount() {
        axios.get(`http://139.59.146.89/api/services/${this.props.data.id}`)
        .then(response => {
            this.setState({data_services: response.data});
            console.log(this.state.data_services);
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    render() {
        const content = (
            <div>
                <Box item={this.state.data_services}/>
                <PanelPods item={this.state.data_services.pods}/>
            </div>
        );
        const loader = (
            <p>Error with data receiving</p>
        );
        return (
            <div className='row'>
                {this.state.data_services === '' ? loader : content}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        data: state.dataDeployment
    }
}

export default connect(mapStateToProps)(Services_1);
