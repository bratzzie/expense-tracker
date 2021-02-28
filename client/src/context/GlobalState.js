import React, { createContext, useReducer } from "react";
import axios from 'axios'

import AppReducer from "./AppReducer";
import { config } from "dotenv/types";


const initialState = {
  transactions: [],
  error: null,
  loading: true
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  async function getTransactions() {
    try {
      const res = await axios.get('/api/v1/transactions')

      dispatch({
        type: 'GET_TRANSACTIONS',
        payload: res.data.data
      })
    } catch (error) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: error.response.data.error
      })
    }
  }

 async function deleteTransaction(id) {
   try {
     await axios.delete(`/api/v1/transactions/${id}`)

      dispatch({
      type: "DELETE_TRANSACTION",
      payload: id,
             });

   } catch (error) {
     dispatch({
       type: 'TRANSACTION_ERROR',
       payload: error.response.data.error
     })
   }
  }

  async function addTransaction(transaction) {

    try {
      const res = await axios.post('/api/v1/transactions', transaction, config)  
      
      dispatch({
        type: 'ADD_TRANSACTION',
        payload: res.data.data
      })      
   
    } catch (error) {
       dispatch({
        type: 'TRANSACTION_ERROR',
        payload: error.response.data.error
      })
    }

    dispatch({
      type: "ADD_TRANSACTION",
      payload: transaction,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        deleteTransaction,
        error: state.error,
        loading: state.loading,
        getTransactions,
        addTransaction
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
