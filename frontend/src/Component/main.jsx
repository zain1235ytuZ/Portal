import React from 'react';
import { Link } from 'react-router-dom';

const Main = () => {
  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center min-vh-100"
        style={{
          background: "linear-gradient(135deg, #a855f7, #6610f2)",
        }}
      >
        <div
          className="card p-4 border-0"
          style={{
            width: '600px',
            height: '500px',
            borderRadius: '20px',
            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.3)',
            background: 'white',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.02)';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.3)';
          }}
        >
          <div className="card-body d-flex flex-column justify-content-between text-center">
            <h2 className="fw-bold text-primary display-5 mb-4" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.1)' }}>
              Welcome to Stock Prediction
            </h2>
            <p className="fs-5 text-muted px-3">
              Discover intelligent stock predictions powered by cutting-edge AI.
              Start exploring market trends and forecasts to make smart investment decisions.
            </p>
            <div className="mt-4">
              <Link
                to="/Dashboard"
                className="btn btn-primary btn-lg w-100 shadow-sm"
                style={{
                  fontWeight: '600',
                  borderRadius: '10px',
                  textDecoration: 'none',
                }}
              >
                🚀 Explore Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
