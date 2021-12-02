import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Image from '../components/Image'

function Movie({ src, header = '', desc = '', to = '' }) {
  return (
    <Container to={to}>
      <Image src={src} />
      <Header>{header}</Header>
      <Description>{desc}</Description>
    </Container>
  )
}

export default Movie

const Container = styled(Link)`
  display: block;
  width: 23%;
  padding: 20px;
  box-shadow: 0px 7px 14px -3px rgb(0 0 0 / 15%);
  border-radius: 14px;
  box-sizing: border-box;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  margin: 0px 1%;

  @media (max-width: 1150px) {
    width: 31%;
  }

  @media (max-width: 780px) {
    width: 48%;
  }
  @media (max-width: 500px) {
    width: 100%;
  }
`;
const Header = styled.div`
  padding: 10px 0px 5px 0px;
  font-weight: 600;
  font-size: 18px;

  &:first-letter{
    text-transform: uppercase;
  }
`;
const Description = styled.div`
  font-size: 14px;
  color: #808080;
`;