import * as Dice from "./dice.js";

const sum = arrayToSum => arrayToSum.reduce((sum, val) => sum + val);

const splitArrayByCategories = (arrayToSplit, getCategory) =>
{
    return arrayToSplit.reduce((splitted, obj) => {
        let category = getCategory(obj);
        if (splitted[category] === undefined)
            splitted[category] = [obj];
        else
            splitted[category].push(obj);
		return splitted;
    }, {});
};

const getProbabilitiesBySum = diceResults =>
{
	return Object.entries(splitArrayByCategories(diceResults, res => sum(res.outcome)))
			.map(([sum, resultsOfSum]) =>
		({
			outcome: sum,
			prob: resultsOfSum.reduce((probSum, result) => probSum + result.prob, 0)
		}));
}

document.addEventListener('DOMContentLoaded', event => {
	const probabilityListElement = document.getElementById('probabilities');
	const historyListElement = document.getElementById('history');
	const bySumCheckboxElement = document.getElementById('by-sum-checkbox');
	const diceInputElement = document.getElementById('dice-input');
	const facesInputElement = document.getElementById('faces-input');
	const diceValueElement = document.getElementById('dice-value');
	const facesValueElement = document.getElementById('faces-value');
	const resultElement = document.getElementById('result');
	
	let diceResults;
	let history;
	let probs;
	let numOfDice = parseInt(diceInputElement.value);
	let faces = parseInt(facesInputElement.value);
	let bySum = bySumCheckboxElement?.checked;
	let modifier = 2;
	facesValueElement.innerText = faces
	diceValueElement.innerText = numOfDice;
	
	
	const addToHistory = result => {
		history.push(result);
		let newEntry = document.createElement('li');
		newEntry.innerText = sum(result.outcome) + ': ' + result.outcome;
		historyListElement.appendChild(newEntry);
	};
	
	const initialize = () => 
	{
		diceResults = Dice.initNewDiceResults(faces, numOfDice);
		history = [];
		historyListElement.textContent = '';
		resultElement.innerText = '';
		updateProbabilityList();
	};
	
	const updateProbabilityList = () => 
	{
		probs = bySum? getProbabilitiesBySum(diceResults) : diceResults;
		probabilityListElement.textContent = '';
		probs.forEach(prob => {
			let probElement = document.createElement('li');
			probElement.innerText = prob.outcome + ': ' + prob.prob;
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
		const result = Dice.roll(diceResults);
		diceResults = Dice.modifyProbabilities(diceResults, result, modifier);
		resultElement.innerText = sum(result.outcome) + ': ' + result.outcome;
		addToHistory(result);
		updateProbabilityList();
	});
});