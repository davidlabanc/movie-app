import React from 'react'
import styled from 'styled-components'

function NotFoundError({msg = "Something went wrong!"}) {
  return (
    <Container>
      <HeaderStatus>404 Not found</HeaderStatus> 
      <HeaderDescription>{msg}</HeaderDescription>
    </Container>
  )
}

export default NotFoundError

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const HeaderStatus = styled.div`
  color: #2d3142;
  font-weight: 600;
  font-size: 72px;
  padding: 20px;
`;
const HeaderDescription = styled.div`
  font-size: 36px;
  padding: 20px;
`;