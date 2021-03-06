import React from 'react'
import { geolocation, getAddress } from '../../../utils/location-utils'
import MaterialIcon from '../../others/icons/material-icon'
import { connect } from 'react-redux'
import { CPP } from '../../../actions/post'

const GetLocation = ({ postIt, dispatch }) => {
  let { location } = postIt

  let dp = (...args) => dispatch(CPP(...args))

  let getLocation = async () => {
    let geolocationSuccess = async pos => {
      dp('fetchingLocation', true)
      let address = await getAddress(pos)
      dp('location', address)
      dp('fetchingLocation', false)
    }
    geolocation(geolocationSuccess)
  }

  return (
    <span
      className={`loc_add ${location ? 'p_span_toggle' : ''}`}
      data-tip='Add location'
      onClick={getLocation}
    ><MaterialIcon icon='location_on' />
    </span>
  )
}

const mapStateToProps = state => (
  { postIt: state.Post.postIt }
)

export default connect(mapStateToProps)(GetLocation)
export { GetLocation as PureGetLocation }
