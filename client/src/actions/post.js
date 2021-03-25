import React from 'react'
import {GET_POSTS,POST_ERROR} from '../actions/types'
import axios from 'axios'

//get posts
export const getPosts = () => async dispatch =>{
    try {
        const res = axios.get('/api/posts');
        dispatch({
            type:GET_POSTS,
            payload:res.data
        })
    } catch (err) {
        console.log(err.message);
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response.statusText,status: err.response.status}
        })
    }
}
