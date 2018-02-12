import React, { Component } from 'react';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Tooltip from 'rc-tooltip';

class Commands extends Component {
	componentDidMount() {
		// console.log('commands', this.props.item.command);
		if (this.props.item.command.length) {
			const command = document.getElementById(`commands-name-form-group__label${this.props.item.id}`);
			command ? command.classList.add('form-group__label-always-onfocus') : null;
		}
	}
    render() {
		// console.log('this.props.item.id', this.props.item.id);
        return (
	        <div
		        className="row rowLine"
		        id={`container${this.props.index}-commands`}
	        >
		        <div className="col-md-12">
			        <div className="containerTitle containerBlockTitle">Commands
				        {/*<Tooltip*/}
					        {/*placement='top'*/}
					        {/*trigger={['hover']}*/}
					        {/*overlay={<span>Text of notificatiorem ipsum alist delor set. Text of <br/>notification. Lore ipsum delor upset ore ipsum delor <br/>upset</span>}*/}
				        {/*>*/}
					        {/*<span className="myTooltip" data-toggle="tooltip">?</span>*/}
				        {/*</Tooltip>*/}
			        </div>
		        </div>
		        <div className="col-md-11">
			        <div className="form-group">
				        <input
					        className="form-group__input-text form-control customInput"
					        id={`commands${this.props.index}`}
					        type="text"
					        value={this.props.item.command.join(' ')}
					        onChange={(e) => {
						        this.props.onChangeInputCommands({
							        command: e.target.value,
							        index: this.props.index - 1
						        });
						        if (e.target.value.length === 0) {
							        document.getElementById(`commands-name-form-group__label${this.props.item.id}`).classList.remove('form-group__label-always-onfocus');
						        } else {
							        document.getElementById(`commands-name-form-group__label${this.props.item.id}`).classList.add('form-group__label-always-onfocus');
						        }
					        }}
				        />
				        <label
					        className="form-group__label"
					        id={`commands-name-form-group__label${this.props.item.id}`}
					        htmlFor={`commands${this.props.index}`}
				        >Entrypoint</label>
				        <div className="form-group__helper helperText">Example: top, -b</div>
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
