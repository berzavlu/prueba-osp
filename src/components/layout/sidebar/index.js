import React from 'react';

const Sidebar = () => {
  return (
    <aside>
      <div className="logoSidebar">
        <a href="https://google.com/">
          <img src="data:image/png;base64,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" />
        </a>
      </div>
      <div className="browseMain">
        <h3 className="browseMain__title">Browse Telly</h3>
        <ul className='browseMain__list'>
          <li>
            <a href="https://google.com/">Discover</a>
          </li>
          <li>
            <a href="https://google.com/" className="browseMain__list--active">Tv & Movies</a>
          </li>
          <li>
            <a href="https://google.com/">Popular Clips</a>
          </li>
          <li>
            <a href="https://google.com/">Watch Later</a>
          </li>
        </ul>
      </div>
      <div className="browseCategories">
        <h3 className="browseCategories__title">Categories</h3>
        <ul className="browseCategories__list">
          <li>
            <a href="https://google.com/" className="browseCategories__list--active">Kiwait Tv</a>
          </li>
          <li>
            <a href="https://google.com/">Free Shows</a>
          </li>
          <li>
            <a href="https://google.com/">Arabic</a>
          </li>
          <li>
            <a href="https://google.com/">Action</a>
          </li>
          <li>
            <a href="https://google.com/">Comedy</a>
          </li>
          <li>
            <a href="https://google.com/">Drama</a>
          </li>
          <li>
            <a href="https://google.com/">Horror</a>
          </li>
          <li>
            <a href="https://google.com/">Kids</a>
          </li>
          <li>
            <a href="https://google.com/">Musical</a>
          </li>
          <li>
            <a href="https://google.com/">Tb Shows</a>
          </li>
          <li>
            <a href="https://google.com/">Thriller</a>
          </li>
        </ul>
      </div>
    </aside>
  )
}

export default Sidebar
