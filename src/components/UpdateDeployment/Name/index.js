import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tooltip from 'rc-tooltip';
// import { connect } from 'react-redux';

class Name extends Component {
    render() {
        return (
	        <div className="blockContainer blockContainerPadin" id="name">
		        <div className="col-md-7">
			        <div className="containerTitle"><span>*</span> Name
				        {/*<Tooltip*/}
					        {/*placement='top'*/}
					        {/*trigger={['hover']}*/}
					        {/*overlay={<span>Text of notificatiorem ipsum alist delor set. Text of <br/>notification. Lore ipsum delor upset ore ipsum delor <br/>upset</span>}*/}
				        {/*>*/}
					        {/*<span className="myTooltip" data-toggle="tooltip">?</span>*/}
				        {/*</Tooltip>*/}
			        </div>
			        <div className="containerSubTitle">Enter Deployment name</div>
			        <div className="form-group">
				        <input
					        className="form-group__input-text form-control customInput"
					        type="text"
					        pattern="^[a-z0-9]([-a-z0-9]*[a-z0-9])?$"
					        required title="Deployment name can only contain letters, numbers and characters"
					        ref="name"
					        onChange={(e) => {
						        this.props.onChangeInputName(e.target.value);
						        if (e.target.value.length === 0) {
							        document.getElementById('name-form-group__label').classList.remove('form-group__label-always-onfocus');
						        } else {
							        document.getElementById('name-form-group__label').classList.add('form-group__label-always-onfocus');
						        }
					        }}
				        />
				        <label
					        className="form-group__label"
					        id="name-form-group__label"
				        >Name</label>
				        <div className="form-group__helper">Deployment name can only contain letters, numbers and characters</div>
			        </div>
		        </div>
	        </div>
        );
    }
}

Name.propTypes = {
	onChangeInputName: PropTypes.func.isRequired
};

export default Name;
