/*
  Panel inspirado en el diseño:
  https://dribbble.com/shots/4221637-Telly-Dashboard
*/

import React, { Component } from 'react';
import Sidebar from './components/layout/sidebar'
import MainContent from './components/layout/content'
import Slider from "react-slick"
import Modal from 'react-modal'
import Movie from './components/movie'
import './scss/main.scss'

Modal.setAppElement('#root')

const settingsSlider = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 1,
  initialSlide: 0,
  centerPadding: '40px',
  responsive: [
    {
      breakpoint: 1800,
      settings: {
        slidesToShow: 5,
      }
    },
    {
      breakpoint: 1600,
      settings: {
        slidesToShow: 4,
      }
    },
    {
      breakpoint: 1380,
      settings: {
        slidesToShow: 3,
      }
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 2,
      }
    },
    {
      breakpoint: 920,
      settings: {
        slidesToShow: 1,
      }
    }
  ]
};

class App extends Component {
  state = {
    moviesBatman: null,
    modalMovie: false,
    confirmDelete: false,
    typeModal: null,
    form: {
      name: null,
      date: null,
      img: null,
      status: null,
      positionArr: null,
    }
  }
  /* hago la petición al API */
  async componentDidMount () {
    try {
      const res = await fetch('http://www.omdbapi.com/?apikey=5ceb670&s=batman')
      const data = await res.json()
      // agrego la propiedad status para activar o desactivarlo
      data.Search.map((e) => {
        e.status = true
        return e
      })

      // agrego un delay para que se vea que carga bonito
      setTimeout(() => {
        this.setState({ moviesBatman: data.Search })
      }, 500);
    } catch (error) {
      alert('Ocurrió un error, contacte a soporte.')
      console.log(error)
    }
  }

  /* Cierro el modal */
  handleCloseModal = () => {
    this.setState({ modalMovie: false })
  }

  /* Abro un modal según su tipo(editar o agregar) y agrego valores */
  openModal = (params, position, type) => {
    this.setState({
      typeModal: type,
      form: {
        name: params.Title,
        date: params.Year,
        img: params.Poster,
        status: params.status,
        positionArr: position,
      },
      modalMovie: true,
    })
  }

  /* efecto de carga */
  getSkeleton = () => {
    return (
      <div className="contentSkeleton__row">
        {[0, 1, 2, 3, 4, 5].map((e) => {
          return (
            <div className="contentSkeleton__row--wrap" key={e}>
              <div className="contentSkeleton__row__poster">
                <div className="contentSkeleton__row__poster--img" />
                <div className="contentSkeleton__row__poster--title" />
              </div>
            </div>
          )          
        })}
      </div>
    )
  }

  /* Guardo el modal según su tipo */
  handleSaveModal = (event) => {
    event.preventDefault();
    const { moviesBatman, form, typeModal } = this.state
    if (typeModal === 'edit') {
      moviesBatman[form.positionArr].Title = form.name
      moviesBatman[form.positionArr].Year = form.date
      moviesBatman[form.positionArr].Poster = form.img
      moviesBatman[form.positionArr].status = form.status
      this.setState({ moviesBatman, modalMovie: false })
    } else {
      const obj = {
        Poster: form.img,
        Title: form.name,
        Type: "movie",
        Year: form.date,
        imdbID: moviesBatman[0].imdbID + 1, // Sumo 1 para que no se repita el ID
        status: false,
      }
      moviesBatman.unshift(obj) // Agregi la película al array en primera posición
      this.setState({ moviesBatman, modalMovie: false})
    }    
  }

  /* Guardo en el state los valores de los input al momento de escribir */
  onChangeValue = (e) => {
    const { form } = this.state
    form[e.target.id] = e.target.value
    this.setState({ form })
  }

  /* Detecto los valores del select en el formulario */
  onChangeStatus = (e) => {
    const { form } = this.state
    form[e.target.id] = e.target.value === 'true'
    this.setState({ form })
  }

  /* Elimino la película del array */
  deleteMovie = () => {
    const { moviesBatman, form } = this.state
    moviesBatman.splice(form.positionArr , 1)
    this.setState({ moviesBatman, modalMovie: false, confirmDelete: false })
  }

  render() {    
    const {
      moviesBatman,
      modalMovie,
      form,
      typeModal,
      confirmDelete,
    } = this.state
    return (
      <div className="mainWrapper">
        <Sidebar />
        <MainContent>
          <div className="rowTitles">
            <h2 className="mainTitle">Películas</h2>
            <button className="btn--main fix-btn" onClick={this.openModal}>Nueva Película</button>
          </div>
          {moviesBatman === null ? this.getSkeleton() : (
            <div className="rowPeliculas">
              <Slider {...settingsSlider}>
                {moviesBatman.map((e, i) => (
                  <Movie data={e} key={i} click={this.openModal.bind(this, e, i, 'edit')} />
                ))}
              </Slider>
            </div>
          )}
        </MainContent>
        <Modal isOpen={modalMovie}>
          <div className="icon-closeModal" onClick={this.handleCloseModal}>
            <svg viewport="0 0 12 12" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <line x1="1" y1="11" x2="11" y2="1" stroke="white" strokeWidth="2"/>
              <line x1="1" y1="1" x2="11" y2="11" stroke="white"strokeWidth="2"/>
            </svg>
          </div>
          <h2 className="mainTitle text-center" style={{marginBottom: '40px'}}>{typeModal === 'edit' ? 'Editar' : 'Agregar'} Película</h2>
          <form onSubmit={this.handleSaveModal}>
            <div className="formContent">
              <div className="formContent__group">
                <div className="formContent__group--label">Nombre de Película:</div>
                <div className="formContent__group--input">
                  <input type="text" id="name" defaultValue={form.name} onChange={this.onChangeValue} required />
                </div>
              </div>
              <div className="formContent__group">
                <div className="formContent__group--label">Fecha de publicación:</div>
                <div className="formContent__group--input">
                  <input type="text" id="date" defaultValue={form.date} onChange={this.onChangeValue} required />
                </div>
              </div>
              <div className="formContent__group">
                <div className="formContent__group--label">URL Poster:</div>
                <div className="formContent__group--input">
                  <input type="text" id="img" defaultValue={form.img} onChange={this.onChangeValue} required />
                </div>
              </div>
              <div className="formContent__group">
                <div className="formContent__group--label">Estado:</div>
                <div className="formContent__group--input">
                  <select id="status" onChange={this.onChangeStatus} value={form.status}>
                    <option disabled selected>Seleccionar Estado</option>
                    <option selected={form.status === true} value={true}>Activado</option>
                    <option selected={form.status === false} value={false}>Inactivo</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="text-center">
              <button className="btn--main" style={{marginTop: '30px'}} type="submit">Guardar</button>
              {typeModal === 'edit' && (
                <button className="btn--main btn--delete" style={{marginTop: '30px'}} type="button" onClick={() => this.setState({confirmDelete: true})}>Eliminar</button>
              )}
            </div>            
          </form>
        </Modal>
        {confirmDelete && (
          <Modal isOpen>
            <div className="wrapDelete">
              <center>
                <h2>¿Estás seguro que quieres eliminar la Película {moviesBatman[form.positionArr].Title}?</h2>
              </center>
              <div className="wrapDelete__actions">
                <button className="btn--main" style={{marginTop: '30px'}} onClick={this.deleteMovie}>Aceptar</button>
                <button className="btn--main btn--delete" style={{marginTop: '30px'}} onClick={() => this.setState({confirmDelete: false})}>Cancelar</button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    );
  }
}

export default App;
