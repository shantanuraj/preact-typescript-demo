/**
 * Stub
 */

'use strict';

import {
  h,
  render,
  Component,
} from 'preact';

interface State {
  time: number;
}

class Clock extends Component<{}, State> {
  timer: number;

  constructor() {
    super();
    this.state = {
      time: Date.now(),
    };
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({ time: Date.now() });
    }, 1000);
  }

  render() {
    const time = new Date(this.state.time).toLocaleTimeString();
    return (
      <div class="Time">
        <span class="Time-text">
          {time}
        </span>
      </div>
    );
  }
}

render(<Clock />, document.body);