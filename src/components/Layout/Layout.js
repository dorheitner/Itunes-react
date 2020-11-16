import React from 'react'

import { Link } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  toolbar: {
    background: 'rgba(0, 0, 0, 0.8)'
  },
  linkes: {
    textDecoration: 'none',
    color: '#fff'
  }
}))

export default function Layout (props) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar style={{ width: '100%' }} position='static'>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
          />
          <Typography variant='h6' className={classes.title}>
            <Link className={classes.linkes} to={'/'}>
              iTunes
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
      <div>{props.children}</div>
    </div>
  )
}
