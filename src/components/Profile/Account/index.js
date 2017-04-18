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
        axios.get('http://139.59.146.89/api/users')
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
        axios({method: 'put', url: 'http://139.59.146.89/api/users', data: {update}});
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
                <li className='rowinput'>
                    <input
                        onKeyDown={ this.handleEditField }
                        type='text'
                        className='form-control'
                        ref={ `email_${ item.id }` }
                        name='email'
                        defaultValue={ item.email }
                        aria-describedby='sizing-addon1'
                    />
                </li>
                <li className='rowinput'>
                    <input
                        onKeyDown={ this.handleEditField }
                        type='text'
                        className='form-control'
                        ref={ `password_${ item.id }` }
                        name='password'
                        aria-describedby='sizing-addon1'
                    />
                </li>
                <li className='rowinput'>
                    <input
                        onKeyDown={ this.handleEditField }
                        type='text'
                        className='form-control'
                        ref={ `phonenumber_${ item.id }` }
                        name='phonenumber'
                        defaultValue={ item.phonenumber }
                        aria-describedby='sizing-addon1'
                    />
                </li>
                <li className='rowinput'>
                    <input
                        onKeyDown={ this.handleEditField }
                        type='text'
                        className='form-control'
                        ref={ `yourcompany_${ item.id }` }
                        name='yourcompany'
                        defaultValue={ item.yourcompany }
                        aria-describedby='sizing-addon1'
                    />
                </li>
                <li className='rowinput'>
                    <input
                        onKeyDown={ this.handleEditField }
                        type='text'
                        className='form-control'
                        ref={ `youradress_${ item.id }` }
                        name='youradress'
                        defaultValue={ item.youradress }
                        aria-describedby='sizing-addon1'
                    />
                </li>
                <li>
                    <button
                        type='button'
                        className='btn btn-primary'
                        onClick={ this.handleEditItem.bind( this) }
                    >Update profile
                    </button>
                </li>
            </ul>
        );
    }
    render() {
        return (
            <div className='col-md-13'>
                <div className='col-md-2'>
                <h4>Account</h4>
                <img src='http://placehold.it/150x150' alt='...' className='img-rounded'/>
                </div>
                <div className='col-md-2'>
                <ul>
                <li><h4>kfeofanov</h4></li>
                <li>kfeofanov@gmail.com</li>
                </ul>
                </div>
                <div className='col-md-2'>
                <ul>
                <li>Plan: ULTRA</li>
                <li>Limits</li>
                <li>RAM: 8 GB</li>
                <li>STORAGE: 40 GB</li>
                </ul>
                </div>
                <div className='col-md-2 editprofile'>
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
                </div>
            </div>
        );
    }
}
