/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import type { Connector } from 'react-redux';
import Helmet from 'react-helmet';
import toastr from 'toastr';

import * as actionSendSupportTicket from '../../actions/supportActions/sendSupportTicket';
import * as actionGetSupportGroups from '../../actions/supportActions/getSupportGroups';
import {
  GET_SUPPORT_GROUPS_INVALID,
  GET_SUPPORT_GROUPS_REQUESTING,
  GET_SUPPORT_GROUPS_FAILURE,
  GET_SUPPORT_GROUPS_SUCCESS
} from '../../constants/supportConstants/getSupportGroupsConstants';
import type { Dispatch, ReduxState } from '../../types';
import SupportList from '../../components/SupportList';
import './Support.css';

type Props = {
  sendSupportTicketReducer: Object,
  getSupportGroupsReducer: Object,
  getProfileReducer: Object,
  fetchSendSupportTicketIfNeeded: (data: Object) => void,
  fetchGetSupportGroupsIfNeeded: (idName: string) => void
};

// Export this for unit testing more easily
export class Support extends PureComponent<Props> {
  constructor() {
    super();
    this.state = {
      textArea: '',
      group: '',
      files: [],
      base64: []
    };
  }
  componentDidMount() {
    const { fetchGetSupportGroupsIfNeeded } = this.props;
    fetchGetSupportGroupsIfNeeded();
  }
  componentWillUpdate(nextProps) {
    if (
      this.props.getSupportGroupsReducer.readyStatus !==
        nextProps.getSupportGroupsReducer.readyStatus &&
      nextProps.getSupportGroupsReducer.readyStatus ===
        GET_SUPPORT_GROUPS_SUCCESS
    ) {
      this.setState({
        ...this.state,
        group: nextProps.getSupportGroupsReducer.data[0].group.group_id
      });
    }
  }
  handleChangeTextArea = e => {
    const textArea = e.target.value;
    this.setState({
      ...this.state,
      textArea
    });
  };
  handleChangeGroup = e => {
    this.setState({
      ...this.state,
      group: e.target.value
    });
  };
  handleDeleteImage = imageName => {
    const arrBase64 = [];
    const newFiles = this.state.files.filter((file, index) => {
      if (file.name !== imageName) arrBase64.push(this.state.base64[index]);
      return file.name !== imageName;
    });
    this.setState({
      ...this.state,
      files: newFiles,
      base64: arrBase64
    });
  };
  handleFiles = files => {
    const errorFiles = [];
    const successFiles = [];
    const successBase64 = [];
    Object.keys(files.fileList).filter((item, index) => {
      if (files.fileList[item].size >= 15728640) {
        errorFiles.push(files.fileList[item]);
      } else {
        successFiles.push(files.fileList[item]);
        successBase64.push(files.base64[index]);
      }
      return null;
    });
    if (errorFiles.length) {
      toastr.error(
        `<div>${errorFiles.map(
          file => `
    ${file.name}`
        )}</div>`,
        `The following files were not downloaded because the attachment size (15 MB maximum) was exceeded:`
      );
    }
    this.setState({
      ...this.state,
      files: successFiles,
      base64: successBase64
    });
  };
  handleOnSubmit = e => {
    e.preventDefault();
    const { textArea, group, base64, files } = this.state;
    const { getProfileReducer, fetchSendSupportTicketIfNeeded } = this.props;
    const userEmail = getProfileReducer.data.login;
    const reqObj = {
      case: {
        user_email: userEmail,
        subject: 'web-ui',
        content: textArea,
        group_id: group,
        base64,
        files
      }
    };
    if (files.length) {
      reqObj.case.files = files.map(item => item.name);
    }
    // console.log(reqObj);
    fetchSendSupportTicketIfNeeded(reqObj);
  };

  renderSupportList = () => {
    const { getSupportGroupsReducer, sendSupportTicketReducer } = this.props;

    if (
      !getSupportGroupsReducer.readyStatus ||
      getSupportGroupsReducer.readyStatus === GET_SUPPORT_GROUPS_INVALID ||
      getSupportGroupsReducer.readyStatus === GET_SUPPORT_GROUPS_REQUESTING
    ) {
      return (
        <div
          style={{
            width: '665px',
            padding: '30px',
            margin: '0 auto'
          }}
        >
          <img src={require('../../images/support.svg')} alt="support" />
        </div>
      );
    }

    if (getSupportGroupsReducer.readyStatus === GET_SUPPORT_GROUPS_FAILURE) {
      return <p>Oops, Failed to load data of Support!</p>;
    }

    return (
      <SupportList
        data={getSupportGroupsReducer.data}
        isFetching={sendSupportTicketReducer.isFetching}
        textArea={this.state.textArea}
        group={this.state.group}
        files={this.state.files}
        handleOnSubmit={e => this.handleOnSubmit(e)}
        handleChangeGroup={e => this.handleChangeGroup(e)}
        handleChangeTextArea={e => this.handleChangeTextArea(e)}
        handleDeleteImage={fileName => this.handleDeleteImage(fileName)}
        handleFiles={files => this.handleFiles(files)}
      />
    );
  };

  render() {
    return (
      <div>
        <Helmet title="Support" />
        <div className="content-block">
          <div className="content-block-container container no-back">
            {this.renderSupportList()}
          </div>
        </div>
      </div>
    );
  }
}

const connector: Connector<{}, Props> = connect(
  ({
    sendSupportTicketReducer,
    getSupportGroupsReducer,
    getProfileReducer
  }: ReduxState) => ({
    sendSupportTicketReducer,
    getSupportGroupsReducer,
    getProfileReducer
  }),
  (dispatch: Dispatch) => ({
    fetchSendSupportTicketIfNeeded: (data: Object) =>
      dispatch(actionSendSupportTicket.fetchSendSupportTicketIfNeeded(data)),
    fetchGetSupportGroupsIfNeeded: (idName: string) =>
      dispatch(actionGetSupportGroups.fetchGetSupportGroupsIfNeeded(idName))
  })
);

export default connector(Support);
