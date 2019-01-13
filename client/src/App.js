import React, { Component } from 'react';
import './App.css';
import Today from './Today/Today'
import History from './History/History'

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
                                <a className="navbar-item" href="https://github.com/justinkook" target="_blank" rel="noopener noreferrer">Github</a>
                            </div>
                        </nav>
                    </header>
                </div>
                <section className="results--section">
                    <div className="container">
                        <h1>CoinCheck is a realtime price information about<br></br> BTC, ETH and LTC.</h1>
                    </div>
                    <div className="results--section__inner">
                        <Today />
                        <History />
                    </div>
                </section>
            </div>
        );
    }
}

export default App;
