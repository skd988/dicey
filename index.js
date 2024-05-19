import { Dice } from "./dice.js";


const historyElement = document.getElementById('history');
document.addEventListener('DOMContentLoaded', () => {
	let dice;
	let history;
	let probs;
	let bySum = true;
	const probabilityListElement = document.getElementById('probabilities');
	const historyListElement = document.getElementById('history');
	
	const addToHistory = result => {
		history.push(result);
		let newEntry = document.createElement('li');
		newEntry.innerText = result;
		historyListElement.appendChild(newEntry);
	};
	
	const initialize = () => 
	{
		dice = Dice(6, 2);
		history = [];
	};
	
	const updateProbabilityList = bySum => {
		probs = dice.getProbabilities(bySum);
		probabilityListElement.innerText = '';
		probs.forEach(prob => {
			let probElement = document.createElement('li');
			probElement.innerText = prob.val + ': ' + prob.prob;
			probabilityListElement.appendChild(probElement);
		});
	}
	
	initialize();
	updateProbabilityList(bySum);
	
	
	
	document.getElementById('roll-button')?.addEventListener('click', () => {
		const result = dice.roll();
		history.push(result);
		document.getElementById('result').innerText = result;
		addToHistory(result);
		updateProbabilityList(bySum);
	});

});