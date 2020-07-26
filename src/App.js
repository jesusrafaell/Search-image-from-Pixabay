import React,{ useState, useEffect } from 'react';
import Formulario from './components/Formulario'
import ImageList  from './components/ImageList';

function App() {

  //states
  const [search, saveSearch] = useState('');
  const [images, saveImages] = useState([]);

  //Paginador
  const [pageactual, savePageActual] = useState(1);
  const [totalpage, saveTotalPage] = useState(1);

  useEffect(() => {
    if(search.trim() === '') return;

    const consultAPI = async () => {
      const imageForPage = 40; //cantidad de imagenes a obtener
      const key = '17654050-301720daa0dc2187598b32ed8';
      const url = `https://pixabay.com/api/?key=${key}&q=${search}&per_page=${imageForPage}&page=${pageactual}`;

      const res = await fetch(url);
      const result = await res.json();
      
      saveImages(result.hits);

      //caculcular total pages
      const calcultorTotalPage = Math.ceil(result.totalHits / imageForPage);
      saveTotalPage(calcultorTotalPage);

      //mover la pantalla hacia arriba
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({behavior: 'smooth'})
    }
    consultAPI();
  },[search, pageactual]);

  const handlePrew = () => {
    const newPageActual = pageactual - 1;
    if(newPageActual === 0) return;

    savePageActual(newPageActual);
  }

  const handleNext = () => {
    const newPageActual = pageactual + 1;
    if(newPageActual > totalpage) return;

    savePageActual(newPageActual);
  }
  
  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Search Images in Pixabay</p>

        <Formulario 
          saveSearch={saveSearch}
        />
      </div>
      <div className="row justify-content-center">
        <ImageList 
          images={images}
        />

        {(pageactual === 1) ? null :
          <button
            type="button"
            className="bbtn btn-info mr-1"
            onClick={handlePrew}
            >&laquo; Prev</button>
        } 

        {(pageactual === totalpage) ? null :
          <button
              type="button"
              className="bbtn btn-info mr-1"
              onClick={handleNext}
            >Next &raquo;</button>
        }
      </div>
    </div>
  );
}

export default App;