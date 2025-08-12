import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Activity, AlertCircle, Search, Bell, Settings, ChevronRight, ArrowUpRight, ArrowDownRight, Clock, Star, BarChart3, PieChart, LineChart, Users } from 'lucide-react';

const StockPredictionDashboard = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStock, setSelectedStock] = useState(null);
  const [animatedValues, setAnimatedValues] = useState({});

  // Simulated data
  const portfolioData = {
    totalValue: 125430.50,
    dayChange: 2340.25,
    dayChangePercent: 1.90,
    totalInvested: 100000,
    totalReturn: 25430.50,
    returnPercent: 25.43
  };

  const watchlist = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: 182.52, change: 2.34, changePercent: 1.30, prediction: 'bullish', confidence: 87 },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 141.80, change: -1.20, changePercent: -0.84, prediction: 'neutral', confidence: 62 },
    { symbol: 'MSFT', name: 'Microsoft Corp.', price: 378.85, change: 5.60, changePercent: 1.50, prediction: 'bullish', confidence: 91 },
    { symbol: 'TSLA', name: 'Tesla Inc.', price: 242.84, change: -8.30, changePercent: -3.30, prediction: 'bearish', confidence: 78 },
    { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 495.22, change: 12.45, changePercent: 2.58, prediction: 'bullish', confidence: 94 }
  ];

  const predictions = [
    { symbol: 'AAPL', targetPrice: 195.00, currentPrice: 182.52, timeframe: '1 Week', confidence: 87, signal: 'Strong Buy' },
    { symbol: 'MSFT', targetPrice: 395.00, currentPrice: 378.85, timeframe: '1 Week', confidence: 91, signal: 'Buy' },
    { symbol: 'NVDA', targetPrice: 520.00, currentPrice: 495.22, timeframe: '2 Weeks', confidence: 94, signal: 'Strong Buy' }
  ];

  const topMovers = [
    { symbol: 'AMD', price: 168.92, change: 12.5, changePercent: 8.0 },
    { symbol: 'NFLX', price: 485.20, change: 28.3, changePercent: 6.2 },
    { symbol: 'BA', price: 221.45, change: -15.2, changePercent: -6.4 },
    { symbol: 'DIS', price: 92.30, change: -4.8, changePercent: -4.9 }
  ];

  const recentAlerts = [
    { type: 'prediction', message: 'AAPL reached target price', time: '2 min ago', severity: 'success' },
    { type: 'warning', message: 'TSLA showing bearish signals', time: '15 min ago', severity: 'warning' },
    { type: 'info', message: 'New AI model update available', time: '1 hour ago', severity: 'info' }
  ];
