import React, { useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { useNavigate } from "react-router-dom";

import logo from '../logo.svg'

import FavoriteIcon from '@mui/icons-material/Favorite';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';

import { selectMenu, handleToggleMenu, setMenu } from '../reducers/slices/ui/uiSlice';
import { handleSearchChange, selectText } from '../reducers/slices/search/searchSlice';

function Header() {
  const [display, setDisplay] = useState(false)
  const [blocked, setBlocked] = useState(false)

  const dispatch = useDispatch()
  const isShown = useSelector(selectMenu)
  const searchText = useSelector(selectText)

  let navigate = useNavigate()

  const handleShow = useCallback(
    () => {
      dispatch(handleToggleMenu())
      setBlocked(!blocked)
    },
    [blocked],
  )

  const handleSearchClick = useCallback(
    () => {
      navigate("/search")
      setBlocked(true)
    },
    [],
  )

  const handleChange = useCallback(
    (value) => {
      dispatch(handleSearchChange(value))
    }
  )

  return (
    <Container show={isShown}>
      <SideMenu>
        <IconContainer onClick={() => handleShow()}>
          <MenuIconContainer>
            {
              !isShown
                ? <MenuIcon fontSize="inherit" />
                : <CloseIcon fontSize="inherit" />
            }
          </MenuIconContainer>
        </IconContainer>
        <Line />
        <StyledLink to="/">
          <IconContainer
            onMouseEnter={() => dispatch(setMenu(true))}
            onMouseLeave={() => !blocked && dispatch(setMenu(false))}>
            <FavoriteIcon fontSize="inherit" />
            <IconText>Favorite</IconText>
          </IconContainer>
        </StyledLink>
        <IconContainer
          onMouseEnter={() => dispatch(setMenu(true))}
          onMouseLeave={() => !blocked && dispatch(setMenu(false))}>
          <SearchIcon fontSize="inherit" />
          <IconText>
            <StyledTextField
              id="standard-basic"
              label="Search"
              variant="standard"
              value={searchText}
              onClick={() => handleSearchClick()}
              onChange={(event) => handleChange(event.target.value)} />
          </IconText>
        </IconContainer>
      </SideMenu>
      <HeaderMenu>
        <Logo src={logo} alt="logo"></Logo>
        <div style={{ display: "flex" }}>
          <HeaderMenuItem onClick={() => setDisplay(!display)}>Search</HeaderMenuItem>
          <HeaderMenuItemLink to="/">Favorite</HeaderMenuItemLink>
          <IconsContainer>
            <IconContainerHeader onClick={() => setDisplay(!display)}>
              <SearchIcon fontSize="inherit" />
            </IconContainerHeader>
            <StyledLink to="/">
              <IconContainerHeader>
                <FavoriteIcon fontSize="inherit" />
              </IconContainerHeader>
            </StyledLink>
          </IconsContainer>
        </div>
      </HeaderMenu>
      <SearchMenu display={display.toString()}>
        <StyledSearch
          id="input-with-sx"
          label="Search"
          variant="outlined"
          size="small"
          value={searchText}
          onChange={(event) => handleChange(event.target.value)}
          InputLabelProps={{ style: { marginBottom: 8 } }}
        >
        </StyledSearch>
      </SearchMenu>
      <div></div>
    </Container>
  )
}

export default Header

const IconContainerHeader = styled.div`
  font-size: inherit;
  padding: 0px 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  &:hover {
    text-decoration:underline;
  }
`;

const IconsContainer = styled.div`
  display: none;
  @media (max-width: 650px) {
    display: flex;
  }
`;

const Line = styled.div`
  border-top: 1px solid#575a68;
  height: 1px;
  margin: 20px 0px;
  width: 100%;
`;

const Logo = styled.img`
  max-width: 100%;
`;
const SearchMenu = styled.div`
  border-top: 1px solid#575a68;
  position: fixed;
  top: 78px;
  left: 0px;
  bottom: 0px;
  width: 100%;
  height: 78px;
  background-color: #2D3142;
  display: none;
  align-items: center;
  justify-content: center;
  z-index:1;
  transition: all ease-in-out .2s;
  ${props => props.display === "true" ? `top: 78px;` : `top: 0px;`}
  @media (max-width: 930px) {
    display: flex;
  }
`;

const StyledSearch = styled(TextField)({
  '& .MuiInputBase-input': {
    color: 'white',
    display: 'block',
  },
  '& label': {
    paddingBottom: 8,
    color: '#959EAC'
  },
  '& label.Mui-focused': {
    color: '#EF8354',
  },
  '& .MuiOutlinedInput-root': {
    width: '100%',
    borderRadius: 10,
    paddingRight: 0,

    '& fieldset': {
      boxSizing: 'border-box',
      paddingRight: 0,
      width: '100%',
      borderColor: '#959EAC',
      color: '#959EAC'
    },
    '&:hover fieldset': {
      borderColor: '#959EAC',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#EF8354',
    },
  },
});

const HeaderMenuItemLink = styled(Link)`
  color: white;
  font-size: 24px;
  line-height: 78px;
  text-decoration: none;
  @media (max-width: 650px) {
    display: none;
  }
  &:hover {
    text-decoration: underline;
  }
`;

const HeaderMenuItem = styled.div`
  color: white;
  font-size: 24px;
  line-height: 78px;
  padding: 0px 20px;
  cursor: pointer;
  @media (max-width: 650px) {
    display: none;
  }
  &:hover {
    text-decoration: underline;
  }
`;

const HeaderMenu = styled.div`
  display: none;
  z-index: 2;
  background-color: #2D3142;
  @media (max-width: 930px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0px 50px;
  }

  @media (max-width: 500px) {
    padding: 0px 20px;
  }
`;

const SideMenu = styled.div`
  display: block;
  @media (max-width: 930px) {
    display: none;
  }
`;

const MenuIconContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;

  @media (max-width: 930px) {
    justify-content: flex-start;
  }
`;

const StyledTextField = styled(TextField)({
  width: "100%",
  fontSize: "24px",
  color: 'white',
  cursor: "default",

  '& .MuiInputBase-input': {
    color: 'white',
    display: 'block',
  },
  '& label': {
    color: 'white',
    fontSize: "24px",
    lineHeight: "24px",
    marginTop: "0px!important",
  },
  '& label.Mui-focused': {
    color: 'white',
    fontSize: "inherit!important",
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#EF8354',
  },
  '& .MuiInput-root:hover:before': {
    borderBottom: "2px solid white !important",
  },
  '& .MuiInput-root:before': {
    borderBottom: "0px solid white",
  },
  '& .MuiInput-root:active': {
    borderBottom: "1px solid #EF8354",
  },
  '& label.Mui-focused': {
    color: '#EF8354',
    borderColor: '#EF8354',
  },

  '& .MuiOutlinedInput-root': {
    width: '100%',
    borderRadius: 10,
    paddingRight: 0,

    '& fieldset': {
      boxSizing: 'border-box',
      paddingRight: 0,
      width: '100%',
      borderColor: '#959EAC',
      color: '#959EAC'
    },
    '&:hover fieldset': {
      borderColor: '#959EAC',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#EF8354',
    },
  },
});

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  display: inherit;
`;

const IconText = styled.div`
  padding-left: 10px;
  line-height: 38px;
  visibility: hidden;
  transition: visibility ease-in .2s;
  font-size: 24px;
  justify-content: flex-end;
`;

const IconContainer = styled.div`
  font-size: inherit;
  padding: 10px 31px;
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  &:hover {
    text-decoration:underline;
  }
`;

const Container = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  bottom: 0px;
  width: 5%;
  min-width: 100px;
  background-color: #2D3142;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 38px;
  padding: 20px 0px;
  transition: all ease-in-out .2s;
  overflow: hidden;
  z-index: 2;


  
  @media (max-width: 930px) {
    height: 78px;
    width: 100%!important;
    right: 0px;
    flex-direction: row;
    padding: 0px;
  }

  ${props => props.show && `
    width: 20%;

    @media (max-width: 1400px) {
      width: 25%;
    }

    @media (max-width: 1150px) {
      width: 33%;
    }
    
    & ${IconText} {
      visibility: visible;
    }
  `};

`;
