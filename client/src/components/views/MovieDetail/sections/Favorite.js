import React, {useEffect, useState} from 'react'
import Axios from 'axios'
import {Button} from 'antd';

function Favorite(props) {

    const movieId = props.movieId;
    const userFrom = props.userFrom;
    const movieTitle = props.movieInfo.title;
    const moviePost = props.movieInfo.backdrop_path;
    const movieRuntime = props.movieInfo.runtime;

    const [favoriteNumber, setfavoriteNumber] = useState(0);
    const [Favorited, setFavorited] = useState(false);

    let variables = {
        userFrom: userFrom,
        movieId: movieId,
        movieTitle: movieTitle,
        moviePost: moviePost,
        movieRuntime: movieRuntime
    }
    

    useEffect(() => {
    
        Axios.post('/api/favorite/favoriteNumber', variables)
            .then(response => {
                if(response.data.success){
                    setfavoriteNumber(response.data.favoriteNumber)
                } else {
                    alert('숫자 정보를 가져오는데 실패 했습니다.')
                }
            })

        Axios.post('/api/favorite/favorited', variables)
            .then(response => {
                if(response.data.success){
                    setFavorited(response.data.favorited)
                } else {
                    alert('정보를 가져오는데 실패했습니다')
                }
            })

    }, [])

    const onClickFavorite = () => {

        

        if(Favorited){
            // favorite 리스트에 remove
            Axios.post('/api/favorite/removeFromFavorite', variables)
                .then(response => {
                    if(response.data.success){
                        setfavoriteNumber(favoriteNumber - 1);
                        setFavorited(!Favorited)
                    } else {
                        alert('Favorite 리스트에서 지우는 것을 실패했습니다.')
                    }
                })
            
        } else {
            // favorite 리스트에서 add
            Axios.post('/api/favorite/addFromFavorite ', variables)
                .then(response => {
                    if(response.data.success){
                        setfavoriteNumber(favoriteNumber + 1);
                        setFavorited(!Favorited)
                    } else {
                        alert('Favoirte 리스트에 추가하는 것을 실패했습니다.')
                    }
                })
        }

    }




    return (
        <Button onClick={onClickFavorite}> {Favorited ? "Not Favorite" : "Add to Favorite"} {favoriteNumber} </Button>

    )
}

export default Favorite
