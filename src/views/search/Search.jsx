import React, { useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components'
import { throttle } from 'lodash';

import Movie from '../../components/Movie'

import {
  selectText,
  getSearchContent,
  selectContent
} from '../../reducers/slices/search/searchSlice';

function Search() {
  const dispatch = useDispatch()
  const searchText = useSelector(selectText);
  const content = useSelector(selectContent);

  useEffect(() => {
    if (searchText.length > 2) {
      throttled(searchText)
    }
  }, [searchText])

  const throttled = useCallback(
    throttle((value) => {
      dispatch(getSearchContent({ term: value }))
    }, 1000),
    []
  );

  return (
    <div>
      <Header>Looking for {searchText} </Header>
      <MovieContainer>
        {
          content?.Search?.length > 0 && content.Search.map((item) => (
            <Movie key={item.imdbID} src={item.Poster} header={item.Title} desc={item.Year} to={"/movie/" + item.imdbID} />
          ))
        }
      </MovieContainer>
    </div>
  )
}

export default Search

const MovieContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Header = styled.div`
  font-size: 28px;
  font-weight: 600;

`;
