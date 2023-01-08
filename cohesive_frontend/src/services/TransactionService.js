import axios from 'axios';
axios.defaults.headers.common['Authorization'] = `token ${window.localStorage.getItem("token")}`;

export function getTransactions(){
    return axios.get('http://127.0.0.1:8000/transaction/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }}) 
      .then(response => response.data)
}

export function addTransaction(transaction){
  return axios.post('http://127.0.0.1:8000/transaction/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    transactionId: null,
    createdBy: null,
    category: transaction.category.value,
    totalAmount: transaction.totalAmount.value,
    payee: transaction.payee.value,
    payers: transaction.payers.value,
    date: null,
    amount: null
  })
    .then(response => response.data)
}

export function updateTransaction(transId, transaction){
  return axios.put('http://127.0.0.1:8000/transaction/' + transId + '/', {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    transactionId: null,
    createdBy: null,
    category: transaction.category.value,
    totalAmount: transaction.totalAmount.value,
    payee: transaction.payee.value,
    payers: transaction.payers.value,
    date: null,
    amount: null
  })
    .then(response => response.data)
}

export function deleteTransaction(transId){
  return axios.delete('http://127.0.0.1:8000/transaction/' + transId + '/', {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  })
    .then(response => response.data)
}