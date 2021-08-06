import './App.css';
import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Container } from '@material-ui/core';
import MainNav from './Components/MainNav/MainNav';
import Header from './Components/Header/Header';
import ScrollUpButton from './Components/MainDashBoard/ScrollUpButton/ScrollUpButton'
const Trending = React.lazy(() => import('./Pages/Trending/Trending'))
const Movies = React.lazy(() => import('./Pages/Movies/Movies'))
const TvSeries = React.lazy(() => import('./Pages/TvSeries/TvSeries'))
const Search = React.lazy(() => import('./Pages/Search/Search'))

function App() {

  const [visible, setVisible] = useState(false)
  const toggleVisible = () => {
    if (window.pageYOffset > 300) setVisible(true)
    else setVisible(false);
  }
  useEffect(() => {
    window.addEventListener('scroll', toggleVisible);
    return () => {
      window.removeEventListener('scroll', toggleVisible);
    };
  }, [])
  return (
    <>
      <BrowserRouter>
        <Header></Header>
        <div className="main-app">
          <Container>
            <Suspense fallback={<span>Loading...</span>}>
              <Switch>
                <Route path='/' component={Trending} exact />
                <Route path='/movies' component={Movies}/>
                <Route path='/tv-series' component={TvSeries} />
                <Route path='/search' component={Search} />
              </Switch>
            </Suspense>
          </Container>
        </div>
        <MainNav></MainNav>
        {visible ? <ScrollUpButton /> : null}
      </BrowserRouter>
    </>
  );
}

export default App;
