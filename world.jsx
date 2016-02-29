import React from 'react';
import ReactDOM from 'react-dom';

class World extends React.Component {
  render() {
    const x = [ 'u', 'v' ]
    const a = [
      'a', 'b', ...x, 'c', 'd',
    ]

    return (
      <ul>
        { a.map (i => <li>{ `Ligne ${i.toUpperCase ()}` }</li>) }
      </ul>
    )
  }
}

ReactDOM.render(<World/>, document.getElementById('world'));
