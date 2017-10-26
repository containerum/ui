import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { convertToCompany } from '../../../actions/ConvertToCompanyActions';

class ConvertCompany extends Component {
    handleOnSubmitConvert(e) {
        e.preventDefault();
        console.log(this.refs.code.value, this.refs.company.value);
        const convertCompany = {
            code: this.refs.code.value,
            company: this.refs.company.value
        };
        this.props.onConvertToCompany(convertCompany);
    }
    render() {
        return (
            <div className="block-item" id="company-account">
                <div className="block-item__title">Company account</div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="light-text">Warning: this will totaly delete your Apps and Data</div>
                    </div>
                    <div className="col-md-6">
                        <form action="" className="" method="">
                            <div className="form-group pt-0">
                                <input type="text" className="form-group__input-text form-control" id="company-name" />
                                <label className="form-group__label" htmlFor="company-name">Company name</label>
                                <div className="form-group__helper"></div>
                            </div>
                            <div className="form-group ">
                                <input type="text" className="form-group__input-text form-control" id="tax-code" />
                                <label className="form-group__label" htmlFor="tax-code">Tax code</label>
                                <div className="form-group__helper"></div>
                            </div>
                            <div className="form-group pt-0">
                                <input type="submit" value="Convert" className="button_blue btn btn-outline-primary" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

ConvertCompany.propTypes = {
    onConvertToCompany: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        ConvertToCompanyReducer: state.ConvertToCompanyReducer
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onConvertToCompany: convertCompany => {
            dispatch(convertToCompany(convertCompany));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConvertCompany);
