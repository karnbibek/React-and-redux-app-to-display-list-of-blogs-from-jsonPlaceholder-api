import _ from 'lodash'; // package installed using npm install lodash . The main function is to memoize(cache) the data temporarily.

import jsonPlaceholder from '../apis/jsonPlaceholder';

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
    // console.log('About to fetch posts');
    await dispatch(fetchPosts());
    // console.log('Fetched posts');
    const userIds = _.uniq(_.map(getState().posts, 'userId')); // lodash version of map function. _uniq will return arrays of unique userId
    userIds.forEach(id => dispatch(fetchUser(id)));

    // alternate easy way for line 9&10 using chain of lodash.
    // _.chain(getState().posts)
    //     .map('userId')
    //     .uniq()
    //     .forEach(id => dispatch(fetchUser(id)))
    //     .value()
}

export const fetchPosts = () => async dispatch => {
    const response = await jsonPlaceholder.get('/posts');
    
    dispatch({ type: 'FETCH_POSTS', payload: response.data})
};

export const fetchUser = id => async dispatch => {
    const response = await jsonPlaceholder.get(`/users/${id}`);
 
    dispatch({ type: 'FETCH_USER', payload: response.data});
}


// export const fetchUser = id => dispatch => _fetchUser(id, dispatch);


// // Below the function name starts with _fetchUser to remind anyone who checks the code not to change the function unless he should do it.(video-264)
// const _fetchUser = _.memoize(async (id, dispatch) => {
//     const response = await jsonPlaceholder.get(`/users/${id}`);
 
//     dispatch({ type: 'FETCH_USER', payload: response.data});
// });