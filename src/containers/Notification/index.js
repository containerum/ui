import React, { PureComponent } from 'react';
import toastr from 'toastr';

type Props = {
  name: string,
  status: string,
  method: string,
  token: string,
  errorMessage: string
};

class Notification extends PureComponent<Props> {
  componentWillReceiveProps(nextProps) {
    toastr.options = {
      closeButton: true,
      debug: false,
      newestOnTop: false,
      progressBar: true,
      positionClass: 'toast-top-right',
      preventDuplicates: false,
      onclick: null,
      showDuration: '300',
      hideDuration: '1000',
      timeOut: '5000',
      extendedTimeOut: '1000',
      showEasing: 'swing',
      hideEasing: 'linear',
      showMethod: 'fadeIn',
      hideMethod: 'fadeOut'
    };
    if (
      nextProps.status === 202 &&
      nextProps.name &&
      nextProps.name !== this.props.name
    ) {
      if (nextProps.method === 'put') {
        toastr.success(`${nextProps.name} was updated`, 'Successfully updated');
      } else {
        toastr.success(`${nextProps.name} was deleted`, 'Successfully deleted');
      }
    } else if (
      nextProps.status === 202 &&
      nextProps.name === 'Password' &&
      this.props.token !== nextProps.token
    ) {
      toastr.success(`${nextProps.name} was updated`, 'Successfully updated');
    } else if (
      nextProps.status === 201 &&
      nextProps.name &&
      nextProps.name !== this.props.name
    ) {
      toastr.success(`${nextProps.name} was created`, 'Successfully created');
    } else if (
      nextProps.status === 200 &&
      nextProps.name &&
      this.props.name !== nextProps.name
    ) {
      toastr.success(
        `${nextProps.name} was successfully applied`,
        'Applied Success'
      );
    } else if (
      (nextProps.errorMessage === 'Not enough money to buy a project' ||
        nextProps.errorMessage === 'Not enough money to buy volume' ||
        nextProps.errorMessage === 'Not enough money to resize volume') &&
      nextProps.name !== this.props.name
    ) {
      toastr.error(
        `${
          nextProps.errorMessage
        }<br />Please, follow to <a href="/Billing">billing page</a>`,
        'Error'
      );
    } else if (
      nextProps.errorMessage &&
      nextProps.errorMessage !== this.props.errorMessage
    ) {
      toastr.error(nextProps.errorMessage, 'Error');
    }
  }
  render() {
    return <div />;
  }
}

export default Notification;
