import React from 'react'
import styled from 'styled-components'

import CircularProgress from '@mui/material/CircularProgress';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';

import { useProgressiveImage } from "../common/image-hook";

function Image({ src }) {
  const { image } = useProgressiveImage(src)

  if (src === "N/A") {
    return (
      <LoadingContainer>
        <ImageNotSupportedIcon style={{ fontSize: "96px" }}>
      </ImageNotSupportedIcon></LoadingContainer>
    )
  }

  if (image) {
    return (
      <Container src={src}></Container>
    )
  } else {
    return (
      <LoadingContainer><CircularProgress color="inherit" /></LoadingContainer>
    )
  }

}

export default Image

const LoadingContainer = styled.div`
  width: 100%;
  aspect-ratio: 1/1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  background-color: black;
  width: 100%;
  aspect-ratio: 1/1;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
`;