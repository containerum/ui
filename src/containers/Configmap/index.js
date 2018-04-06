import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import toastr from 'toastr';

import HeaderPage from '../Header';
import FooterPage from '../Footer';
import ConfigmapListView from '../../components/ConfigmapList';
import ConfigmapForm from '../../components/ConfigmapCreateForm';

class Configmap extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      filesM: [
        {
          name: '',
          text: ''
        }
      ],
      fileName: '',
      textArea: '',
      name: '',
      files: [],
      base64: [],
      filesManualyCount: 1
    };
  }

  handleChangeFilesManualyCount = () => {
    this.setState({
      filesManualyCount: this.state.filesManualyCount + 1
    });
  };

  handleDeleteFilesManualy = () => {
    this.setState({
      fileName: '',
      textArea: ''
    });
    if (this.state.filesManualyCount > 1) {
      this.setState({
        filesManualyCount: this.state.filesManualyCount - 1
      });
    }
  };

  handleChangeTextArea = e => {
    const textArea = e.target.value;
    this.setState({
      ...this.state,
      textArea
    });
  };

  handleChangeName = value => {
    this.setState({
      ...this.state,
      name: value
    });
  };

  handleChangeFileName = value => {
    this.setState({
      ...this.state,
      fileName: value
    });
  };

  handleFiles = files => {
    const errorFiles = [];
    const successFiles = [];
    const successBase64 = [];
    // const successFilesFirstThree = [];
    // const successBase64FirstThree = [];
    Object.keys(files.fileList).filter((item, index) => {
      if (files.fileList[item].size >= 10485760) {
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
        `The following files were not downloaded because the attachment size (10 MB maximum) was exceeded:`
      );
    }

    // if (successFiles.length > 3) {
    //   toastr.error(
    //     `<div>${errorFiles.map(
    //       file => `
    // ${file.name}`
    //     )}</div>`,
    //     `You can only upload 3 files at a time`
    //   );
    // }

    // for (let i = 0; i < 3; i += 1) {
    //   successFilesFirstThree.push(successFiles[i]);
    //   successBase64FirstThree.push(successBase64[i]);
    // }

    this.setState({
      ...this.state,
      files: successFiles,
      base64: successBase64
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

  render() {
    return (
      <div>
        <Helmet title="Configmap" />
        <HeaderPage />
        <div className="container no-back">
          <div className="content-block">
            <div className="row double two-columns">
              <div className="col-md-3 col-lg-3 col-xl-2" />
              <div className="col-md-9 col-lg-9 col-xl-10">
                <div className="container container__webhook">
                  <div className="block-item">
                    <div className="block-item__title">Configmap</div>
                    <div className="row">
                      <div className="col-md-10">
                        <div className="light-text">
                          Here you can configure a ConfigMap to decouple
                          configuration artifacts from image conten
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="content-block">
                        <div className="container no-back">
                          <ConfigmapListView />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="block-item__title block-item__title_configmap-block">
                        Add configmap
                      </div>
                    </div>
                    <div className="row">
                      <div className="content-block">
                        <div className="container no-back">
                          <ConfigmapForm
                            onHandleChangeName={this.handleChangeName}
                            onHandleChangeFileName={this.handleChangeFileName}
                            name={this.state.name}
                            fileName={this.state.fileName}
                            handleFiles={files => this.handleFiles(files)}
                            files={this.state.files}
                            textArea={this.state.textArea}
                            handleChangeFilesManualyCount={
                              this.handleChangeFilesManualyCount
                            }
                            handleDeleteFilesManualy={
                              this.handleDeleteFilesManualy
                            }
                            filesM={this.state.filesM}
                            handleChangeTextArea={this.handleChangeTextArea}
                            filesManualyCount={this.state.filesManualyCount}
                            handleDeleteImage={fileName =>
                              this.handleDeleteImage(fileName)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <FooterPage />
      </div>
    );
  }
}

export default Configmap;