const accessToken = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/protected-view/', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        if (!response.ok) {
          throw new Error("Failed to fetch protected data");
        }
        const data = await response.json();
        console.log("Protected data fetched successfully:", data);
      } catch (error) {
        console.error("Error fetching protected data:", error);
      }
    };
    fetchProtectedData();
  }, []);
  // Animate numbers on mount
  useEffect(() => {
    const targets = {
      portfolio: portfolioData.totalValue,
      dayChange: portfolioData.dayChange,
      returnPercent: portfolioData.returnPercent
    };

    const duration = 1500;
    const steps = 60;
    const increment = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      setAnimatedValues({
        portfolio: (targets.portfolio * easeOutQuart),
        dayChange: (targets.dayChange * easeOutQuart),
        returnPercent: (targets.returnPercent * easeOutQuart)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, increment);

    return () => clearInterval(timer);
  }, []);

  // Load Bootstrap CSS
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  const getPredictionClass = (prediction) => {
    switch(prediction) {
      case 'bullish': return 'text-success';
      case 'bearish': return 'text-danger';
      default: return 'text-warning';
    }
  };

  const getConfidenceClass = (confidence) => {
    if (confidence >= 80) return 'bg-success';
    if (confidence >= 60) return 'bg-warning';
    return 'bg-danger';
  };

  const customStyles = `
    .dashboard-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 2rem;
      color: white;
    }
    
    .glass-card {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 20px;
      padding: 1.5rem;
      transition: all 0.3s ease;
    }
    
    .glass-card:hover {
      background: rgba(255, 255, 255, 0.15);
      transform: translateY(-5px);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    }
    
    .metric-card {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 15px;
      padding: 1.5rem;
      transition: all 0.3s ease;
      height: 100%;
    }
    
    .metric-card:hover {
      transform: scale(1.05);
      background: rgba(255, 255, 255, 0.15);
    }
    
    .icon-box {
      width: 50px;
      height: 50px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.2);
    }
    
    .stock-row {
      background: rgba(255, 255, 255, 0.05);
      border-radius: 10px;
      padding: 1rem;
      margin-bottom: 0.75rem;
      transition: all 0.3s ease;
      cursor: pointer;
    }
    
    .stock-row:hover {
      background: rgba(255, 255, 255, 0.1);
      transform: translateX(5px);
    }
    
    .timeframe-btn {
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: white;
      padding: 0.25rem 0.75rem;
      border-radius: 8px;
      transition: all 0.3s ease;
      font-size: 0.875rem;
    }
    
    .timeframe-btn:hover {
      background: rgba(255, 255, 255, 0.2);
      color: white;
    }
    
    .timeframe-btn.active {
      background: #6c63ff;
      border-color: #6c63ff;
    }
    
    .search-input {
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: white;
      border-radius: 10px;
      padding: 0.5rem 1rem 0.5rem 2.5rem;
    }
    
    .search-input::placeholder {
      color: rgba(255, 255, 255, 0.6);
    }
    
    .search-input:focus {
      background: rgba(255, 255, 255, 0.15);
      border-color: #6c63ff;
      outline: none;
      box-shadow: 0 0 0 0.2rem rgba(108, 99, 255, 0.25);
      color: white;
    }
    
    .prediction-badge {
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 600;
      background: rgba(40, 167, 69, 0.2);
      color: #28a745;
    }
    
    .confidence-bar {
      height: 6px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 3px;
      overflow: hidden;
    }
    
    .confidence-fill {
      height: 100%;
      border-radius: 3px;
      transition: width 1.5s ease-out;
    }
    
    .alert-item {
      background: rgba(255, 255, 255, 0.1);
      border-left: 3px solid;
      padding: 0.75rem;
      border-radius: 8px;
      margin-bottom: 0.5rem;
    }
    
    .alert-success {
      border-left-color: #28a745;
    }
    
    .alert-warning {
      border-left-color: #ffc107;
    }
    
    .alert-info {
      border-left-color: #17a2b8;
    }
    
    .animate-number {
      display: inline-block;
      animation: fadeInUp 0.5s ease-out;
    }
    
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .stock-symbol-badge {
      width: 50px;
      height: 50px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 1.125rem;
    }
    
    .notification-dot {
      width: 10px;
      height: 10px;
      background: #dc3545;
      border-radius: 50%;
      position: absolute;
      top: 5px;
      right: 5px;
      animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
      0% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.2); opacity: 0.8; }
      100% { transform: scale(1); opacity: 1; }
    }
  `;

  return (
    <>
      <style>{customStyles}</style>
      <div className="dashboard-container">
        <div className="container-fluid">
          {/* Header */}
          <div className="row mb-4">
            <div className="col-12">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h1 className="display-4 fw-bold mb-2">Stock Prediction Dashboard</h1>
                  <p className="text-white-50">AI-Powered Market Intelligence</p>
                </div>
                <div className="d-flex gap-3 align-items-center">
                  <div className="position-relative">
                    <Search className="position-absolute" style={{ left: '10px', top: '50%', transform: 'translateY(-50%)', width: '20px', height: '20px', opacity: 0.6 }} />
                    <input
                      type="text"
                      className="form-control search-input"
                      placeholder="Search stocks..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{ width: '250px' }}
                    />
                  </div>
                  <button className="btn position-relative" style={{ background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.2)', color: 'white' }}>
                    <Bell size={20} />
                    <span className="notification-dot"></span>
                  </button>
                  <button className="btn" style={{ background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.2)', color: 'white' }}>
                    <Settings size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Portfolio Overview Cards */}
          <div className="row mb-4">
            <div className="col-md-4 mb-3">
              <div className="metric-card">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div className="icon-box" style={{ background: 'rgba(59, 130, 246, 0.2)' }}>
                    <DollarSign size={24} color="#3b82f6" />
                  </div>
                  <small className="text-white-50">Portfolio Value</small>
                </div>
                <h3 className="fw-bold mb-2 animate-number">
                  ${animatedValues.portfolio?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00'}
                </h3>
                <div className="d-flex align-items-center gap-2">
                  {portfolioData.dayChange >= 0 ? (
                    <ArrowUpRight size={16} className="text-success" />
                  ) : (
                    <ArrowDownRight size={16} className="text-danger" />
                  )}
                  <span className={portfolioData.dayChange >= 0 ? 'text-success' : 'text-danger'}>
                    ${Math.abs(animatedValues.dayChange || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ({portfolioData.dayChangePercent}%)
                  </span>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className="metric-card">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div className="icon-box" style={{ background: 'rgba(34, 197, 94, 0.2)' }}>
                    <TrendingUp size={24} color="#22c55e" />
                  </div>
                  <small className="text-white-50">Total Return</small>
                </div>
                <h3 className="fw-bold mb-2 animate-number">
                  ${portfolioData.totalReturn.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </h3>
                <div className="d-flex align-items-center gap-2">
                  <ArrowUpRight size={16} className="text-success" />
                  <span className="text-success">
                    +{animatedValues.returnPercent?.toFixed(2) || '0.00'}%
                  </span>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className="metric-card">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div className="icon-box" style={{ background: 'rgba(168, 85, 247, 0.2)' }}>
                    <Activity size={24} color="#a855f7" />
                  </div>
                  <small className="text-white-50">AI Confidence</small>
                </div>
                <h3 className="fw-bold mb-2 animate-number">89%</h3>
                <div className="progress" style={{ height: '8px', background: 'rgba(255, 255, 255, 0.2)' }}>
                  <div 
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: '89%', background: 'linear-gradient(90deg, #a855f7, #3b82f6)' }}
                    aria-valuenow={89}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="row">
            {/* Watchlist */}
            <div className="col-lg-8 mb-4">
              <div className="glass-card">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h2 className="h4 fw-bold d-flex align-items-center gap-2">
                    <Star size={20} color="#fbbf24" />
                    Watchlist
                  </h2>
                  <div className="btn-group" role="group">
                    {['1D', '1W', '1M', '3M', '1Y'].map((tf) => (
                      <button
                        key={tf}
                        type="button"
                        onClick={() => setSelectedTimeframe(tf)}
                        className={`btn timeframe-btn ${selectedTimeframe === tf ? 'active' : ''}`}
                      >
                        {tf}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  {watchlist.map((stock, index) => (
                    <div key={stock.symbol} className="stock-row">
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center gap-3">
                          <div className="stock-symbol-badge">
                            {stock.symbol.slice(0, 2)}
                          </div>
                          <div>
                            <h5 className="mb-1 fw-semibold">{stock.symbol}</h5>
                            <small className="text-white-50">{stock.name}</small>
                          </div>
                        </div>

                        <div className="d-flex align-items-center gap-4">
                          <div className="text-end">
                            <div className="fw-semibold">${stock.price.toFixed(2)}</div>
                            <small className={stock.change >= 0 ? 'text-success' : 'text-danger'}>
                              {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent}%)
                            </small>
                          </div>

                          <div className="text-center" style={{ minWidth: '100px' }}>
                            <div className={`fw-bold small ${getPredictionClass(stock.prediction)}`}>
                              {stock.prediction.toUpperCase()}
                            </div>
                            <div className="d-flex align-items-center gap-1 mt-1">
                              <div className="confidence-bar flex-grow-1" style={{ width: '60px' }}>
                                <div 
                                  className={`confidence-fill ${getConfidenceClass(stock.confidence)}`}
                                  style={{ width: `${stock.confidence}%` }}
                                ></div>
                              </div>
                              <small className="text-white-50">{stock.confidence}%</small>
                            </div>
                          </div>

                          <ChevronRight size={20} className="text-white-50" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="col-lg-4">
              {/* AI Predictions */}
              <div className="glass-card mb-4">
                <h3 className="h5 fw-bold mb-3 d-flex align-items-center gap-2">
                  <BarChart3 size={20} color="#3b82f6" />
                  AI Predictions
                </h3>
                <div>
                  {predictions.map((pred, index) => (
                    <div key={index} className="mb-3 p-3" style={{ background: 'rgba(255, 255, 255, 0.05)', borderRadius: '10px' }}>
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <div>
                          <h6 className="fw-semibold mb-0">{pred.symbol}</h6>
                          <small className="text-white-50">{pred.timeframe}</small>
                        </div>
                        <span className="badge" style={{ background: 'rgba(34, 197, 94, 0.2)', color: '#22c55e' }}>
                          {pred.signal}
                        </span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <small>
                          <span className="text-white-50">Target: </span>
                          <span className="text-success fw-semibold">${pred.targetPrice}</span>
                        </small>
                        <small>
                          <span className="text-white-50">Conf: </span>
                          <span className="fw-semibold">{pred.confidence}%</span>
                        </small>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Movers */}
              <div className="glass-card mb-4">
                <h3 className="h5 fw-bold mb-3 d-flex align-items-center gap-2">
                  <TrendingUp size={20} color="#22c55e" />
                  Top Movers
                </h3>
                <div>
                  {topMovers.map((stock, index) => (
                    <div key={index} className="d-flex justify-content-between align-items-center mb-2">
                      <span className="fw-medium">{stock.symbol}</span>
                      <div className="text-end">
                        <div className="small">${stock.price.toFixed(2)}</div>
                        <small className={stock.change >= 0 ? 'text-success' : 'text-danger'}>
                          {stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(1)}%
                        </small>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Alerts */}
              <div className="glass-card">
                <h3 className="h5 fw-bold mb-3 d-flex align-items-center gap-2">
                  <AlertCircle size={20} color="#fbbf24" />
                  Recent Alerts
                </h3>
                <div>
                  {recentAlerts.map((alert, index) => (
                    <div key={index} className={`alert-item alert-${alert.severity}`}>
                      <div className="fw-medium small">{alert.message}</div>
                      <div className="text-white-50 d-flex align-items-center gap-1 mt-1" style={{ fontSize: '0.75rem' }}>
                        <Clock size={12} />
                        {alert.time}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StockPredictionDashboard;