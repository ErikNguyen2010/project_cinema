import React, { Fragment } from 'react'
import App from './App/App'
import Booking from './Booking/Booking'
import CarouselHome from './Carousel/Carousel'
import Carousel from './Carousel/Carousel'
import Options from './Options/Options'
import SelectFilm from './SelectFilm/SelectFilm'
import {useSelector} from 'react-redux'

export default function HomePage(props) {


  const {films} = useSelector((rootReducer) => rootReducer.layDanhSachFilmReducer)

  const {banners} = useSelector((rootReducer) => rootReducer.layBannerReducer) 

  const {arrRap} = useSelector((rootReducer) => rootReducer.layThongTinRapReducer)

  return (
    <Fragment>
      <CarouselHome banners={banners}/>
      <Options/>
      <SelectFilm films={films} />
      <Booking arrRap={arrRap}/>
      <App/>
    </Fragment>
  )
}
