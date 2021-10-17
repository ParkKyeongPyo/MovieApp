import Axios from 'axios';
import React, {useState, useEffect} from 'react';
import Favorite from '../MovieDetail/sections/Favorite';
import'./Favorite.css';
import {Popover} from 'antd';
import { IMAGE_BASE_URL } from '../../Config';

function FavoritePage() {

    const [favoriteMovie, setfavoriteMovie] = useState([]);

    const axiosFavoritePage = () => {
        Axios.post('api/favorite/favoritePage', {userFrom: localStorage.getItem('userId')})
            .then(response => {
                if(response.data.success){
                    console.log(response.data);
                    setfavoriteMovie([...response.data.info]);
                } else {
                    alert("Favorite 영화 정보를 가져오는데 실패했습니다.")
                }
            })
    }

    useEffect(() => {
       axiosFavoritePage();
    }, [])


    const onRemoveEvent = (movieId,userFrom) => {

        const variables = {
            movieId,
            userFrom
        }

        Axios.post('/api/favorite/removeFromFavorite', variables)
            .then(response => {
                if(response.data.success){
                    console.log(response.data);
                    axiosFavoritePage();
                } else {
                    alert("영화를 Favorite List에서 제거하는데 실패했습니다.");
                }
            })
    }


    const renderCards = favoriteMovie.map((favorite, index) => {

        const content = (
            <div>
                {favorite.moviePost ?
                <img src={`${IMAGE_BASE_URL}w500${favorite.moviePost}`}/> : "no image"}
            </div>
        )

        return <tr key={index}>

            <Popover content={content} title={`${favorite.movieTitle}`}>
                <td>{favorite.movieTitle}</td>
            </Popover>
            <td>{favorite.movieRuntime} mins</td>
            <td><button onClick={() => onRemoveEvent(favorite.movieId, favorite.userFrom)}>Remove</button></td>
        
        </tr>

    })


    return (
        <div>
            <h2> Favorite Movies</h2>
            <hr />

            <table>
                <thead>
                    <tr>
                        <th>Movie Title</th>
                        <th>Movie RunTime</th>
                        <th>Remove from favorites</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {renderCards}

                </tbody>
            </table>
        </div>
    )
}


export default FavoritePage
