import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import rectangle from '../../../images/rectangle.png';
// import Spinner from '../../Spinner';

class PodContainer extends Component {
    render() {
        // console.log(this.props.GetPodReducer);
        const containers = Object.keys(this.props.GetPodReducer.data).length ? this.props.GetPodReducer.data.containers : [];
        let isPodsEmpty = '';
	    if (!this.props.GetPodReducer.isFetching &&
	        !this.props.DeletePodReducer.isFetching) {
		    isPodsEmpty =
                <div className="row double">
				    {
					    containers.map((item, index) => {
						    return (
                                <div className="col-md-6" key={index}>
                                    <div className="content-block-container card-container hover-action mt-0">
                                        <div className="content-block-header">
                                            <div className="content-block-header-label">
                                                <div className="content-block-header-img"><img src={rectangle} alt="" /></div>
                                                <div className="content-block-header-label__text content-block-header-label_main">{item.name}</div>
                                            </div>
										    {/*<div className="content-block-header-extra-panel">*/}
										    {/*<div className="content-block-header-extra-panel dropdown no-arrow">*/}
										    {/*<i*/}
										    {/*className="content-block-header__more ion-more dropdown-toggle"*/}
										    {/*data-toggle="dropdown"*/}
										    {/*aria-haspopup="true"*/}
										    {/*aria-expanded="false"*/}
										    {/*> </i>*/}
										    {/*<ul className="dropdown-menu dropdown-menu-right" role="menu">*/}
										    {/*<button*/}
										    {/*className="dropdown-item text-danger"*/}
										    {/*>Delete</button>*/}
										    {/*</ul>*/}
										    {/*</div>*/}
										    {/*</div>*/}
                                        </div>
                                        <div className="content-block-content card-block collapsed">
                                            <div className="content-block__info-item ">
                                                <div className="content-block__info-name inline">RAM ( Usage ) :&nbsp;</div>
                                                <div className="content-block__info-text inline">{item.ram} MB</div>
                                            </div>
                                            <div className="content-block__info-item">
                                                <div className="content-block__info-name inline">CPU ( Usage ) :&nbsp;</div>
                                                <div className="content-block__info-text inline">{item.cpu} m</div>
                                            </div>
                                            <div className="content-block__info-item">
                                                <div className="content-block__info-name inline">Image:&nbsp;</div>
                                                <div className="content-block__info-text inline">{item.image}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
						    )
					    })
				    }
                </div>
	    } else {
		    isPodsEmpty =
                <div
                    className="container"
                    style={{
					    padding: '0',
					    marginTop: '17px',
					    marginBottom: '30px',
					    backgroundColor: 'transparent'
				    }}>
                    <div className="row double">
                        <div className="col-md-6">
                            <img src={require('../../../images/pods-cont.svg')} style={{width: '100%'}}/>
                        </div>
                        <div className="col-md-6">
                            <img src={require('../../../images/pods-cont.svg')} style={{width: '100%'}}/>
                        </div>
                    </div>
                </div>
	    }
        return (
            <div>
                <div className="content-block">
                    <div className="container no-back">
                        { isPodsEmpty }
                    </div>
                </div>
            </div>
        );
    }
}

PodContainer.propTypes = {
    GetPodReducer: PropTypes.object,
    DeletePodReducer: PropTypes.object,
    idName: PropTypes.string,
    idDep: PropTypes.string,
    idPod: PropTypes.string
};

function mapStateToProps(state) {
    return {
        GetPodReducer: state.GetPodReducer,
        DeletePodReducer: state.DeletePodReducer
    };
}

export default connect(mapStateToProps)(PodContainer);
