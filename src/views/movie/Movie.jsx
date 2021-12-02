import React, { useCallback, useEffect } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import Button from '@mui/material/Button';
import StarIcon from '@mui/icons-material/Star';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Tooltip from '@mui/material/Tooltip';
import CircularProgress from '@mui/material/CircularProgress';

import Image from '../../components/Image'
import NotFoundError from '../../components/NotFoundError'

import { getMovie, selectIsLoading, selectMovie, addToFavorite, selectFavorite, selectError } from '../../reducers/slices/content/contentSlice'

function Movie() {
  const dispatch = useDispatch()
  let { id } = useParams();

  const isLoading = useSelector(selectIsLoading)
  const error = useSelector(selectError)
  const movie = useSelector(selectMovie)
  const favorite = useSelector(selectFavorite)

  let isFavorite = false

  isFavorite = !isLoading && favorite.some((favorite) => favorite.imdbID === id)

  useEffect(() => {
    dispatch(getMovie({ id }))
  }, [id])

  const handleAddToFavorite = useCallback(
    () => {
      dispatch(addToFavorite(movie))
    },
    [movie],
  )

  if (isLoading || !movie) {
    return (
      <LoadingContainer>
        <CircularProgress color="inherit" />
      </LoadingContainer>
    )
  }

  if (!isLoading && movie && movie?.Response === "False") {
    return (
      <NotFoundError msg={movie.Error} />
    )
  }

  if (error) {
    <NotFoundError />
  }

  return (
    <>
      <Container>
        <ImageContainer>
          <Image src={movie.Poster}></Image>
        </ImageContainer>
        <DescContainer>
          <HeaderContainer>
            <Header>{movie.Title} ({movie.Year})
              {
                isFavorite ? (
                  <Tooltip title="Remove from favorite" placement="top">
                    <IconButton onClick={() => handleAddToFavorite()}>
                      <StyledFavoriteIcon fontSize="" ></StyledFavoriteIcon>
                    </IconButton>
                  </Tooltip>
                ) : (
                  <Tooltip title="Add to favorite" placement="top">
                    <IconButton onClick={() => handleAddToFavorite()}>
                      <StyledFavoriteBorderIcon fontSize="" ></StyledFavoriteBorderIcon>
                    </IconButton>
                  </Tooltip>
                )
              }
            </Header>
          </HeaderContainer>
          <Container>
            <RatingContainer>
              <Desc>IMDB rating:<StyledStar />{movie?.Ratings !== undefined && movie?.Ratings.length > 0 && movie?.Ratings[0].Value}</Desc>

            </RatingContainer>
          </Container>
          <GenreContainer>
            {
              movie?.Genre?.split(", ").map((genre) => <Genre>{genre}</Genre>)
            }
          </GenreContainer>
        </DescContainer>
      </Container>
      <AboutContainer>
        {
          movie?.Director && <div><AboutDesc>Director: </AboutDesc>{movie.Director}</div>
        }
        {
          movie?.Director && <div><AboutDesc>Writer: </AboutDesc>{movie.Writer}</div>
        }
        {
          movie?.Director && <div><AboutDesc>Stars: </AboutDesc>{movie.Actors}</div>
        }
        <div>
          <AboutDesc>About</AboutDesc>
        </div>
        <div>
          {
            movie?.Plot
          }
        </div>
      </AboutContainer>
    </>
  )
}

export default Movie

const LoadingContainer = styled.div`
  width: 100%;
  height: 78px;
  line-height: 78px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledFavoriteIcon = styled(FavoriteIcon)({
  color: "#EF8354",
  transition: "all linear 1s",
  cursor: "pointer",
  fontSize: "32px!important",
  "&:hover": {
    color: "#2D3142"
  }
});
const StyledFavoriteBorderIcon = styled(FavoriteBorderIcon)({
  color: "#EF8354",
  transition: "all linear 1s",
  cursor: "pointer",
  fontSize: "32px!important",
  "&:hover": {
    color: "red"
  }
});
const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const GenreContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const AboutDesc = styled.span`
  font-size: 1.2em;
  font-weight: 600;
`;
const AboutContainer = styled.div`
  padding-top: 40px;
  & div {
    font-size: 1.1em;
    padding: 10px 0px;
  }
`;
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const ImageContainer = styled.div`
  width: 228px;
  height: 228px;
  border-radius: 20px;
  overflow: hidden;
  
  @media (max-width: 630px) {
    flex-grow: 1;
  }
  @media (max-width: 550px) {
    width: 100%;
  }
`;
const DescContainer = styled.div`
  flex-grow: 1;
  padding: 20px 0px 20px 20px;
  position: relative;
`;
const Header = styled.div`
  font-size: 1.8em;
  font-weight: 600;
  padding-bottom: 10px;
`;
const RatingContainer = styled.div`
  width: 50%;
  padding-bottom: 20px;
  display: flex;
`;
const Desc = styled.div`
  font-weight: 600;
  font-size: 18px;
  width: 100%;
  padding-bottom: 10px;
  display: flex;
  align-items: center;
`;
const Genre = styled.div`
  display: flex;
  border: 2px solid #2D3142;
  background-color: white;
  border-radius: 20px;
  color: #2D3142;
  font-weight: 600;
  margin-right: 10px;
  padding: 5px 10px;
  font-weight: 600;
  line-height: 20px;
  width: max-content;
  text-transform: uppercase;
  cursor: default;
  &:hover {
    background-color: 'white',
  }
`
const StyledStar = styled(StarIcon)({
  color: "#EF8354",
  marginLeft: "10px"
})