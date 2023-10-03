import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import newRequest from '../../utils/newRequest'

const Success = () => {
  const { search } = useLocation()
  const params = new URLSearchParams(search)
  const payment_intent = params.get("payment_intent")
  const navigate = useNavigate()

  useEffect(() => {
   const makeRequest = async () => {
    try {
      await newRequest.put(`/orders`, {
      payment_intent,
      });
      setTimeout(()=> {
        navigate(`/orders`)
      }, 5000)
    } catch (err) {
      console.log(err)
    }
  };
    makeRequest()
  }, [])
  return (
    <div>
      Payment successful. You are being redirected to the orders page. Please do
      not leave this page.
    </div>
  );
}

export default Success