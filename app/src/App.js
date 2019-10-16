import './style.css';
import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
	state = {
		matrix: [
			[null, null, null],
			[null, null, null],
			[null, null, null]
		],
	}
	
	inputs = [];
	
	registerInput = (input, x, y) => {
		if (!this.inputs[x]) {
			this.inputs[x] = [];
		}
		this.inputs[x][y] = input;
	}
	
	getInput = (x, y) => {
		return this.inputs[x][y];
	}
	
	gamerTurn = (rowIndex, columnIndex) => { // ход игрока
		let input = this.getInput(rowIndex, columnIndex);
		if (this.state.matrix[rowIndex][columnIndex] != null) return; // проверить, нет ли чего по данным координатам
		else {
			this.state.matrix[rowIndex][columnIndex] = "x"; // если нет, запомнить крестик в координаты
			input.value = "x"; // и отобразить крестик в инпуте
			input.disabled = true; // и заблокировать поле
		}
		if (!this.isFinished()) {
			this.computerTurn();
		} // проверить, не закончилась ли игра и вызвать computerTurn (), если нет
		this.isFinished();
	}
	
	computerTurn = () => { // ход компьютера - поставить нолик на оставшееся свободное место, запомнить координаты
		for (let i = 0; i < this.state.matrix.length; i++) {
			for (let j = 0; j < this.state.matrix.length; j++) {
				if (this.state.matrix[i][j] === null) {
					this.state.matrix[i][j] = "o"; // поставить нолик
					let input = this.getInput(i, j);
					input.value = "o"; // отобразить нолик в инпуте
					input.disabled = true; // заблокировать тот инпут, куда поставили нолик
					return;
				}
			}
		}
	}
	
	isFinished = () => { //если игра окончена, возвращает победителя или ничью
		let array = [
			[
				[0, 0],
				[0, 1],
				[0, 2]
			],
			[
				[1, 0],
				[1, 1],
				[1, 2]
			],
			[
				[2, 0],
				[2, 1],
				[2, 2]
			],
			[
				[0, 0],
				[1, 0],
				[2, 0]
			],
			[
				[0, 1],
				[1, 1],
				[2, 1]
			],
			[
				[0, 2],
				[1, 2],
				[2, 2]
			],
			[
				[0, 0],
				[1, 1],
				[2, 2]
			],
			[
				[0, 2],
				[1, 1],
				[2, 0]
			]
		];
		
		let winner = "";
		
		for (let i = 0; i < array.length; i++) {
			let line = array[i];
			let count_o = 0;
			let count_x = 0;
			for (let j = 0; j < line.length; j++) {
				let point = line[j];
				let x = point[0];
				let y = point[1];
				if (this.state.matrix[x][y] == "o") {
					count_o++;
				}
				else if (this.state.matrix[x][y] == "x") {
					count_x++;
				}
			}
			if (count_o === 3) {
				document.getElementById("loose").classList.remove("end-game"); // если есть строка с тремя ноликами
				winner = "o";
				return winner;
			} else if (count_x === 3) {
				document.getElementById("win").classList.remove("end-game"); // если есть строка с тремя крестиками
				winner = "x";
				return winner;
			}
		}
		
		if (this.noMoreTurns()) {
			document.getElementById("draw").classList.remove("end-game"); // если ничья
			winner = "-";
			return winner;
		}
		
		return false; // игра не окончена
	}
	
	noMoreTurns = () => { // true, если всё поле уже заполнено
		let result = true;
		for (let i = 0; i < this.state.matrix.length; i++) {
			for (let j = 0; j < this.state.matrix.length; j++) {
				if (this.state.matrix[i][j] === null) {
					result = false;
				}
			}
		}
		return result;
	}
	
	restart = () => { //новая игра - по клику на кнопку очистить матрицу, очистить и разблокировать инпуты + сбросить надписи
		let isFinished = this.isFinished();
		
		if (isFinished === "x") {
			document.getElementById("win").classList.toggle("end-game");
		}
		if (isFinished === "o") {
			document.getElementById("loose").classList.toggle("end-game");
		}
		if (isFinished === "-") {
			document.getElementById("draw").classList.toggle("end-game");
		}
		
		this.state.matrix = [ // обнулить матрицу
			[null, null, null],
			[null, null, null],
			[null, null, null]
		];
		
		for (let i = 0; i < this.state.matrix.length; i++) { // обнулить инпуты
			for (let j = 0; j < this.state.matrix.length; j++) {
				let input = this.getInput(i, j);
				input.value = ""; // очистить инпут
				input.disabled = false; // разблокировать инпут
			}
		}
	}
	
	render() {
		return <div class="main-container">
			<p class="choose">Ты ходишь крестиками, пидор</p>
			
			<div class="input-container">
				<input type="text" id="input00" ref={input => this.registerInput(input, 0, 0)} onClick={() => this.gamerTurn(0,0)} readOnly/>
				<input type="text" id="input01" ref={input => this.registerInput(input, 0, 1)} onClick={() => this.gamerTurn(0,1)} readOnly/>
				<input type="text" id="input02" ref={input => this.registerInput(input, 0, 2)} onClick={() => this.gamerTurn(0,2)} readOnly/>
			</div>
			
			<div class="input-container">
				<input type="text" id="input10" ref={input => this.registerInput(input, 1, 0)} onClick={() => this.gamerTurn(1,0)} readOnly/>
				<input type="text" id="input11" ref={input => this.registerInput(input, 1, 1)} onClick={() => this.gamerTurn(1,1)} readOnly/>
				<input type="text" id="input12" ref={input => this.registerInput(input, 1, 2)} onClick={() => this.gamerTurn(1,2)} readOnly/>
			</div>
			
			<div class="input-container">
				<input type="text" id="input20" ref={input => this.registerInput(input, 2, 0)} onClick={() => this.gamerTurn(2,0)} readOnly/>
				<input type="text" id="input21" ref={input => this.registerInput(input, 2, 1)} onClick={() => this.gamerTurn(2,1)} readOnly/>
				<input type="text" id="input22" ref={input => this.registerInput(input, 2, 2)} onClick={() => this.gamerTurn(2,2)} readOnly/>
			</div>
			
			<p class="end-game" id="win">Ты выиграл, пидор!</p>
			<p class="end-game" id="loose">Ты проиграл, пидор!</p>
			<p class="end-game" id="draw">Ничья, пидор!</p>
			
			<div class="button-container">
				<button onClick={() => this.restart()}>New game, pidor</button>
			</div>
		</div>
	}
}

export default App;
