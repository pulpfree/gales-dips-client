import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

import { gql, useQuery } from '@apollo/client'

import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import Header from '../Header/Header'
import { styles as ms } from '../../styles/main'

const GET_STATIONS = gql`
  query Stations {
    stations {
      id
      name
    }
  }
`

const Dashboard = ({ classes }) => {
  const { loading, error, data } = useQuery(GET_STATIONS)
  // console.log('loading: ', loading)

  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`
  console.log('data: ', data)

  return (
    <div>
      <Header />
      <Paper className={classes.paper}>
        <Typography gutterBottom variant='h5'>
          Select Activity
        </Typography>
        <Button component={Link} to='/dips'>
          Dip Entries
        </Button>
        <Button component={Link} to='/propane'>
          Propane Entries
        </Button>
        <Button component={Link} to='/reports'>
          Reports
        </Button>
        <Button component={Link} to='/import-data'>
          Import Sales Data
        </Button>
        <Divider light />
        <br />
      </Paper>
    </div>
  )
}

Dashboard.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
}

export default withStyles(ms)(Dashboard)
