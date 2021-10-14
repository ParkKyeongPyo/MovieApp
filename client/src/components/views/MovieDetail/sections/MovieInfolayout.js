import React from 'react'
import {Descriptions, Badge} from 'antd';

function MovieInfolayout(props) {

    let {movieInfo} = props

    return (
        <Descriptions title="Movie Info" bordered>
            <Descriptions.Item label="Title">{movieInfo.original_title}</Descriptions.Item>
            <Descriptions.Item label="release_date">{movieInfo.release_date}</Descriptions.Item>
            <Descriptions.Item label="revenue">{movieInfo.revenue}</Descriptions.Item>
            <Descriptions.Item label="runtime">{movieInfo.runtime}</Descriptions.Item>
            <Descriptions.Item label="vote_average" span={2}>
                {movieInfo.vote_average}
            </Descriptions.Item>
            <Descriptions.Item label="vote_count">{movieInfo.vote_count}</Descriptions.Item>
            <Descriptions.Item label="status">{movieInfo.status}</Descriptions.Item>
            <Descriptions.Item label="popularity">{movieInfo.popularity}</Descriptions.Item>
        </Descriptions>
    )
}

export default MovieInfolayout
