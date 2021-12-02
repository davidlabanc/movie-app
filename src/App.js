import './App.css';
import Header from './components/Header'
import { Routes, Route } from 'react-router'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux';

import Search from './views/search/Search'
import Movie from './views/movie/Movie'
import Favorite from './views/favorite/Favorite'

import { selectMenu } from './reducers/slices/ui/uiSlice'
import { rehydrateFavorite } from './reducers/slices/content/contentSlice'
import { useEffect } from 'react'

function App() {
  const dispatch = useDispatch()
  const isShown = useSelector(selectMenu)

  useEffect(() => {
    let data = []

    if (localStorage.getItem('favorite') !== null) {
      data = JSON.parse(localStorage.getItem('favorite'))
    }

    if (Array.isArray(data) && data.length > 0) {
      dispatch(rehydrateFavorite(data))
    }
  }, [])

  let routes = (
    <Routes>
      <Route exact path="/search" element={<Search />} />
      <Route exact path="/movie/:id" element={<Movie />} />
      <Route exact path="/" element={<Favorite />} />
    </Routes>
  )

  return (
    <div className="App">
      <Header></Header>
      <Container show={isShown}>
        {routes}
      </Container>
    </div>
  );
}

export default App;

const Container = styled.div`
  ${props => props.show ? `
    margin-left: 20vw;

    @media (max-width: 1400px) {
      margin-left: 25vw;
    }

    @media (max-width: 1150px) {
      margin-left: 33vw;
    }
  ` : `
    margin-left:  100px;
  `};
  padding: 1px;
  border-radius: 20px;
  background-color: white;
  min-height: calc(100vh - 100px);
  padding: 40px;
  transition: all ease-in-out .2s;
  
  @media (max-width: 930px) {
    width: 100%auto;
    margin: 78px 0px 0px 0px;
    border-radius: 0px;
  }
`;
