import React, { Component } from "react";

export default class OpenViduVideoComponent extends Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }

  componentDidUpdate(props) {
    if (props && !!this.videoRef) {
      this.props.streamManager.addVideoElement(this.videoRef.current);
      let media = this.videoRef.current;
      this.props.volume && (media.volume = this.props.volume);
    }
  }

  componentDidMount() {
    if (this.props && !!this.videoRef) {
      this.props.streamManager.addVideoElement(this.videoRef.current);
      let media = this.videoRef.current;
      this.props.volume && (media.volume = this.props.volume);
    }
  }

  render() {
    return (
      <video
        style={{ height: "100%", width: "100%", borderRadius: "8px" }}
        autoPlay={true}
        muted={this.props.muted}
        ref={this.videoRef}
      />
    );
  }
}
