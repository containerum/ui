/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import type { Connector } from 'react-redux';
import Helmet from 'react-helmet';
import toastr from 'toastr';
import queryString from 'query-string';
import decodeUriComponent from 'decode-uri-component';

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
import globalStyles from '../../theme/global.scss';

type Props = {
  location: Object,
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
    const { fetchGetSupportGroupsIfNeeded, location } = this.props;
    fetchGetSupportGroupsIfNeeded();
    const { report } = queryString.parse(location.search);
    if (report) {
      this.setState({
        ...this.state,
        textArea: decodeUriComponent(report)
      });
    }
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
    const errorFilesSize = [];
    const errorFilesFormat = [];
    const successFiles = [];
    const successBase64 = [];
    const successFilesFirstThree = [];
    const successBase64FirstThree = [];
    Object.keys(files.fileList).filter((item, index) => {
      if (
        !(
          files.fileList[item].type === 'image/png' ||
          files.fileList[item].type === 'image/jpeg' ||
          files.fileList[item].type === 'image/gif' ||
          files.fileList[item].type === 'text/plain' ||
          files.fileList[item].type === 'application/pdf'
        )
      ) {
        errorFilesFormat.push(files.fileList[item]);
      }

      if (
        files.fileList[item].type === 'image/png' ||
        files.fileList[item].type === 'image/jpeg' ||
        files.fileList[item].type === 'image/gif' ||
        files.fileList[item].type === 'text/plain' ||
        files.fileList[item].type === 'application/pdf'
      ) {
        successFiles.push(files.fileList[item]);
        successBase64.push(files.base64[index]);
      }
      if (files.fileList[item].size >= 10485760) {
        errorFilesSize.push(files.fileList[item]);
      }
      return null;
    });
    if (errorFilesFormat.length) {
      toastr.error(
        `<div>${errorFilesFormat.map(
          file => `
    ${file.name}`
        )}</div>`,
        `Invalid data format, please send files of acceptable formats`
      );
    }
    if (errorFilesSize.length) {
      toastr.error(
        `<div>${errorFilesSize.map(
          file => `
    ${file.name}`
        )}</div>`,
        `The following files were not downloaded because the attachment size (10 MB maximum) was exceeded:`
      );
    }

    if (successFiles.length > 3) {
      toastr.error(
        `<div>${errorFilesSize.map(
          file => `
    ${file.name}`
        )}</div>`,
        `You can only upload 3 files at a time`
      );
    }

    if (successFiles.length > 3) {
      for (let i = 0; i < 3; i += 1) {
        successFilesFirstThree.push(successFiles[i]);
        successBase64FirstThree.push(successBase64[i]);
      }
      this.setState({
        ...this.state,
        files: successFilesFirstThree,
        base64: successBase64FirstThree
      });
    } else {
      this.setState({
        ...this.state,
        files: successFiles,
        base64: successBase64
      });
    }
  };
  handleOnSubmit = e => {
    e.preventDefault();
    const { textArea, group, base64, files } = this.state;
    const { getProfileReducer, fetchSendSupportTicketIfNeeded } = this.props;
    if (getProfileReducer.data) {
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
    }
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
        errorFormat={this.state.errorFormatFile}
      />
    );
  };

  render() {
    return (
      <div>
        <Helmet title="Support" />
        <div className={globalStyles.contentBlock}>
          <div className={`container ${globalStyles.containerNoBackground}`}>
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
