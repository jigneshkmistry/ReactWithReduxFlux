import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';

class App extends React.Component {
  render() {
    return (
      <nav>
        <div className="container-fluid">
          <IndexLink to="/" activeClassName="active">Home</IndexLink>
          {" | "}
          <Link to="/courses" activeClassName="active">Courses</Link>
          {" | "}
          <Link to="/about" activeClassName="active">About</Link>
          {this.props.children}
        </div>
      </nav>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired
};

export default App;