import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux';

import Movie from '../../components/Movie';

import { selectFavorite } from '../../reducers/slices/content/contentSlice';

function Favorite() {
  const movies = useSelector(selectFavorite)

  return (
    <>
      <Header>Your favorite movies </Header>
      <MovieContainer>
        {
          movies.length > 0 ? movies.map((item) => (
            <Movie key={item.imdbID} src={item.Poster} header={item.Title} desc={item.Year} to={"/movie/" + item.imdbID} />
          )) : <NoMovies>You have no movies in your library.</NoMovies>
        }
      </MovieContainer>
    </>
  )
}

export default Favorite

const NoMovies = styled.div`
  font-size: 24px;
`;

const MovieContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const Header = styled.div`
  font-size: 32px;
  font-weight: 600;
  padding: 20px 0px;
`;