import React, { Component } from 'react';
import {
  findNodeHandle,
  UIManager,
  ViewPropTypes,
  requireNativeComponent,
  ViewProps,
} from 'react-native';
import PropTypes from 'prop-types';

type NativeEventObject = {
  nativeEvent: any;
};
type LiveViewProps = {
  streamUrl?: string;
  streamKey?: string;

  onViewStatus?: (detail: NativeEventObject) => any;
  onViewError?: (detail: NativeEventObject) => any;
  initBroadcastView?: () => void;

  startPublish?: () => void;
  stopPublish?: () => void;
  toggleCamera?: () => void;

  onDidMount?: () => void;
} & ViewProps;

export type RtmpStatusType = {
  code: string;
  description: string;
};

let HaishinkitView = requireNativeComponent<HaishinkitLive>('HaishinkitView');

class HaishinkitLive extends Component<LiveViewProps> {
  static propTypes: any;

  componentDidMount() {
    setTimeout(() => {
      if (this.props.onDidMount) this.props.onDidMount();
    }, 0);
  }

  broadcastViewCmd = (cmdName: string, cmdArgs?: any[]) => {
    try {
      UIManager.dispatchViewManagerCommand(
        findNodeHandle(this),
        UIManager.getViewManagerConfig('HaishinkitView').Commands[cmdName],
        cmdArgs
      );
    } catch (e) {
      console.error(e);
      return;
    }
  };

  _onViewStatus = (event: NativeEventObject) => {
    if (!this.props.onViewStatus) {
      return;
    }

    this.props.onViewStatus!(event.nativeEvent);
  };

  _onViewError = (event: NativeEventObject) => {
    if (!this.props.onViewStatus) {
      return;
    }
    this.props.onViewError!(event.nativeEvent);
  };

  startPublish = () => this.broadcastViewCmd('startPublish');

  stopPublish = () => this.broadcastViewCmd('stopPublish');

  toggleCamera = () => this.broadcastViewCmd('toggleCamera');

  render() {
    return <HaishinkitView {...this.props} />;
  }
}

HaishinkitLive.propTypes = {
  streamUrl: PropTypes.string,
  streamKey: PropTypes.string,
  onViewStatus: PropTypes.func,
  onViewError: PropTypes.func,
  startPublish: PropTypes.func,
  stopPublish: PropTypes.func,
  changeCamera: PropTypes.func,
  scaleX: PropTypes.number,
  scaleY: PropTypes.number,
  translateX: PropTypes.number,
  translateY: PropTypes.number,
  rotation: PropTypes.number,
  ...ViewPropTypes,
};

export default HaishinkitLive;
