import React, { createRef } from 'react';
import { ScrollViewDefaultProps } from 'recyclerlistview/dist/web/core/scrollcomponent/BaseScrollView';
import ScrollViewer from 'recyclerlistview/dist/web/platform/web/scrollcomponent/ScrollViewer';

const rem     = 16;
const remRate = 40;
const vwRate  = 0.8;
const laptop  = 1280;

const largeMarginRate = 0.1;
const smallMarginRate = 0.01;

// https://codesandbox.io/s/r59m96851q?file=/src/Hello.js
interface scrollInputProps {
  x: number;
  y: number;
  animated: boolean;
}
class ExternalScrollview extends React.Component<ScrollViewDefaultProps, {}> {
  componentDidMount() {
    window.addEventListener("resize", this.handleLayout);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleLayout);
  }

  handleLayout = () => {
    const windowWidth = window.innerWidth;
    const ScrollWidth = windowWidth >= laptop
                      ? rem         * (remRate - largeMarginRate)
                      : windowWidth * (vwRate  - smallMarginRate);
    console.log(window.innerWidth);
    this.props.onSizeChanged({
      height: window.innerHeight,
      width:  ScrollWidth
    });
  };

  scrollRef = createRef<ScrollViewer>();
  scrollTo = (arg: scrollInputProps) => {
    this.scrollRef.current?.scrollTo(arg);
  };
  render() {
    return <ScrollViewer ref={this.scrollRef} {...this.props} />;
  }
}

export default ExternalScrollview;
