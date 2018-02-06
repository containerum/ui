import React, { Component } from 'react';
import PropTypes from "prop-types";
import Tooltip from 'rc-tooltip';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

class Replicas extends Component {
	componentDidMount() {
		// console.log(this.props.value);
		if (this.props.value) {
			document.getElementById('replica-form-group__label').classList.add('form-group__label-always-onfocus');
		} else {
			document.getElementById('replica-form-group__label').classList.remove('form-group__label-always-onfocus');
		}
	}
    render() {
        return (
	        <div className="blockContainer blockContainerPadin" id="replicas">
		        <div className="col-md-7">
			        <div className="containerTitle"><span>*</span> Replicas
				        {/*<Tooltip*/}
					        {/*placement='top'*/}
					        {/*trigger={['hover']}*/}
					        {/*overlay={<span>Text of notificatiorem ipsum alist delor set. Text of <br/>notification. Lore ipsum delor upset ore ipsum delor <br/>upset</span>}*/}
				        {/*>*/}
					        {/*<span className="myTooltip" data-toggle="tooltip">?</span>*/}
				        {/*</Tooltip>*/}
			        </div>
			        <div className="containerSubTitle">Enter Replicas count</div>
			        <div className="form-group">
				        <input
					        className="form-group__input-text form-control customInput"
					        id="replica"
					        value={this.props.value}
					        type="number"
					        required
					        min="1"
					        max="15"
					        onChange={(e) => {
						        this.props.onChangeInputReplicas(e.target.value);
						        if (e.target.value.length === 0) {
							        document.getElementById('replica-form-group__label').classList.remove('form-group__label-always-onfocus');
						        } else {
							        document.getElementById('replica-form-group__label').classList.add('form-group__label-always-onfocus');
						        }
					        }}
				        />
				        <label
					        className="form-group__label"
					        htmlFor="replica"
					        id="replica-form-group__label"
				        >Count</label>
				        <div className="form-group__helper">Max: 15 replicas</div>
			        </div>
		        </div>
	        </div>
        );
    }
}

Replicas.propTypes = {
	onChangeInputReplicas: PropTypes.func.isRequired,
	value: PropTypes.number
};

export default Replicas;
