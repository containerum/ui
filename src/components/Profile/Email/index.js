import React, { Component } from 'react';

export default class Email extends Component {
  render() {
    return (
      <div className='col-md-13 colmail'>
        <div className='col-md-8'>
          <h4>E-mail subscriptions</h4>
            <h5>By subscribing to our email newsletter, you will be opting to receive updates about new feature releases, discounts and prornotional codes, security updates, and more.</h5>
            <h5>If you not interested in receiving this content, please uncheck the box below to unsubscribe.</h5>
            <div className='... checkbox-slider--b-flat'>
              <label>
                <input type='checkbox'/><span>Subscribe to newsletters</span>
              </label>
            </div>
          </div>
        </div>
    );
  }
}
