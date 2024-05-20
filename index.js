import { Dice } from "./dice.js";

document.addEventListener('DOMContentLoaded', event => {
	const probabilityListElement = document.getElementById('probabilities');
	const historyListElement = document.getElementById('history');
	const bySumCheckboxElement = document.getElementById('by-sum-checkbox');
	const diceInputElement = document.getElementById('dice-input');
	const facesInputElement = document.getElementById('faces-input');
	const diceValueElement = document.getElementById('dice-value');
	const facesValueElement = document.getElementById('faces-value');
	const resultElement = document.getElementById('result');
	
	let dice;
	let history;
	let probs;
	let numOfDice = parseInt(diceInputElement.value);
	let faces = parseInt(facesInputElement.value);
	let bySum = bySumCheckboxElement?.checked;
	facesValueElement.innerText = faces
	diceValueElement.innerText = numOfDice;
	
	
	const addToHistory = result => {
		history.push(result);
		let newEntry = document.createElement('li');
		newEntry.innerText = result.sum + ': ' + result.val;
		historyListElement.appendChild(newEntry);
	};
	
	const initialize = () => 
	{
		dice = Dice(faces, numOfDice);
		history = [];
		historyListElement.textContent = '';
		resultElement.innerText = '';
		updateProbabilityList();
	};
	
	const updateProbabilityList = () => 
	{
		probs = dice.getProbabilities(bySum);
		probabilityListElement.textContent = '';
		probs.forEach(prob => {
			let probElement = document.createElement('li');
			probElement.innerText = prob.val + ': ' + prob.prob;
			probabilityListElement.appendChild(probElement);
		});
	};
	
	initialize();
	
	bySumCheckboxElement?.addEventListener('change', e => 
	{
		bySum = bySumCheckboxElement?.checked;
		updateProbabilityList();
	});
	
	diceInputElement?.addEventListener('change', e => 
	{
		numOfDice = parseInt(diceInputElement?.value);
		diceValueElement.innerText = numOfDice;
		initialize();
	});
	
	facesInputElement?.addEventListener('change', e => 
	{
		faces = parseInt(facesInputElement?.value);
		facesValueElement.innerText = faces
		initialize();
	});
	
	document.getElementById('roll-button')?.addEventListener('click', e => 
	{
		const result = dice.roll();
		resultElement.innerText = result.sum + ': ' + result.val;
		addToHistory(result);
		updateProbabilityList();
	});
});