import React from 'react';

import styles from './index.scss';

const SelectNamespaceModal = () => (
  <div
    className="modal fade show"
    id="redis"
    tabIndex="-1"
    role="dialog"
    aria-labelledby="modalLabel"
    aria-hidden="true"
    style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
  >
    <div className={`modal-dialog ${styles.runSolutionModal}`} role="document">
      <div className={`modal-content ${styles.runSolutionModalContent}`}>
        <div className={`modal-header ${styles.runSolutionModalHeader}`}>
          <div className="modal-header-title">Solution Name 2.0</div>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className={`modal-body ${styles.runSolutionModalBody}`}>
          <button
            className="white-btn modal-body-cancel-btn"
            data-dismiss="modal"
          >
            Cancel
          </button>
          <button className="white-btn prev-btn">Previous</button>
          <div className="box">
            <div className="progress">
              <div className="bar">
                <div className="bar__fill" />
              </div>
              <div className="point point--active">
                <div className="bullet" />
                <label className="label">Have to</label>
              </div>
              <div className="point">
                <div className="bullet" />
                <label className="label">Optionals</label>
              </div>
              <div className="point">
                <div className="bullet" />
                <label className="label">RESULTS</label>
              </div>
            </div>
          </div>
          <button
            style={{ padding: '4px 27px' }}
            className="blue-btn modal-body-next-btn"
          >
            NEXT
          </button>
          <button className="blue-btn deploy-btn">DEPLOY</button>
        </div>

        <div
          className={`modal-main-content ${styles.runSolutionModalMainContent}`}
        >
          <ul className={`modal-list ${styles.runSolutionModalModalList}`}>
            <li>
              <a href="##" className="active">
                Profile
              </a>
            </li>
          </ul>
          <div className="main-content">
            <div className="main-content-title">Enviroments</div>

            <div className="input-box">
              <label className="add-funds-input-label" htmlFor="text">
                Name
              </label>
              <input
                className={`${styles.modalInput} form-control add-funds-input`}
                id="text"
                type="text"
                placeholder="Admin Name Admin NameAdmin Name"
              />
              <div className="helper-text">
                Your Deployment name can only contain alphanumeric and
                characters
              </div>
            </div>

            <div className="input-box">
              <label className="add-funds-input-label" htmlFor="text">
                Name
              </label>
              <input
                className={`${styles.modalInput} form-control add-funds-input`}
                id="text"
                type="text"
                placeholder="Admin Name Admin NameAdmin Name"
              />
              <div className="helper-text">
                Your Deployment name can only contain alphanumeric and
                characters
              </div>
            </div>

            <div className="input-box">
              <label className="add-funds-input-label" htmlFor="text">
                Name
              </label>
              <input
                className={`${styles.modalInput} form-control add-funds-input`}
                id="text"
                type="text"
                placeholder="Admin Name Admin NameAdmin Name"
              />
              <div className="helper-text">
                Your Deployment name can only contain alphanumeric and
                characters
              </div>
            </div>

            <div className="main-content-title">Heading Label</div>

            <div className="input-box">
              <label className="add-funds-input-label" htmlFor="text">
                Name
              </label>
              <input
                className={`${styles.modalInput} form-control add-funds-input`}
                id="text"
                type="text"
                placeholder="Admin Name Admin NameAdmin Name"
              />
              <div className="helper-text">
                Your Deployment name can only contain alphanumeric and
                characters
              </div>
            </div>

            <div className="input-box">
              <input
                className={`${styles.modalInput} form-control add-funds-input`}
                id="text"
                type="text"
                placeholder="Input"
              />
              <div className="helper-text">
                Your Deployment name can only contain alphanumeric and
                characters
              </div>
            </div>

            <div className="input-box">
              <input
                className={`${styles.modalInput} form-control add-funds-input`}
                id="text"
                type="text"
                placeholder="Input"
              />
              <div className="helper-text">
                Your Deployment name can only contain alphanumeric and
                characters
              </div>
            </div>

            <div className="input-box">
              <label className="add-funds-input-label" htmlFor="text">
                Name
              </label>
              <input
                className={`${styles.modalInput} form-control add-funds-input`}
                id="text"
                type="text"
                placeholder="Admin Name Admin NameAdmin Name"
              />
              <div className="helper-text">
                Your Deployment name can only contain alphanumeric and
                characters
              </div>
            </div>
          </div>
        </div>
        <div className="modal-main-content-second-page">
          <ul className="modal-list">
            <li>
              <a href="##" className="active">
                Profile
              </a>
            </li>
            <li>
              <a href="##">Password</a>
            </li>
            <li>
              <a href="##">Tokens</a>
            </li>
            <li>
              <a href="##">CLI</a>
            </li>
            <li>
              <a href="##">Company account</a>
            </li>
            <li>
              <a href="##">E-mail subscriptions</a>
            </li>
            <li>
              <a href="##">Delete Account</a>
            </li>
          </ul>
          <div className="main-content">
            <div className="main-content-title">Enviroments</div>

            <div className="input-box">
              <label className="add-funds-input-label" htmlFor="text">
                Name
              </label>
              <input
                className={`${styles.modalInput} form-control add-funds-input`}
                id="text"
                type="text"
                placeholder="Admin Name Admin NameAdmin Name"
              />
              <div className="helper-text">
                Your Deployment name can only contain alphanumeric and
                characters
              </div>
            </div>

            <div className="input-box">
              <label className="add-funds-input-label" htmlFor="text">
                Name
              </label>
              <input
                className={`${styles.modalInput} form-control add-funds-input`}
                id="text"
                type="text"
                placeholder="Admin Name Admin NameAdmin Name"
              />
              <div className="helper-text">
                Your Deployment name can only contain alphanumeric and
                characters
              </div>
            </div>

            <div className="input-box">
              <label className="add-funds-input-label" htmlFor="text">
                Name
              </label>
              <input
                className={`${styles.modalInput} form-control add-funds-input`}
                id="text"
                type="text"
                placeholder="Admin Name Admin NameAdmin Name"
              />
              <div className="helper-text">
                Your Deployment name can only contain alphanumeric and
                characters
              </div>
            </div>

            <div className="main-content-title">Heading Label</div>

            <div className="input-box">
              <label className="add-funds-input-label" htmlFor="text">
                Name
              </label>
              <input
                className={`${styles.modalInput} form-control add-funds-input`}
                id="text"
                type="text"
                placeholder="Admin Name Admin NameAdmin Name"
              />
              <div className="helper-text">
                Your Deployment name can only contain alphanumeric and
                characters
              </div>
            </div>

            <div className="input-box">
              <input
                className={`${styles.modalInput} form-control add-funds-input`}
                id="text"
                type="text"
                placeholder="Input"
              />
              <div className="helper-text">
                Your Deployment name can only contain alphanumeric and
                characters
              </div>
            </div>

            <div className="input-box">
              <input
                className={`${styles.modalInput} form-control add-funds-input`}
                id="text"
                type="text"
                placeholder="Input"
              />
              <div className="helper-text">
                Your Deployment name can only contain alphanumeric and
                characters
              </div>
            </div>

            <div className="input-box">
              <label className="add-funds-input-label" htmlFor="text">
                Name
              </label>
              <input
                className={`${styles.modalInput} form-control add-funds-input`}
                id="text"
                type="text"
                placeholder="Admin Name Admin NameAdmin Name"
              />
              <div className="helper-text">
                Your Deployment name can only contain alphanumeric and
                characters
              </div>
            </div>
          </div>
        </div>

        <div className="modal-main-content-error-page">
          <div className="status-message-error">error</div>
          <div className="message-text">
            Containerization gained prominence with the open source Docker,
            which developed a method to give containers better portability --
            allowing them to be moved among any system that shares the host OS
            type without requiring code changes. With Docker containers, there
            are no guest OS environment.
          </div>
          <div className="table-title">Deployments</div>
          <table className="table modal-table" width="1170">
            <thead>
              <tr>
                <td className="" />
                <td className="w-30">Name</td>
                <td className="w-25">Port</td>
                <td className="w-50">TCP/UDP</td>
              </tr>
            </thead>
            <tbody>
              <tr className="">
                <td className="">
                  <img alt="img" src="img/cube-3.png" />
                </td>
                <td className="">Redis-django-123456789-7fns</td>
                <td className="">80:500</td>
                <td className="">TCP</td>
              </tr>
              <tr className="">
                <td className="border-bot">
                  <img alt="img" src="img/cube-3.png" />
                </td>
                <td className="border-bot">Redis-django-123456789-7fns</td>
                <td className="border-bot">13456:14600</td>
                <td className="border-bot">UDP</td>
              </tr>
            </tbody>
          </table>

          <div className="table-title">Services</div>
          <table className="table modal-table" width="1170">
            <thead>
              <tr>
                <td className="" />
                <td className="w-30">Name</td>
                <td className="w-25">Port</td>
                <td className="w-50">TCP/UDP</td>
              </tr>
            </thead>
            <tbody>
              <tr className="">
                <td className="">
                  <img alt="img" src="img/cube-3.png" />
                </td>
                <td className="">Redis-django-123456789-7fns</td>
                <td className="">80:500</td>
                <td className="">TCP</td>
              </tr>
              <tr className="">
                <td className="border-bot">
                  <img alt="img" src="img/cube-3.png" />
                </td>
                <td className="border-bot">Redis-django-123456789-7fns</td>
                <td className="border-bot">13456:14600</td>
                <td className="border-bot">UDP</td>
              </tr>
            </tbody>
          </table>

          <div className="error-page-btn-wrap">
            <button className="white-btn white-btn-error">SUPPORT</button>
            <button className="blue-btn white-btn-error">RESTART</button>
          </div>
        </div>
        <div className="modal-main-content-success-page">
          <div className="status-message-success">success</div>
          <div className="message-text">
            <a href="##">Continue to the project overview</a> to … open source
            Docker, which developed a method to give containers better
            portability -- allowing them to be moved among any system that
            shares the host OS type without requiring code changes. With Docker
            containers, there are no guest OS environment.
          </div>
          <div className="table-title">Deployments</div>
          <table className="table modal-table" width="1170">
            <thead>
              <tr>
                <td className="" />
                <td className="w-30">Name</td>
                <td className="w-25">Port</td>
                <td className="w-50">TCP/UDP</td>
              </tr>
            </thead>
            <tbody>
              <tr className="">
                <td className="">
                  <img alt="img" src="img/cube-3.png" />
                </td>
                <td className="">Redis-django-123456789-7fns</td>
                <td className="">80:500</td>
                <td className="">TCP</td>
              </tr>
              <tr className="">
                <td className="border-bot">
                  <img alt="img" src="img/cube-3.png" />
                </td>
                <td className="border-bot">Redis-django-123456789-7fns</td>
                <td className="border-bot">13456:14600</td>
                <td className="border-bot">UDP</td>
              </tr>
            </tbody>
          </table>

          <div className="table-title">Services</div>
          <table className="table modal-table" width="1170">
            <thead>
              <tr>
                <td className="" />
                <td className="w-30">Name</td>
                <td className="w-25">Port</td>
                <td className="w-50">TCP/UDP</td>
              </tr>
            </thead>
            <tbody>
              <tr className="">
                <td className="">
                  <img alt="img" src="img/cube-3.png" />
                </td>
                <td className="">Redis-django-123456789-7fns</td>
                <td className="">80:500</td>
                <td className="">TCP</td>
              </tr>
              <tr className="">
                <td className="border-bot">
                  <img alt="img" src="img/cube-3.png" />
                </td>
                <td className="border-bot">Redis-django-123456789-7fns</td>
                <td className="border-bot">13456:14600</td>
                <td className="border-bot">UDP</td>
              </tr>
            </tbody>
          </table>

          <div className="error-page-btn-wrap">
            <button className="white-btn white-btn-success">
              APPLICATION PAGE
            </button>
            <button className="blue-btn white-btn-success">
              open application
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default SelectNamespaceModal;
