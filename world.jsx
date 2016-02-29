import React from 'react';
import ReactDOM from 'react-dom';

class World extends React.Component {
  render() {
    const x = [ 'u', 'v' ]
    const a = [
      'a', 'b', ...x, 'c', 'd',
    ]

    return (
      <div>
        { a.map (i => <p>{ `Ligne ${i.toUpperCase ()}` }</p>) }
      </div>
    )
  }
}

ReactDOM.render(<World/>, document.getElementById('world'));
