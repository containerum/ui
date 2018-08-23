/* @flow */

import React from 'react';
import { Link } from 'react-router-dom';

import { routerLinks } from '../../config/index';
import headerStyles from '../../containers/Header/index.scss';
import styles from './index.scss';
import globalStyles from '../../theme/global.scss';

type Props = {
  type: string,
  role: string
  // handleCloseMessage: () => void
};

const InfoMessage = ({ type, role }: Props) => (
  <div
    className={`${headerStyles.headerBottom} ${styles.MessageInfoHeaderBottom}`}
  >
    <div
      className={`${headerStyles.headerBottomContainer} ${
        globalStyles.container
      } ${styles.MessageInfoHeaderBottomContainer} container`}
    >
      <div className={styles.MessageInfoHeaderBottomTextWrapper}>
        {type === 'service' &&
          role === 'admin' && (
            <Link to={routerLinks.settings} className={styles.MessageInfoItem}>
              Warning! No External IP available. Add an External IP in Settings.
            </Link>
          )}
        {type === 'service' &&
          role === 'user' && (
            <div className={styles.MessageInfoItem}>
              Warning! No External IP available. Add an External IP in Settings.
            </div>
          )}
        {type === 'volume' && (
          <Link to={routerLinks.settings} className={styles.MessageInfoItem}>
            Warning! No storage class available. Add a Storage Class in
            Settings.
          </Link>
        )}
      </div>
    </div>
  </div>
);

export default InfoMessage;
