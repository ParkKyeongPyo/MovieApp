import React, {useEffect, useState} from 'react'
import {API_URL, API_KEY, IMAGE_BASE_URL} from '../../Config';
import MainImage from '../LandingPage/Sections/Mainimage';
import MovieInfolayout from './sections/MovieInfolayout';
import MovieInfo from './sections/MovieInfolayout';
import GridCards from '../common/GridCards';
import Favorite from './sections/Favorite';
import {Row} from 'antd';

function MovieDetail(props) {

    let movieID = props.match.params.movieID;

    const [movieInfo, setmovieInfo] = useState([]);
    const [movieCredit, setmovieCredit] = useState([]);
    const [toggleValue, settoggleValue] = useState(false);
      

    useEffect(() => {

        let endpoint = `${API_URL}movie/${movieID}?api_key=${API_KEY}`
      
        fetch(endpoint)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            setmovieInfo(response);
        })

        let endpointcast = `${API_URL}movie/${movieID}/credits?api_key=${API_KEY}`

        fetch(endpointcast)
        .then(response => response.json())
        .then(response => {
            setmovieCredit([...response.cast, ...response.crew]);
        })
     


    }, [])


    const LoadMoreActors = () => {
        settoggleValue(!toggleValue);
    }

    return (
        <div>
                {/* Header */}
                <MainImage
                     image={`${IMAGE_BASE_URL}w1280${movieInfo.backdrop_path}`}
                     title={movieInfo.original_title}
                     text={movieInfo.overview}
                />

                {/* Body */}
                <div style={{ width: '85%', margin: '1rem auto'}}>

                    <div style={{ display: 'flex', justifyContent: 'flex-end'}}>
                        <Favorite 
                            movieInfo={movieInfo}
                            movieId={movieID}
                            userFrom={localStorage.getItem('userId')}
                        /> 
                    </div>
        
                    {/* MovieInfo */}
                    <MovieInfolayout
                        movieInfo = {movieInfo}
                    />

                    <br />
                    {/* Actors Grid */}

                    <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem'}} onClick={LoadMoreActors}>
                        <button>Toggle Actor View</button>
                    </div> 
                    
                    {toggleValue && 
                         <Row gutter={[16,16]}> 
                            {movieCredit && movieCredit.map((actor, index) => (
                                <React.Fragment key={index}>
                                    <GridCards 
                                        image={actor.profile_path ?
                                            `${IMAGE_BASE_URL}w500${actor.profile_path}` : null}
                                        actorName={actor.name}
    
                                    />
                                </React.Fragment>
                         ))}             
                     </Row>
                    }
                </div>
            
        </div>
    )
}



export default MovieDetail
