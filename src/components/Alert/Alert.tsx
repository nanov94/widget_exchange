import React, { Component } from "react";
import { AlertTypes } from "../../constants";
import Alert from '@material-ui/lab/Alert';

import './Alert.scss';

interface AlertProps {
  type: AlertTypes,
  message: string;
  closeAction: () => void;
}

export default class AlertComponent extends Component<AlertProps> {
  render() {
    const { type, message, closeAction } = this.props;

    return (
      <div className='wrapToastNotification'>
        <Alert className='toastNotification' onClose={ () => closeAction() } severity={ type }> 
          { message }
        </Alert>
      </div>
    );
  }
}