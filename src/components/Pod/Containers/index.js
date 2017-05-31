import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Containers extends Component {
    render() {
        const arrContainersPodReducer = this.props.PodReducer.data.containers ? this.props.PodReducer.data.containers : [];
        return (
            <div className="container-fluid pt-3 pb-5">
                <h5>Containers</h5>
                <div className="row">
                    <div className="col-12">
                        <div className="card i-card-border mt-3">
                            <div className="card-block c-table-card-block">
                                <div className="table table-hover c-table-card i-table-card">
                                    <div className="i-table-tbody">
                                        {
                                            arrContainersPodReducer.map((item, index) => {
                                                const name = item.name;
                                                const nameFirstChar = name.substring(0, 1).toUpperCase();
                                                return (
                                                    <div className="i-row-table tr-hover" key={index}>
                                                        <div className="i-td-table">
                                                            <svg className="c-table-card-img mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 37.78 33.25">
                                                                <g>
                                                                    <path className="cls-container" d="M5383.94,530.28l8.57-14.84a2,2,0,0,0,0-1.78l-8.56-14.85a2,2,0,0,0-1.54-.89h-17.14a2,2,0,0,0-1.54.89l-8.57,14.84a2,2,0,0,0,0,1.78l8.56,14.84a2,2,0,0,0,1.54.89h17.14A2,2,0,0,0,5383.94,530.28Z" transform="translate(-5354.94 -497.92)"/>
                                                                </g>
                                                                <text className="cls-2" x="33%" y="70%">{nameFirstChar}</text>
                                                            </svg>
                                                            {name}
                                                        </div>
                                                        <div className="i-td-table i-td-table-pd-top">{item.status}</div>
                                                        <div className="i-td-table i-td-table-pd-top">{item.ram}</div>
                                                        <div className="i-td-table i-td-table-pd-top">{item.cpu}</div>
                                                        <div className="i-td-table i-td-table-pd-top">{item.created_at}</div>
                                                        <div className="i-td-table i-td-table-pd-top">{item.restarts} restarts</div>
                                                    </div>
                                                );
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Containers.propTypes = {
    PodReducer: PropTypes.object
};

export default Containers;
