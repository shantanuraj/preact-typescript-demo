/**
 * Stub
 */

'use strict';

import {
  h,
  render,
  Component,
} from 'preact';

class MyClock extends Component<{}, {}> {
  render() {
    const time = new Date().toLocaleDateString();
    return (
      <span>
        {time}
      </span>
    );
  }
}

render(<MyClock />, document.body);