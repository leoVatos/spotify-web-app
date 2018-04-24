import React, {Component} from 'react'
import SpotifyManager from '../../services/spotify-manager'
import PropTypes from 'prop-types'

import style from './artist-detail.css'
import Header from "../../components/header/header"
import Grid from "../../components/grid/grid"
import GridItemAlbum from "../../components/grid/grid-item-album/grid-item-album"
// import Grid from '../../components/grid/grid'
// import GridItemAlbum from '../../components/grid/grid-item-album/grid-item-album'

export default class ArtistDetail extends Component {
  constructor (props) {
    super(props)
    this.state = {albums: []}
    if (props.match.params.id) {
      this.loadArtistAlbuns(props.match.params.id)
    } else {
      props.history.push('/')
    }
  }

  handleItemClick (album) {
    album.expanded = !album.expanded
    if (album.expanded) {
      SpotifyManager.getAlbumById(album.id).then(data => {
        album.popularity = (data.popularity / 2) / 10
        album.genres = data.genres
        album.tracks = data.tracks
        this.forceUpdate()
      },
      err => {
        console.log(err)
      })
    } else {
      this.forceUpdate()
    }
  }

  loadArtistAlbuns (artistId) {
    SpotifyManager.getArtistAlbums(artistId).then(data => {
      console.log(data)
      this.setState(prevState => {
        return {...prevState, albums: data.items}
      })
    },
    err => {
      console.log(err)
    })
  }

  render () {
    return (
      <div className={style.container}>
        <Header title='Spotify test' enableBack={true}/>
        <Grid theme='dark'>
          {
            this.state.albums && this.state.albums.map(item => (
              <GridItemAlbum onItemClick={ (item) => this.handleItemClick(item) } item={item} key={item.id}/>
            ))
          }
        </Grid>
      </div>
    )
  }
}

ArtistDetail.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object
}