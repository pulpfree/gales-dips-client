import React, { Component } from 'react'
import PropTypes from 'prop-types'

import classNames from 'classnames'
import moment from 'moment'

import ArrowBack from '@material-ui/icons/ArrowBack'
import ArrowForward from '@material-ui/icons/ArrowForward'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import { withStyles } from '@material-ui/core/styles'

import DatePicker from 'material-ui-pickers/DatePicker'

import StationSelector from '../Common/StationSelector'
import { STD_DATE_FORMAT as dateFormat } from '../../config/constants'

class DipSelectors extends Component {
  constructor(props) {
    super(props)
    this.handleStationChange = this.handleStationChange.bind(this)

    this.state = {
      nextDisabled: true,
      selectedDate: moment(),
      stationID: '',
    }
  }

  componentDidMount = () => {
    const { params } = this.props.match
    const { date, stationID } = params
    if (date) {
      this.setState(() => ({ selectedDate: moment(date) }), this.setNextDisabled)
    }
    if (stationID) {
      this.setState(() => ({ stationID }), this.handleGetDip)
    }
  }

  setNextDisabled = () => {
    const { selectedDate } = this.state
    const today = moment().format(dateFormat)
    this.setState({ nextDisabled: !selectedDate.isBefore(today) })
  }

  // This could get more involved if state isn't set in time: https://stackoverflow.com/questions/37401635/react-js-wait-for-setstate-to-finish-before-triggering-a-function
  handleStationChange = (value) => {
    this.setState({ stationID: value }, this.handleGetDip)
  }

  handleDateChange = (date) => {
    this.setState({ selectedDate: date }, this.handleGetDip)
  }

  handleNextPrevDate = (val) => {
    const newDte = moment(this.state.selectedDate)
    if (val === 'p') {
      newDte.subtract(1, 'd')
    } else if (val === 'n') {
      newDte.add(1, 'd')
    }
    this.setState(() => ({ selectedDate: newDte }), this.handleGetDip)
  }

  handleGetDip = () => {
    this.props.actions.errorClear()
    this.setNextDisabled()
    const { history } = this.props
    const { selectedDate, stationID } = this.state
    if (stationID) {
      const dte = selectedDate.format(dateFormat)
      const uri = `/dips/${dte}/${stationID}`
      history.push(uri)
    }
  }

  render() {
    const { classes } = this.props
    const { nextDisabled, selectedDate, stationID } = this.state

    return (
      <div className={classes.container}>
        <div className={classes.selectRow}>

          <div className={classes.cell}>
            <FormControl className={classes.formControl}>
              <StationSelector
                onStationChange={this.handleStationChange}
                stationID={stationID}
              />
            </FormControl>
          </div>

          <div className={classNames([classes.cell], [classes.calendar])}>
            <FormControl className={classes.formControl}>
              <DatePicker
                autoOk
                disableFuture
                format="MMM D, YYYY"
                label="Date"
                onChange={this.handleDateChange}
                value={selectedDate}
              />
            </FormControl>
          </div>

          <div className={classes.cell}>
            <Button
              className={classes.navButton}
              color="secondary"
              onClick={() => this.handleNextPrevDate('p')}
              variant="fab"
            >
              <ArrowBack />
            </Button>
            <Button
              className={classes.navButton}
              color="secondary"
              disabled={nextDisabled}
              onClick={() => this.handleNextPrevDate('n')}
              variant="fab"
            >
              <ArrowForward />
            </Button>
          </div>

        </div>
      </div>
    )
  }
}

DipSelectors.propTypes = {
  actions: PropTypes.instanceOf(Object).isRequired,
  classes: PropTypes.instanceOf(Object).isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
  match: PropTypes.instanceOf(Object).isRequired,
}

const styles = theme => ({
  cell: {
    flex: 'flex-grow',
    alignSelf: 'flex-end',
  },
  container: {
    marginBottom: theme.spacing.unit,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  navButton: {
    margin: theme.spacing.unit,
    height: theme.spacing.unit * 4.5,
    width: theme.spacing.unit * 4.5,
    marginRight: 0,
  },
  selectRow: {
    display: 'inline-flex',
    flexDirection: 'row',
    marginBottom: theme.spacing.unit,
  },
})

export default withStyles(styles)(DipSelectors)
