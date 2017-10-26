import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SelectLinkedDeployment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valueLinkedDep: ''
        };
    }
    componentDidMount() {
        // const linkedDep = document.querySelector('.form-control.form-control-lg');
        // console.log(this.refs);
        this.props.handleSelect(this.state.valueLinkedDep);
    }
    componentWillReceiveProps(nextProp) {
        if (nextProp.DeploymentsReducer.length) {
            this.setState({
                valueLinkedDep: nextProp.DeploymentsReducer.length ? nextProp.DeploymentsReducer[0].name : ''
            });
        }
    }
    handleChange(event) {
        // console.log(event.target.value);
        this.props.handleSelect(event.target.value);
    }
    render() {
        // console.log(this.state.valueLinkedDep);
        // const firstItemName = this.props.DeploymentsReducer.length ? this.props.DeploymentsReducer[0].name : '';
        // console.log(firstItemName);
        return (
            <select
                value={this.state.valueLinkedDep}
                className="form-control form-control-lg"
                onChange={this.handleChange.bind(this)}
            >
                {
                    this.props.DeploymentsReducer.map((item, index) => {
                        // return index === 0 ? <option key={index} selected value={item.name}>{item.name}</option> : <option key={index} value={item.name}>{item.name}</option>;
                        return <option key={index} ref={item.name} value={item.name}>{item.name}</option>;
                    }
                )}
            </select>
        );
    }
}

SelectLinkedDeployment.propTypes = {
    DeploymentsReducer: PropTypes.array,
    handleSelect: PropTypes.func
};

export default SelectLinkedDeployment;
