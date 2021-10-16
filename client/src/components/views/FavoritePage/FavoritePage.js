import Axios from 'axios';
import React, {useState, useEffect} from 'react';
import Favorite from '../MovieDetail/sections/Favorite';
import'./Favorite.css';

function FavoritePage() {

    const [favoriteMovie, setfavoriteMovie] = useState([]);
    const [removeButton, setremoveButton] = useState(false);

    useEffect(() => {
        Axios.post('api/favorite/favoritePage', {userFrom: localStorage.getItem('userId')})
            .then(response => {
                if(response.data.success){
                    console.log(response.data);
                    setfavoriteMovie([...response.data.info]);
                } else {
                    alert("Favorite 영화 정보를 가져오는데 실패했습니다.")
                }
            })
    }, [])

    const onRemoveEvent = () => {
        setremoveButton(!removeButton); 
    }

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
                    {!removeButton && 
                        favoriteMovie.map((favorite, index) => (

                            <tr key={index}>
                                <td>{favorite.movieTitle}</td>
                                <td>{favorite.movieRuntime} mins</td>
                                <td><button onClick={onRemoveEvent}>Remove</button></td>
                            </tr>

                        ))}
                    

                </tbody>
            </table>
        </div>
    )
}


export default FavoritePage
