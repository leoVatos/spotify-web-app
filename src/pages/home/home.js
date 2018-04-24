import React, {Component} from 'react'
import PropTypes from 'prop-types'
import SpotifyManager from '../../services/spotify-manager'

import style from './home.css'
import Grid from "../../components/grid/grid"
import Search from "../../components/search/search"
import Header from "../../components/header/header"
import GridItemArtist from "../../components/grid/grid-item-artist/grid-item-artist"
// import Grid from '../../components/grid/grid'
// import Header from '../../components/header/header'
// import GridItemArtist from '../../components/grid/grid-item-artist/grid-item-artist'

export default class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      artists: []
    }
  }

  componentDidMount () {
    this.handleSearchClick()
  }

  handleGridItemClick (item) {
    console.log(item)
    this.props.history.push('/artist/' + item.id)
  }

  handleSearchClick (value) {
    console.log('search', value)
    // const context = this;
    SpotifyManager.searchArtists(value).then(data => {
      console.log(data.artists.items)
      this.setState(prevState => {
        return {...prevState, artists: data.artists.items}
      })
    },
    err => {
      console.log(err)
      console.log('Code', err.response.status)
      if (err.response.status === 401) {
        SpotifyManager.setAccessToken(null)
        this.props.history.push('login')
      }
    })
  }

  render () {
    return (
      <div className={style.container}>
        <Header title='Spotify clone'/>
        <Search
          onSearchClick={(value) => (this.handleSearchClick(value))}
          placeholder='Search for an artist'
        />
        <Grid>
          {
            this.state.artists && this.state.artists.map(item => {
              return <GridItemArtist cssClasses={style.gridItem} onItemClick={ (item) => this.handleGridItemClick(item) } key={item.id} item={item} />
            })
          }
        </Grid>
      </div>
    )
  }
}

Home.propTypes = {
  history: PropTypes.object
}


