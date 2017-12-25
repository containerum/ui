import React, { Component } from 'react';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Commands extends Component {
    render() {
        return (
	        <div
		        className="row rowLine"
		        id={`container${this.props.index}-commands`}
	        >
		        <div className="col-md-12">
			        <div className="containerTitle containerBlockTitle">Commands
				        <span className="myTooltip" data-toggle="tooltip" title="Text of notificatiorem ipsum alist delor set. Text of notification. Lore ipsum delor upset ore ipsum delor upset">?</span>
			        </div>
		        </div>
		        <div className="col-md-11">
			        <div className="form-group">
				        <input
					        className="form-group__input-text form-control"
					        id={`commands${this.props.index}`}
					        type="text"
					        value={this.props.item.command.join(' ')}
					        onChange={(e) => {
						        this.props.onChangeInputCommands({
							        command: e.target.value,
							        index: this.props.index - 1
						        });
					        }}
				        />
				        <label className="form-group__label" htmlFor="commands">Commands</label>
				        <div className="form-group__helper helperText">Your Deployment name can only contain alphanumeric and characters</div>
			        </div>
		        </div>
	        </div>
        );
    }
}

Commands.propTypes = {
	index: PropTypes.number.isRequired,
	item: PropTypes.object.isRequired,
	onChangeInputCommands: PropTypes.func.isRequired
};

export default Commands;
