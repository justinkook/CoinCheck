import React, { Component } from 'react';
import './App.css';
import Today from './Today/Today'
import History from './History/History'
import AreaChart from './Chart/AreaChart';

class App extends Component {
    render() {
        return (
            <div className="">
                <div className="topheader">
                    <header className="container">
                        <nav className="navbar">
                            <div className="navbar-brand">
                                <span className="navbar-item">CoinCheck</span>
                            </div>
                            <div className="navbar-end">
                                <a className="navbar-item" href="https://github.com/justinkook/CoinCheck" target="_blank" rel="noopener noreferrer">Github</a>
                            </div>
                        </nav>
                    </header>
                </div>
                <section className="results--section">
                    <div className="container">
                        <h1>Core Performance (BTC)</h1>
                    </div>
                    <div className="results--section__inner">
                        <AreaChart />
                        <Today />
                    </div>
                </section>
            </div>
        );
    }
}

export default App;
