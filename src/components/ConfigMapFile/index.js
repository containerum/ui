import React from 'react';

type Props = {
  configMapsFileData: Array<Object>
};
const ConfigMapFile = ({ configMapsFileData }: Props) => {
  console.log(configMapsFileData);
  return (
    <div className="content-block">
      <div className="container no-back">
        <div>HI</div>
      </div>
    </div>
  );
};

export default ConfigMapFile;
