import React from 'react';

const Movie = (e, onClick)  => {
  const { data } = e
  console.log(e)
  return (
    <div
      className={`posterBloque${data.status === false ? ' posterBloque--inactive' : ''}`}
      onClick={() => e.click()}
    >
      <div className='posterBloque--shadow'>
        <div className="posterBloque--img">
          <img src={data.Poster} alt="Title" />
        </div>
        <div className="posterBloque--nombre">
          {data.Title}
        </div>
        <div className="posterBloque--fecha">
          {data.Year}
        </div>
        <div className="posterBloque__actions">
          <div className={`posterBloque__actions--status posterBloque__actions--${data.status ? 'active' : 'inactive'}`}>
            {data.status ? 'Activo' : 'Inactivo'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Movie
