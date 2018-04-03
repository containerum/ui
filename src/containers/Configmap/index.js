import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';

import HeaderPage from '../Header';
import FooterPage from '../Footer';
import ConfigmapListView from '../../components/ConfigmapList';
import ConfigmapForm from '../../components/ConfigmapCreateForm';

class Configmap extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      isValidName: false
    };
  }

  handleChangeName = value => {
    this.setState({
      ...this.state,
      name: value,
      isValidName: true
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
                            name={this.state.name}
                            valid={this.state.isValidName}
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
