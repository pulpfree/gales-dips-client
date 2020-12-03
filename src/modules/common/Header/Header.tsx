import React, { useState } from 'react'

import { Link, useHistory, useLocation } from 'react-router-dom'

import { AccountCircle, Menu as MenuIcon } from '@material-ui/icons'
import { AppBar, IconButton, Menu, MenuItem, Toolbar, Typography } from '@material-ui/core'

import { useStyles } from './style'
import { LinkItems } from '../types'

const menuItems: LinkItems = [
  { label: 'Dashboard', path: '/' },
  { label: 'Dip Entries', path: '/dips' },
  { label: 'Contact', path: '/contact' },
]

export const Header = () => {
  const classes = useStyles()
  let location = useLocation()
  let history = useHistory()

  const selectedIndex = location.pathname
  const [mainMenuEl, setMainMenuEl] = useState<null | HTMLElement>(null)
  const [userMenuEl, setUserMenuEl] = useState<null | HTMLElement>(null)

  const handleMainMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMainMenuEl(event.currentTarget)
  }

  const handleMainMenuClose = () => {
    setMainMenuEl(null)
  }

  const handleUserMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setUserMenuEl(event.currentTarget)
  }

  const handleUserMenuClose = () => {
    setUserMenuEl(null)
  }

  const handleNavigate = (
    event: React.MouseEvent<HTMLElement>,
    path: string
  ) => {
    history.push(path)
    setMainMenuEl(null)
    setUserMenuEl(null)
  }

  const handleLogout = () => {
    console.log('logging out')
    setUserMenuEl(null)
  }

  return (
    <header className={classes.root}>
      <AppBar color='secondary' position='static'>
        <Toolbar>
          <IconButton
            aria-haspopup='true'
            aria-label='Menu'
            className={classes.menuButton}
            color='inherit'
            edge='start'
            onClick={handleMainMenuClick}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id='main-menu'
            anchorEl={mainMenuEl}
            getContentAnchorEl={null}
            keepMounted
            onClose={handleMainMenuClose}
            open={Boolean(mainMenuEl)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            {menuItems.map((m) => (
              <MenuItem
                disabled={m.path === selectedIndex}
                key={m.path}
                onClick={(e) => handleNavigate(e, m.path)}
                selected={m.path === selectedIndex}
              >
                {m.label}
              </MenuItem>
            ))}
          </Menu>
          <Typography className={classes.title} color='inherit' variant='h6'>
            <Link className={classes.titleLink} to='/'>
              Gales Dips
            </Link>
          </Typography>
          <div className={classes.userMenu}>
            User
            <IconButton
              aria-haspopup='true'
              color='inherit'
              onClick={handleUserMenuClick}
            >
              <AccountCircle />
            </IconButton>
            <Menu
              anchorEl={userMenuEl}
              id='user-menu'
              onClose={handleUserMenuClose}
              open={Boolean(userMenuEl)}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
            >
              <MenuItem onClick={(e) => handleNavigate(e, '/profile')}>
                Profile
              </MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </header>
  )
}
