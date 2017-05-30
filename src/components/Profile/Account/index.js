import React, { Component } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

const customStyles = {
    overlay : {
        position          : 'fixed',
        top               : 0,
        left              : 0,
        right             : 0,
        bottom            : 0,
        backgroundColor   : 'rgba(255, 255, 255, 0.75)'
    },
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        height                : '550px'
    }
};

export default class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false,
            edit: null,
            data: []
        };
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    componentDidMount() {
        axios.get('http://207.154.197.7:5000/api/users')
        .then(response => {
            this.setState({data: response.data});
            console.log(this.state.data)
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    openModal() {
        this.setState({modalIsOpen: true});
    }
    afterOpenModal() {
        this.refs.subtitle.style.color = '#f00';
    }
    closeModal() {
        this.setState({modalIsOpen: false});
    }
    toggleEdit( itemId ) {
        this.setState( { edit: itemId } );
    }
    stateEdit(update) {
        axios({method: 'put', url: 'http://207.154.197.7:5000/api/users', data: {update}});
    }
    handleUserDataUpdate( update ) {
        this.stateEdit(update);
        this.setState({edit: null, modalIsOpen: false});
    }
    handleEditField( event ) {
        if ( event.keyCode === 13 ) {
            let target = event.target, update = {};
            update.id = this.state.edit;
            update[ target.name ] = target.value;
            this.handleUserDataUpdate( update );
        }
    }
    handleEditItem() {
        let itemId = this.state.edit;
        this.handleUserDataUpdate({
            id: itemId,
            fullname: this.refs[ `fullname_${ itemId }` ].value,
            email: this.refs[ `email_${ itemId }` ].value,
            password: this.refs[ `password_${ itemId }` ].value,
            phonenumber: this.refs[ `phonenumber_${ itemId }` ].value,
            yourcompany: this.refs[ `yourcompany_${ itemId }` ].value,
            youradress: this.refs[ `youradress_${ itemId }` ].value
        });
    }
    renderField(item) {
        return (
            <ul onClick={ this.toggleEdit.bind( this, item.id ) } key={ `editing-${ item.id }` }>
                <li className='rowinput'>
                    <input
                        onKeyDown={ this.handleEditField }
                        type='text'
                        className='form-control'
                        ref={ `fullname_${ item.id }` }
                        name='fullname'
                        defaultValue={ item.fullname }
                        aria-describedby='sizing-addon1'
                    />
                </li>
            </ul>
        );
    }
    render() {
        return (
            <div className='container-fluid pt-3'>
                <div className='row'>
                    <div className="col-12">
                        <div className="card mt-3">
                            <div className="card-block c-table-card-block">
                                <table className="table i-table-card">
                                    <tbody>
                                    <tr>
                                        <td>
                                            Account
                                        </td>
                                        <td>
                                            kfeofanov
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <img src='http://placehold.it/150x150' alt='...' className='img-rounded'/>
                                        </td>
                                        <td>
                                            kfeofanov@gmail.com
                                        </td>
                                        <td>
                                            <ul>
                                                <li>Plan: ULTRA</li>
                                                <li>Limits</li>
                                                <li>RAM: 8 GB</li>
                                                <li>STORAGE: 40 GB</li>
                                            </ul>
                                        </td>
                                        <td>
                                            <button onClick={this.openModal} className='btn btn-default' type='submit'>Edit Profile</button>
                                            <Modal
                                                isOpen={this.state.modalIsOpen}
                                                onAfterOpen={this.afterOpenModal}
                                                onRequestClose={this.closeModal}
                                                style={customStyles}
                                                contentLabel='Example Modal'
                                            >
                                                <h4 ref='subtitle'>Edit your profile</h4>
                                                {this.state.data.map(( item ) => {
                                                    return this.renderField( item );
                                                })}
                                            </Modal>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
