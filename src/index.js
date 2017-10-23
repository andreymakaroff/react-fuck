import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import Header from "./components/layout/Header";
import Blog from "./components/Blog/Blog";

// App
class App extends React.Component{
  constructor (props) {
   super(props);
  }
  render() {
    return (
      <div>
        <Header/>
        <Blog />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

