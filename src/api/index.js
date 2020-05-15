export const fetchUsers = () => {
    return fetch('http://localhost:3000/data/users.json');
}

export const fetchPosts = () => {
    return fetch('http://localhost:3000/data/posts.json');
}

export const fetchComments = () => {
    return fetch('http://localhost:3000/data/comments.json');
}