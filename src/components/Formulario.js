import React, { useState } from 'react';
import Error from './Error';
import PropTypes from 'prop-types';

const Formulario = ({saveSearch}) => {

    const [termino, saveTermino]= useState('');
    const [error, saveError]= useState(false);

    const handleSubmit = e => {
        e.preventDefault();

        //validar 
        if(termino.trim() === ''){
            saveError(true);
            return;
        }
        saveError(false);

        //send data to app
        saveSearch(termino);
    }

    return (  
        <form
            onSubmit={handleSubmit}
        >
            <div className="row">
                <div className="form-group col-md-8">
                    <input 
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Search image"
                        onChange={e => saveTermino(e.target.value)}
                    />
                </div>
                <div className="form-group col-md-4">
                    <input 
                        type="submit"
                        className="btn btn-lg btn-danger btn-block"
                        value="Search"
                    />
                </div>
            </div>
            {error ? <Error message="Error: Must addd something to search" /> : null}
        </form>
    );
}
 
Formulario.propTypes = {
    saveSearch: PropTypes.func.isRequired
}

export default Formulario;