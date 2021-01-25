import React from 'react'

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Icon, IconButton, FormControl, TextField } from '@material-ui/core'

import { ContentContainer } from '../Base/ContentContainer'
import { PageTitle } from '../Base/PageTitle'
import { StationSelector } from '../Base/StationSelector'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    navButton: {
      backgroundColor: theme.palette.secondary.light,
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    navIcon: {
      margin: -8,
    },
    navControl: {
      flexDirection: 'row',
      marginTop: theme.spacing(1),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }),
)

export function Dips(): JSX.Element {
  const classes = useStyles()

  return (
    <ContentContainer>
      <PageTitle title='Dip Entries' />
      <div>
        <FormControl className={classes.formControl}>
          <StationSelector />
        </FormControl>

        <FormControl className={classes.formControl}>
          <TextField
            id='date'
            label='Date'
            type='date'
            defaultValue='2020-12-31'
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormControl>

        <FormControl className={classes.navControl}>
          <IconButton className={classes.navButton}>
            <Icon className={classes.navIcon} fontSize='large'>
              arrow_back
            </Icon>
          </IconButton>
          <IconButton className={classes.navButton} disabled={true}>
            <Icon className={classes.navIcon} fontSize='large'>
              arrow_forward
            </Icon>
          </IconButton>
        </FormControl>
      </div>
    </ContentContainer>
  )
}
