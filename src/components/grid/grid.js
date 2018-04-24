import React, {Component} from 'react'
import PropTypes from 'prop-types'

import s from './grid.css'

class Grid extends Component {
  render () {
    return <div className={s.container}>
      {this.props.children}
    </div>
  }
}

Grid.propTypes = {
  theme: PropTypes.string,
  children: PropTypes.object
}

export default Grid
