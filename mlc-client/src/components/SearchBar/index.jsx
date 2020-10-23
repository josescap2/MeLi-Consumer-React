import React from 'react';
import { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import FilterListIcon from '@material-ui/icons/FilterList';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function SearchAppBar({setProducts, setCache, cache, setFilter, filter, av}) {
  // USE STYLES
  const classes = useStyles();

  // HOOKS
  const [query, setQuery] = useState("");
  const [anchor, setAnchor] = useState(null);

  function handleClick(event) {
    setAnchor(event.currentTarget);
  }

  function handleClose() {
    setAnchor(null);
  }

  function handleInputChange(e) {
    setQuery(e.target.value);
  }
  
  function handleOnSubmit() {
    setFilter('noFilter');
    fetchProducts();
  }

  function handleSetFilter(value) {
    setFilter(value);
    if (av)
      setProducts([...cache[query][value]]);
    setAnchor(null);
  }

  async function fetchProducts() {
    if (!cache.hasOwnProperty(query)) {
      const results = await fetch("http://localhost:8080/api/search?query=" + query, {
        method: 'GET',
        redirect: 'follow'
      });
      
      const data = await results.json();
    
      const asc = [...data].sort((a, b) => a.price - b.price);
      const desc = [...asc].reverse();
    
      const news = [...data].filter(e => e.condition === 'new');
      const used = [...data].filter(e => e.condition === 'used');
    
      setCache({
        ...cache,
        [query]: {
          noFilter: data,
          asc,
          desc,
          news,
          used
        }
      });
      setProducts(data);
    }
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            ML Consumer
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              value={query}
              name="query"
              onChange={handleInputChange}
            />
            <Button onClick={handleOnSubmit}>
              <Typography style={{color: "white"}}>
                Buscar
              </Typography>
            </Button>
          </div>
          <div>
            <IconButton
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <FilterListIcon style={{color: "white"}}/>
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchor}
              keepMounted
              open={Boolean(anchor)}
              onClose={handleClose}
            >
              {
                filter === 'asc' ? (
                  <MenuItem onClick={() => handleSetFilter('noFilter')} style={{color: "blue"}}>Ascendente</MenuItem>
                ) : (
                  <MenuItem onClick={() => {handleSetFilter('asc')}}>Ascendente</MenuItem>

                )
              }
              {
                filter === 'desc' ? (
                  <MenuItem onClick={() => handleSetFilter('noFilter')} style={{color: "blue"}}>Descendente</MenuItem>
                ) : (
                  <MenuItem onClick={() => handleSetFilter('desc')}>Descendente</MenuItem>
                )
              }
              <hr/>
              {
                filter === "news" ? (
                  <MenuItem onClick={() => handleSetFilter('noFilter')} style={{color: "green"}}>Nuevo</MenuItem>
                ) : (
                  <MenuItem onClick={() => handleSetFilter('news')}>Nuevo</MenuItem>
                )
              }
              {
                filter === "used" ? (
                  <MenuItem onClick={() => handleSetFilter('noFilter')} style={{color: "green"}}>Usado</MenuItem>
                ) : (
                  <MenuItem onClick={() => handleSetFilter('used')}>Usado</MenuItem>
                )
              }
              <hr/>
              <MenuItem onClick={() => handleSetFilter('noFilter')}>Limpiar</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
