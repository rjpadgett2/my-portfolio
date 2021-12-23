import getYouTubeId from 'get-youtube-id'
import YouTube from 'react-youtube'
import React from 'react';

const Preview = ({value}) => {
    const { url } = value
    const id = getYouTubeId(url)
    return (<YouTube component={'div'} videoId={id} />)
}


// youtube.js
export default {
    name: 'youtube',
    type: 'object',
    title: 'YouTube Embed',
    fields: [
        {
            name: 'url',
            type: 'url',
            title: 'YouTube video URL'
        }
    ],
    preview: {
        select: {
            url: 'url'
        },
        component: Preview
    }
}
