import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'

const useStyles = makeStyles({
  card: {
    margin: '2rem auto',
    height: '50vh',
    width: '80%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40
  },
  title: {
    fontSize: 14
  },
  content: {
    margin: '3rem auto'
  },
  pos: {
    marginBottom: 12
  },
  links: {
    textDecoration: 'none',
    color: '#000'
  },
  root: {
    display: 'flex'
  }
})

export default function NotFound () {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <Typography variant='h1' component='h1'>
            404
          </Typography>
          <Typography variant='h5' component='h2'>
            Page Not Found :(
          </Typography>
        </CardContent>
        <CardActions>
          <Link className={classes.links} to={{ pathname: '/' }}>
            <Button size='small'> Go Back To Home</Button>
          </Link>
        </CardActions>
      </Card>
    </div>
  )
}
