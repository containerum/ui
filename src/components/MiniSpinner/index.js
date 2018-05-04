import React from 'react';

import './MiniSpinner.css';

type Props = {
  type: ?string
};

const MiniSpinner = ({ type }: Props) => (
  <span
    id="mini-spinner"
    className={
      type === 'transparency' ? 'mini-spinner-transparency' : 'mini-spinner'
    }
  >
    Loading&#8230;
  </span>
);

export default MiniSpinner;
