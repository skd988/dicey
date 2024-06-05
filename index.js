import Dice from "./dice.js";

const sum = arrayToSum => arrayToSum.reduce((sum, val) => sum + val);

const getProbabilitiesBySum = diceResults =>
{
	return Object.entries(diceResults.reduce((resultsBySum, result) =>
    {
      const resultSum = sum(result.outcome);
      if(!resultsBySum[resultSum])
        resultsBySum[resultSum] = [result]
      else
        resultsBySum[resultSum].push(result);
      
      return resultsBySum;
    }, {}))
			.map(([sum, resultsOfSum]) =>
		({
			outcome: sum,
			prob: resultsOfSum.reduce((probSum, result) => probSum + result.prob, 0)
		}));
};

const createElementFromHtml = htmlString => 
{
	const elem = document.createElement('template');
	elem.innerHTML = htmlString.trim();
	return elem.content;
};

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
	const numOfRollsElement = document.getElementById('num-of-rolls');
	
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
	let modifier = parseFloat(modifierInputElement?.value);
	facesValueElement.innerText = faces
	diceValueElement.innerText = numOfDice;
	modifierValueElement.innerText = modifier;

	
	const pushToHistory = result => {
		history.push(result.outcome);
		numOfRollsElement.textContent = history.length;
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
		numOfRollsElement.textContent = history.length;
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
		numOfRollsElement.textContent = 0;
	};

	const newHistoryDistributionDisplay = () =>
	{
		const distribution = bySum? historyDistributionBySum : historyDistribution;
		const newDisplayStats = document.createElement('template');
		const newDisplayBar = document.createElement('template');
		Object.entries(distribution).forEach(([outcome, numOfRolls]) => 
		{
			newDisplayStats.innerHTML +=
			`<li>
				<p class="inline">${outcome}: </p>
				<p class="inline">${numOfRolls}</p>
			</li>`;
			newDisplayBar.innerHTML +=
			`<li>
				<progress max=${history.length} value=${numOfRolls}></progress>
			</li>`;
		});
		historyDistributionElement.children[0].innerHTML = newDisplayStats.innerHTML;
		historyDistributionElement.children[1].innerHTML = newDisplayBar.innerHTML;
	}
	
	const updateHistoryDistributionDisplay = () => 
	{
		const distribution = bySum? historyDistributionBySum : historyDistribution;
		Object.entries(distribution).forEach(([outcome, numOfRolls], index) => {
			const numOfRollsDisplay = historyDistributionElement.children[0].children[index].children[1];
			const progressDisplay = historyDistributionElement.children[1].children[index].children[0];
			numOfRollsDisplay.innerText = numOfRolls;
			progressDisplay.max = history.length;
			progressDisplay.value = numOfRolls;
		});
	};
	
	const newProbabilityDisplay = () =>
	{
		const probabilities = bySum? getProbabilitiesBySum(diceResults) : diceResults;
		const newStatsDisplay = document.createElement('template');
		const newBarDisplay = document.createElement('template');
		probabilities.forEach(probability => 
		{
			newStatsDisplay.innerHTML += 
			`<li>
				<p class="inline">${probability.outcome}: </p>
				<p class="inline">${probability.prob}</p>
			</li>`;
			newBarDisplay.innerHTML += 
			`<li>
				<progress value=${probability.prob}></progress>
			</li>`;
		});
		probabilityDisplayElement.children[0].innerHTML = newStatsDisplay.innerHTML;
		probabilityDisplayElement.children[1].innerHTML = newBarDisplay.innerHTML;
	};
	
	const updateProbabilityDisplay = () => 
	{
		const probabilities = bySum? getProbabilitiesBySum(diceResults) : diceResults;
		probabilities.forEach((probability, index) => {
			probabilityDisplayElement.children[0].children[index].children[1].innerText = probability.prob;
			probabilityDisplayElement.children[1].children[index].children[0].value = probability.prob;
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
	};
	
	const unroll = () =>
	{
		if (history.length)
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
	};

	initialize();
	
	bySumCheckboxElement?.addEventListener('input', e => 
	{
		bySum = bySumCheckboxElement?.checked;
		newProbabilityDisplay();
		newHistoryDistributionDisplay();
	});
	
	historyCheckboxElement?.addEventListener('input', e => 
	{
		historyVisible = historyCheckboxElement?.checked;
		historyDistributionElement?.classList.toggle("hidden");
	});
	
	probabilitiesCheckboxElement?.addEventListener('input', e => 
	{
		probabilitiesVisible = probabilitiesCheckboxElement?.checked;
		probabilityDisplayElement?.classList.toggle("hidden");
	});
	
	diceInputElement?.addEventListener('input', e => 
	{
		numOfDice = parseInt(diceInputElement?.value);
		diceValueElement.innerText = numOfDice;
		initialize();
	});
	
	facesInputElement?.addEventListener('input', e => 
	{
		faces = parseInt(facesInputElement?.value);
		facesValueElement.innerText = faces;
		initialize();
	});
	
	modifierInputElement?.addEventListener('input', e => 
	{
		modifier = parseFloat(modifierInputElement?.value);
		modifierValueElement.innerText = modifier;
		initialize();
	});
	
	document.getElementById('roll-button')?.addEventListener('click', roll);
	
	document.addEventListener('keydown', e => 
	{
		if (e.key === ' ' || e.key === '\n')
		{
			e.preventDefault();
			roll();
		}
		else if (e.key === 'u')
			unroll();
		else if (e.key === 'r')
			initialize();
	});
	
	document.getElementById('reset-button')?.addEventListener('click', e => 
	{
		initialize();
	});
	
	document.getElementById('unroll-button')?.addEventListener('click', unroll);
});
