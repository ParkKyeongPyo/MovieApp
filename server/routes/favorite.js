const express = require('express');
const router = express.Router();
const { Favorite } = require('../models/Favorite');


router.post('/favoriteNumber', (req, res) => {

    // mongoDB에서 favorite 숫자 가져오기
    Favorite.find({ "movieId": req.body.movieId }) //find와 exec 쿼리 사용하는 방법?
        .exec((err, info) => {
            if (err) return res.status(400).send(err)

            res.status(200).json({success: true, favoriteNumber: info.length })
        })

    // 그 다음에 프론트에 다시 숫자 보내주기
})


router.post('/favorited', (req, res) => {

    // 내가 이 영화를 Favorite 리스트에 넣었는지 정보를 DB에서 가져오기.
    Favorite.find({ "movieId": req.body.movieId, "userFrom" : req.body.userFrom}) //find와 exec 쿼리 사용하는 방법?
        .exec((err, info) => {
            if (err) return res.status(400).send(err)

            let result = false;
            if(info.length !== 0){
                result = true;
            }

            res.status(200).json({success: true, favorited: result })
        })

    // 그 다음에 프론트에 다시 숫자 보내주기
})


router.post('/removeFromFavorite', (req, res) => {

        
    Favorite.findOneAndDelete({"movieId": req.body.movieId, "userFrom": req.body.userFrom})
        .exec((err,doc) => {
             if (err) return res.status(400).send(err)
             res.status(200).json({success: true, doc})
         })
})


router.post('/addFromFavorite', (req, res) => {

    const favorite = new Favorite(req.body);

    favorite.save((err,doc) => {
        if (err) return res.status(400).send(err)
        return res.status(200).json({success: true})
    })
})


router.post('/favoritePage', (req, res) => {

    Favorite.find({"userFrom": req.body.userFrom}) 
        .exec((err, info) => {
            if (err) return res.status(400).send(err)

            res.status(200).json({success: true, info})
        })

})




module.exports = router;
