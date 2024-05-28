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

const createElementFromHtml = htmlString => 
{
	const elem = document.createElement('template');
	elem.innerHTML = htmlString.trim();
	return elem.content;
}

document.addEventListener('DOMContentLoaded', event => {
	const probabilityDisplayElement = document.getElementById('probabilities');
	const historyListElement = document.getElementById('history');
	const historyDistributionElement = document.getElementById('history-distribution');
	const bySumCheckboxElement = document.getElementById('by-sum-checkbox');
	const historyCheckboxElement = document.getElementById('hide-history-checkbox');
	const probabilitiesCheckboxElement = document.getElementById('hide-probabilities-checkbox');
	const diceInputElement = document.getElementById('dice-input');
	const facesInputElement = document.getElementById('faces-input');
	const modifierInputElement = document.getElementById('modifier-input');
	const diceValueElement = document.getElementById('dice-value');
	const facesValueElement = document.getElementById('faces-value');
	const modifierValueElement = document.getElementById('modifier-value');
	const resultElement = document.getElementById('result');
	
	let diceResults;
	let history;
	let historyDistribution;
	let historyDistributionBySum;
	let probs;
	let numOfDice = parseInt(diceInputElement?.value);
	let faces = parseInt(facesInputElement?.value);
	let bySum = bySumCheckboxElement?.checked;
	let historyVisible = historyCheckboxElement?.checked;
	let probabilitiesVisible = probabilitiesCheckboxElement?.checked;
	let modifier = parseInt(modifierInputElement?.value);
	facesValueElement.innerText = faces
	diceValueElement.innerText = numOfDice;
	modifierValueElement.innerText = modifier;

	
	const pushToHistory = result => {
		history.push(result.outcome);
		historyDistributionBySum[sum(result.outcome)] += 1;
		historyDistribution[result.outcome] += 1;

		historyListElement.insertBefore(createElementFromHtml(
		`<li>
			<p>${sum(result.outcome)}: ${result.outcome}</p>
		</li>`), 
		historyListElement.firstChild);
		
	};
	
	const popFromHistory = () => {
		const lastRollOutcome = history.pop();
		historyDistributionBySum[sum(lastRollOutcome)] -= 1;
		historyDistribution[lastRollOutcome] -= 1;

		historyListElement.removeChild(historyListElement.firstElementChild);

		return lastRollOutcome
	}
	
	const initialize = () => 
	{

		diceResults = Dice.initNewDiceResults(faces, numOfDice);
		if(historyCheckboxElement.checked)
			historyDistributionElement?.classList.add("hidden");
		
		if(probabilitiesCheckboxElement.checked)
			probabilityDisplayElement?.classList.add("hidden");

		history = [];
		historyDistributionBySum = Object.fromEntries((diceResults.map(res => sum(res.outcome))).map(sum => [sum, 0]));
		historyDistribution = Object.fromEntries(diceResults.map(res => [res.outcome, 0]));
		newHistoryDistributionDisplay();
		newProbabilityDisplay();
		historyListElement.textContent = '';
		resultElement.textContent = '';
	};

	const newHistoryDistributionDisplay = () =>
	{
		const distribution = bySum? historyDistributionBySum : historyDistribution;
		const newDisplayFrag = document.createDocumentFragment();
		Object.entries(distribution).forEach(([outcome, numOfRolls]) => 
			newDisplayFrag.appendChild(createElementFromHtml(
			`<li>
				<p style="display: inline">${outcome}: </p>
				<progress max=${history.length} value=${numOfRolls}></progress>
				<p style="display: inline">${numOfRolls}</p>
			</li>`))
		);
		historyDistributionElement.textContent = '';
		historyDistributionElement?.appendChild(newDisplayFrag);
	}
	
	const updateHistoryDistributionDisplay = () => 
	{
		const distribution = bySum? historyDistributionBySum : historyDistribution;
		Object.entries(distribution).forEach(([outcome, numOfRolls], index) => {
			historyDistributionElement.children[index].children[1].value = numOfRolls;
			historyDistributionElement.children[index].children[1].max = history.length;
			historyDistributionElement.children[index].children[2].innerText = numOfRolls;
		});
	};
	
	const newProbabilityDisplay = () =>
	{
		const probabilities = bySum? getProbabilitiesBySum(diceResults) : diceResults;
		const newDisplayFrag = document.createDocumentFragment();
		probabilities.forEach(probability => 
			newDisplayFrag.appendChild(createElementFromHtml(
			`<li>
				<p style="display: inline">${probability.outcome}: </p>
				<progress value=${probability.prob}></progress>
				<p style="display: inline">${probability.prob}</p>
			</li>`))
		);
		probabilityDisplayElement.textContent = '';
		probabilityDisplayElement.appendChild(newDisplayFrag);
	};
	
	const updateProbabilityDisplay = () => 
	{
		const probabilities = bySum? getProbabilitiesBySum(diceResults) : diceResults;
		probabilities.forEach((probability, index) => {
			probabilityDisplayElement.children[index].children[1].value = probability.prob;
			probabilityDisplayElement.children[index].children[2].innerText = probability.prob;
		});
	};
	
	const roll = () =>
	{
		const result = Dice.roll(diceResults);
		diceResults = Dice.modifyProbabilities(diceResults, result.outcome, modifier);
		resultElement.innerText = sum(result.outcome) + ': ' + result.outcome;
		pushToHistory(result);
		updateProbabilityDisplay();
		updateHistoryDistributionDisplay();		
	}
	
	initialize();
	
	bySumCheckboxElement?.addEventListener('change', e => 
	{
		bySum = bySumCheckboxElement?.checked;
		newProbabilityDisplay();
		newHistoryDistributionDisplay();
	});
	
	historyCheckboxElement?.addEventListener('change', e => 
	{
		historyVisible = historyCheckboxElement?.checked;
		historyDistributionElement?.classList.toggle("hidden");
	});
	
	probabilitiesCheckboxElement?.addEventListener('change', e => 
	{
		probabilitiesVisible = probabilitiesCheckboxElement?.checked;
		probabilityDisplayElement?.classList.toggle("hidden");
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
		facesValueElement.innerText = faces;
		initialize();
	});
	
	modifierInputElement?.addEventListener('change', e => 
	{
		modifier = parseInt(modifierInputElement?.value);
		modifierValueElement.innerText = modifier;
		initialize();
	});
	
	document.getElementById('roll-button')?.addEventListener('click', roll);
	
	document.addEventListener('keydown', e => 
	{
		if (e.keyCode === 32 || e.keyCode === 13)
		{
			e.preventDefault();
			roll();
		}
	});
	
	document.getElementById('reset-button')?.addEventListener('click', e => 
	{
		initialize();
	});
	
	document.getElementById('unroll-button')?.addEventListener('click', e => 
	{
		if (history.length > 0)
		{
			diceResults = Dice.modifyProbabilities(diceResults, popFromHistory(), modifier, {cancelLastRoll: true});
			updateProbabilityDisplay();
			updateHistoryDistributionDisplay();
			if (history.length > 0)
			{
				const previousResult = history[history.length - 1];
				resultElement.innerText = sum(previousResult) + ': ' + previousResult;				
			}
			else
				resultElement.innerText = '';
		}
	});
});