import React from 'react';
import MovieItem from './MovieItem';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
        slidesToSlide: 3
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
        slidesToSlide: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1
    }
};

const MovieList = ({ data, profile, login }) => {
    function shuffle(array) {
        let currentIndex = array.length;
        while (currentIndex != 0) {
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }
    }

    const customAnimation = {
        transform: 'translateX(-50%)',
        transition: 'transform .5s ease-in-out',
    };

    shuffle(data)

    return (

        <Carousel
            swipeable={true}
            draggable={false}
            showDots={false}
            responsive={responsive}
            ssr={true}
            infinite={true}
            autoPlay={false}
            autoPlaySpeed={7000}
            keyBoardControl={true}
            customTransition="transform .5s ease-in-out"
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
        >

            {data.map((movie) =>
                <div key={movie.id} >
                    <MovieItem movie={movie} profile={profile} login={login} />
                </div>
            )}

        </Carousel>
    );
};

export default MovieList;