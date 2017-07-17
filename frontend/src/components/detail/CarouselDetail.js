import React from 'react';
import {Carousel} from 'react-bootstrap';

const mappingToCarousel = (datas) => {
    return datas.map((data, i) => {
        <Carousel.Item>
          <img width={900} height={500} alt="900x500" src={data.imageSrc}/>
          <Carousel.Caption>
            <h3>{data.title}</h3>
            <p>{data.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
    });
}
const CarouselDetail = ({datas}) => (
    <Carousel>
        {mappingToCarousel(datas)}
    </Carousel>
)

export default CarouselDetail;
