const express = require('express');
const router = express.Router();
const { Favorite } = require('../models/Favorite')

router.post('/favoriteNumber', (req, res) => {

    // mongoDB에서 favorite 숫자 가져오기
    Favorite.find({ "movieId": req.body.movieId }) //find와 exec 쿼리 사용하는 방법?
        .exec((err, info) => {
            if (err) return res.status(400).send(err)

            res.status(200).json({success: true, favoriteNumber: info.length })
        })

    // 그 다음에 프론트에 다시 숫자 보내주기
})



module.exports = router;
