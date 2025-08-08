import React from 'react'
import { Link } from 'react-router-dom';
const main = () => {
  return (
   <>

      <div className="d-flex justify-content-center align-items-center min-vh-100 bg-dark">
            <div className="card p-4" style={{ width: '600px', height: '500px', borderRadius: '20px', boxShadow: '0 15px 25px rgba(0,0,0,0.2)' }}>
                <div className="card-body d-flex flex-column justify-content-between">
                    <h2 className="card-title text-center fw-bold text-primary">Welcome to Stock Prediction</h2>
                    <p className="card-text text-center fs-5 text-muted">
                        Discover intelligent stock predictions powered by cutting-edge AI.
                        Start exploring market trends and forecasts to make smart investment decisions.
                    </p>
                    <div className="text-center">
                        <button className="btn btn-outline-primary btn-lg w-100"><Link to="/login">Get Started</Link></button>
                    </div>
                </div>
            </div>
        </div>

   </>
  )
}

export default main
