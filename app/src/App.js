import React from 'react';

class App extends React.Component {
    state = {
        value: [],
    }


    render() {
        return   <div class="main-container">
            <p class="choose">Ты ходишь крестиками, пидор</p>

        <div class="input-container">
            <input type="text" id="input00" onclick="game.gamerTurn(0,0)" readonly>
        <input type="text" id="input01" onclick="game.gamerTurn(0,1)" readonly>
        <input type="text" id="input02" onclick="game.gamerTurn(0,2)" readonly>
        </div>

        <div class="input-container">
            <input type="text" id="input10" onclick="game.gamerTurn(1,0)" readonly>
        <input type="text" id="input11" onclick="game.gamerTurn(1,1)" readonly>
        <input type="text" id="input12" onclick="game.gamerTurn(1,2)" readonly>
        </div>

        <div class="input-container">
            <input type="text" id="input20" onclick="game.gamerTurn(2,0)" readonly>
        <input type="text" id="input21" onclick="game.gamerTurn(2,1)" readonly>
        <input type="text" id="input22" onclick="game.gamerTurn(2,2)" readonly>
        </div>

        <p class="end-game" id="win">Ты выиграл, пидор!</p>
        <p class="end-game" id="loose">Ты проиграл, пидор!</p>
        <p class="end-game" id="draw">Ничья, пидор!</p>

        <div class="button-container">
            <button onclick="game.restart()">New game, pidor</button>
        </div>
        </div>
    }
}

export default App;
