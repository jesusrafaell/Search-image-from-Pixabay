import React from 'react';
import Image from './Image';
import PropTypes from 'prop-types';

const ImageList = ({images}) => {
    return (  
        <div className="col-12 p-5 row">
            {images.map(img => (
                <Image 
                    key={img.id}
                    img={img}
                />
            ))}
        </div>
    );
}
 
ImageList.propTypes = {
    images: PropTypes.array.isRequired
}

export default ImageList;