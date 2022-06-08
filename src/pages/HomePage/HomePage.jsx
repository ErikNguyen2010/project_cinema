import React, { Fragment } from 'react'
import App from './App/App'
import Booking from './Booking/Booking'
import CarouselHome from './Carousel/Carousel'
import Carousel from './Carousel/Carousel'
import Options from './Options/Options'
import SelectFilm from './SelectFilm/SelectFilm'
import {useSelector} from 'react-redux'

export default function HomePage(props) {


  const {films,banners} = useSelector((rootReducer) => rootReducer.layDanhSachFilmReducer)


  const {arrRap} = useSelector((rootReducer) => rootReducer.rapReducer)

  return (
    <Fragment>
      <CarouselHome banners={banners}/>
      <SelectFilm films={films} />
      <Booking arrRap={arrRap}/>
      <App/>
    </Fragment>
  )
}
