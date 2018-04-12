import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

type Props = {
  configMapsFileData: Array<Object>,
  currentFile: string
};
const ConfigMapFile = ({ configMapsFileData, currentFile }: Props) => {
  const text = configMapsFileData[currentFile];
  return (
    <div>
      <div className="light-text__cfm">{currentFile}</div>
      <Scrollbars
        universal
        autoHide
        style={{ width: '100%', height: '281px' }}
        renderThumbVertical={({ style, ...props }) => (
          <div
            {...props}
            style={{
              ...style,
              backgroundColor: 'rgba(246, 246, 246, 0.3)',
              borderRadius: '4px'
            }}
          />
        )}
        renderThumbHorizontal={({ style, ...props }) => (
          <div
            {...props}
            style={{
              ...style,
              backgroundColor: 'rgba(246, 246, 246, 0.3)',
              borderRadius: '4px'
            }}
          />
        )}
        renderView={props => <div {...props} className="log-data__cfm" />}
      >
        <pre
          style={{
            color: '#008080'
          }}
        >
          {text}
        </pre>
      </Scrollbars>
    </div>
  );
};

export default ConfigMapFile;
