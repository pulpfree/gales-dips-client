/* eslint no-undef: "off" */

import React from 'react'
import { shallow } from 'enzyme'

import TankAdmin from '../TankAdmin'

describe('TankAdmin', () => {
  let mountedC
  let props
  const reportC = () => {
    if (!mountedC) {
      mountedC = shallow(<TankAdmin {...props} />)
    }
    return mountedC
  }

  beforeEach(() => {
    props = {
      history: {},
    }
    mountedC = undefined
  })

  it('matches snapshot', () => {
    expect(reportC()).toMatchSnapshot()
  })
})
