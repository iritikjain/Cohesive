import axios from 'axios';
axios.defaults.headers.common['Authorization'] = `token ${window.localStorage.getItem("token")}`;

export function getFriends(){
    return axios.get('http://127.0.0.1:8000/profile/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }}) 
      .then(response => response.data)
}

export function addFriend(friend){
  return axios.put('http://127.0.0.1:8000/profile/', {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    friends: friend.friends.value,
  })
    .then(response => response.data)
}

export function deleteFriend(){
  return axios.put('http://127.0.0.1:8000/profile/', {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  })
    .then(response => response.data)
}

export function getBudget(){
  return axios.get('http://127.0.0.1:8000/profile/', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }}) 
    .then(response => response.data)
}


export function addBudget(budget){
  return axios.put('http://127.0.0.1:8000/profile/', {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    budget: budget.budget.value,
})
  .then(response => response.data)
}