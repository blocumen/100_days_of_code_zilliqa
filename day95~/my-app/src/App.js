import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import ImageDetail from './components/image/ImageDetail';
import UploadImage from './components/image/UploadImage';
import Images from './components/images/Images';
import Main from './components/layout/Main';
import Navbar from './components/layout/Navbar';
import NotFound from './components/notFound/NotFound';
import store from './store';


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Main>
              <Switch>
                <Route exact path="/" component={Images} />
                <Route exact path="/uploadimage" component={UploadImage} />
                <Route exact path="/images/:index" component={ImageDetail} />
                <Route exact component={NotFound} />
              </Switch>
            </Main>
          </div>
        </Router>
      </Provider >
    )
  }
}
export default App;
