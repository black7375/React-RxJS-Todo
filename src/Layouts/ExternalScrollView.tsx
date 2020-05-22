import React, { createRef } from 'react';
import { Subscription, fromEvent } from 'rxjs';
import { ScrollViewDefaultProps } from 'recyclerlistview/dist/web/core/scrollcomponent/BaseScrollView';
import ScrollViewer from 'recyclerlistview/dist/web/platform/web/scrollcomponent/ScrollViewer';

// Response
const rem     = 16;
const remRate = 40;
const vwRate  = 0.8;
const laptop  = 1280;

const marginRate = 3;

// Event
const resize$ = fromEvent(window, "resize");

// https://codesandbox.io/s/r59m96851q?file=/src/Hello.js
interface scrollInputProps {
  x: number;
  y: number;
  animated: boolean;
}
class ExternalScrollview extends React.Component<ScrollViewDefaultProps, {}> {
  resize?: Subscription;
  componentDidMount() {
    this.resize = resize$.subscribe(this.handleLayout);
  }

  componentWillUnmount() {
    this.resize!.unsubscribe();
  }

  handleLayout = (e: Event) => {
    const windowWidth = window.innerWidth;
    const ScrollWidth = windowWidth >= laptop
                      ? rem         * remRate - marginRate
                      : windowWidth * vwRate  - marginRate;
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
