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

const diceDisplay = (result) => {
	return result.map(die => createElementFromHtml(
		`<svg viewBox="0 0 100 100" class="die">
			<rect x="15" y="15" height="70" width="70" rx="12"></rect>`
			+
			(die === 1 ?
				`<circle cx="50" cy="50" r="7" />`
			: die === 2 ?
			`<g>
				<circle cx="33" cy="33" r="7" />
				<circle cx="67" cy="67" r="7" />
			</g>`
			: die === 3 ?
			`<g>
				<circle cx="33" cy="33" r="7" />
				<circle cx="50" cy="50" r="7" />
				<circle cx="67" cy="67" r="7" />
			</g>`
			: die === 4 ?
			`<g>
				<circle cx="33" cy="33" r="7" />
				<circle cx="33" cy="67" r="7" />
				<circle cx="67" cy="33" r="7" />
				<circle cx="67" cy="67" r="7" />
			</g>`
			: die === 5 ?
			`<g>
				<circle cx="33" cy="33" r="7" />
				<circle cx="33" cy="67" r="7" />
				<circle cx="50" cy="50" r="7" />
				<circle cx="67" cy="33" r="7" />
				<circle cx="67" cy="67" r="7" />
			</g>`
			: die === 6 ?
			`<g>
				<circle cx="33" cy="33" r="7" />
				<circle cx="33" cy="50" r="7" />
				<circle cx="33" cy="67" r="7" />
				<circle cx="67" cy="33" r="7" />
				<circle cx="67" cy="50" r="7" />
				<circle cx="67" cy="67" r="7" />
			</g>`
			: die === 7 ?
			`<g>
				<circle cx="33" cy="33" r="7" />
				<circle cx="33" cy="50" r="7" />
				<circle cx="33" cy="67" r="7" />
				<circle cx="50" cy="50" r="7" />
				<circle cx="67" cy="33" r="7" />
				<circle cx="67" cy="50" r="7" />
				<circle cx="67" cy="67" r="7" />
			</g>`
			: die === 8 ?
			`<g>
				<circle cx="33" cy="33" r="7" />
				<circle cx="33" cy="50" r="7" />
				<circle cx="33" cy="67" r="7" />
				<circle cx="50" cy="33" r="7" />
				<circle cx="50" cy="67" r="7" />
				<circle cx="67" cy="33" r="7" />
				<circle cx="67" cy="50" r="7" />
				<circle cx="67" cy="67" r="7" />
			</g>`
			: die === 9 ?
			`<g>
				<circle cx="33" cy="33" r="7" />
				<circle cx="33" cy="50" r="7" />
				<circle cx="33" cy="67" r="7" />
				<circle cx="50" cy="33" r="7" />
				<circle cx="50" cy="50" r="7" />
				<circle cx="50" cy="67" r="7" />
				<circle cx="67" cy="33" r="7" />
				<circle cx="67" cy="50" r="7" />
				<circle cx="67" cy="67" r="7" />
			</g>`
			: die === 10 ?
			`<g>
				<circle cx="25" cy="25" r="5" />
				<circle cx="25" cy="37" r="5" />
				<circle cx="25" cy="50" r="5" />
				<circle cx="25" cy="62" r="5" />
				<circle cx="25" cy="75" r="5" />
				<circle cx="75" cy="25" r="5" />
				<circle cx="75" cy="37" r="5" />
				<circle cx="75" cy="50" r="5" />
				<circle cx="75" cy="62" r="5" />
				<circle cx="75" cy="75" r="5" />
			</g>`
			: die === 11 ?
			`<g>
				<circle cx="25" cy="25" r="5" />
				<circle cx="25" cy="37" r="5" />
				<circle cx="25" cy="50" r="5" />
				<circle cx="25" cy="62" r="5" />
				<circle cx="25" cy="75" r="5" />
				<circle cx="50" cy="50" r="5" />
				<circle cx="75" cy="25" r="5" />
				<circle cx="75" cy="37" r="5" />
				<circle cx="75" cy="50" r="5" />
				<circle cx="75" cy="62" r="5" />
				<circle cx="75" cy="75" r="5" />
			</g>`
			: die === 12 ?
			`<g>
				<circle cx="25" cy="25" r="5" />
				<circle cx="25" cy="37" r="5" />
				<circle cx="25" cy="50" r="5" />
				<circle cx="25" cy="62" r="5" />
				<circle cx="25" cy="75" r="5" />
				<circle cx="37" cy="37" r="5" />
				<circle cx="62" cy="62" r="5" />
				<circle cx="75" cy="25" r="5" />
				<circle cx="75" cy="37" r="5" />
				<circle cx="75" cy="50" r="5" />
				<circle cx="75" cy="62" r="5" />
				<circle cx="75" cy="75" r="5" />
			</g>`
			: die === 13 ?
			`<g>
				<circle cx="25" cy="25" r="5" />
				<circle cx="25" cy="37" r="5" />
				<circle cx="25" cy="50" r="5" />
				<circle cx="25" cy="62" r="5" />
				<circle cx="25" cy="75" r="5" />
				<circle cx="37" cy="37" r="5" />
				<circle cx="50" cy="50" r="5" />
				<circle cx="62" cy="62" r="5" />
				<circle cx="75" cy="25" r="5" />
				<circle cx="75" cy="37" r="5" />
				<circle cx="75" cy="50" r="5" />
				<circle cx="75" cy="62" r="5" />
				<circle cx="75" cy="75" r="5" />
			</g>`
			: die === 14 ?
			`<g>
				<circle cx="25" cy="25" r="5" />
				<circle cx="25" cy="37" r="5" />
				<circle cx="25" cy="50" r="5" />
				<circle cx="25" cy="62" r="5" />
				<circle cx="25" cy="75" r="5" />
				<circle cx="37" cy="37" r="5" />
				<circle cx="37" cy="62" r="5" />
				<circle cx="62" cy="37" r="5" />
				<circle cx="62" cy="62" r="5" />
				<circle cx="75" cy="25" r="5" />
				<circle cx="75" cy="37" r="5" />
				<circle cx="75" cy="50" r="5" />
				<circle cx="75" cy="62" r="5" />
				<circle cx="75" cy="75" r="5" />
			</g>`
			: die === 15 ?
			`<g>
				<circle cx="25" cy="25" r="5" />
				<circle cx="25" cy="37" r="5" />
				<circle cx="25" cy="50" r="5" />
				<circle cx="25" cy="62" r="5" />
				<circle cx="25" cy="75" r="5" />
				<circle cx="37" cy="37" r="5" />
				<circle cx="37" cy="62" r="5" />
				<circle cx="50" cy="50" r="5" />
				<circle cx="62" cy="37" r="5" />
				<circle cx="62" cy="62" r="5" />
				<circle cx="75" cy="25" r="5" />
				<circle cx="75" cy="37" r="5" />
				<circle cx="75" cy="50" r="5" />
				<circle cx="75" cy="62" r="5" />
				<circle cx="75" cy="75" r="5" />
			</g>`
			: die === 16 ?
			`<g>
				<circle cx="25" cy="25" r="5" />
				<circle cx="25" cy="37" r="5" />
				<circle cx="25" cy="50" r="5" />
				<circle cx="25" cy="62" r="5" />
				<circle cx="25" cy="75" r="5" />
				<circle cx="37" cy="37" r="5" />
				<circle cx="37" cy="50" r="5" />
				<circle cx="37" cy="62" r="5" />
				<circle cx="62" cy="37" r="5" />
				<circle cx="62" cy="50" r="5" />
				<circle cx="62" cy="62" r="5" />
				<circle cx="75" cy="25" r="5" />
				<circle cx="75" cy="37" r="5" />
				<circle cx="75" cy="50" r="5" />
				<circle cx="75" cy="62" r="5" />
				<circle cx="75" cy="75" r="5" />
			</g>`
			: die === 17 ?
			`<g>
				<circle cx="25" cy="25" r="5" />
				<circle cx="25" cy="37" r="5" />
				<circle cx="25" cy="50" r="5" />
				<circle cx="25" cy="62" r="5" />
				<circle cx="25" cy="75" r="5" />
				<circle cx="37" cy="37" r="5" />
				<circle cx="37" cy="50" r="5" />
				<circle cx="37" cy="62" r="5" />
				<circle cx="50" cy="50" r="5" />
				<circle cx="62" cy="37" r="5" />
				<circle cx="62" cy="50" r="5" />
				<circle cx="62" cy="62" r="5" />
				<circle cx="75" cy="25" r="5" />
				<circle cx="75" cy="37" r="5" />
				<circle cx="75" cy="50" r="5" />
				<circle cx="75" cy="62" r="5" />
				<circle cx="75" cy="75" r="5" />
			</g>`
			: die === 18 ?
			`<g>
				<circle cx="25" cy="25" r="5" />
				<circle cx="25" cy="37" r="5" />
				<circle cx="25" cy="50" r="5" />
				<circle cx="25" cy="62" r="5" />
				<circle cx="25" cy="75" r="5" />
				<circle cx="37" cy="37" r="5" />
				<circle cx="37" cy="50" r="5" />
				<circle cx="37" cy="62" r="5" />
				<circle cx="50" cy="37" r="5" />
				<circle cx="50" cy="62" r="5" />
				<circle cx="62" cy="37" r="5" />
				<circle cx="62" cy="50" r="5" />
				<circle cx="62" cy="62" r="5" />
				<circle cx="75" cy="25" r="5" />
				<circle cx="75" cy="37" r="5" />
				<circle cx="75" cy="50" r="5" />
				<circle cx="75" cy="62" r="5" />
				<circle cx="75" cy="75" r="5" />
			</g>`
			: die === 19 ?
			`<g>
				<circle cx="25" cy="25" r="5" />
				<circle cx="25" cy="37" r="5" />
				<circle cx="25" cy="50" r="5" />
				<circle cx="25" cy="62" r="5" />
				<circle cx="25" cy="75" r="5" />
				<circle cx="37" cy="37" r="5" />
				<circle cx="37" cy="50" r="5" />
				<circle cx="37" cy="62" r="5" />
				<circle cx="50" cy="37" r="5" />
				<circle cx="50" cy="50" r="5" />
				<circle cx="50" cy="62" r="5" />
				<circle cx="62" cy="37" r="5" />
				<circle cx="62" cy="50" r="5" />
				<circle cx="62" cy="62" r="5" />
				<circle cx="75" cy="25" r="5" />
				<circle cx="75" cy="37" r="5" />
				<circle cx="75" cy="50" r="5" />
				<circle cx="75" cy="62" r="5" />
				<circle cx="75" cy="75" r="5" />
			</g>`
			: die === 20 ?
			`<g>
				<circle cx="25" cy="25" r="5" />
				<circle cx="25" cy="37" r="5" />
				<circle cx="25" cy="50" r="5" />
				<circle cx="25" cy="62" r="5" />
				<circle cx="25" cy="75" r="5" />
				<circle cx="37" cy="25" r="5" />
				<circle cx="37" cy="37" r="5" />
				<circle cx="37" cy="50" r="5" />
				<circle cx="37" cy="62" r="5" />
				<circle cx="37" cy="75" r="5" />
				<circle cx="62" cy="25" r="5" />
				<circle cx="62" cy="37" r="5" />
				<circle cx="62" cy="50" r="5" />
				<circle cx="62" cy="62" r="5" />
				<circle cx="62" cy="75" r="5" />
				<circle cx="75" cy="25" r="5" />
				<circle cx="75" cy="37" r="5" />
				<circle cx="75" cy="50" r="5" />
				<circle cx="75" cy="62" r="5" />
				<circle cx="75" cy="75" r="5" />
			</g>`
			: `<text x="50" y="50">${die}</text>`)
			+
		`</svg>`
	)
  );
};
  
document.addEventListener('DOMContentLoaded', event => {
	const probabilityDisplayElement = document.getElementById('probabilities');
	const historyListElement = document.getElementById('history');
	const histogramElement = document.getElementById('histogram');
	const resultDisplayByDiceCheckboxElement = document.getElementById('display-by-dice');
	const bySumCheckboxElement = document.getElementById('by-sum-checkbox');
	const histogramCheckboxElement = document.getElementById('hide-histogram-checkbox');
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
	let histogram;
	let histogramBySum;
	let probs;
	let numOfDice = parseInt(diceInputElement?.value);
	let faces = parseInt(facesInputElement?.value);
	let bySum = bySumCheckboxElement?.checked;
	let histogramVisible = histogramCheckboxElement?.checked;
	let historyVisible = historyCheckboxElement?.checked;
	let probabilitiesVisible = probabilitiesCheckboxElement?.checked;
	let displayByDice = resultDisplayByDiceCheckboxElement?.checked;
	let modifier = parseFloat(modifierInputElement?.value);
	facesValueElement.innerText = faces
	diceValueElement.innerText = numOfDice;
	modifierValueElement.innerText = modifier;

	
	const pushToHistory = result => {
		history.push(result.outcome);
		numOfRollsElement.textContent = history.length;
		histogramBySum[sum(result.outcome)] += 1;
		histogram[result.outcome] += 1;

		historyListElement.insertBefore(createElementFromHtml(
			`<li>
				<p>${sum(result.outcome)}: ${result.outcome}</p>
			</li>`), 
			historyListElement.firstChild);
	};
	
	const popFromHistory = () => {
		const lastRollOutcome = history.pop();
		numOfRollsElement.textContent = history.length;
		histogramBySum[sum(lastRollOutcome)] -= 1;
		histogram[lastRollOutcome] -= 1;

		historyListElement.removeChild(historyListElement.firstElementChild);

		return lastRollOutcome
	}
	
	const initialize = () => 
	{
		diceResults = Dice.initNewDiceResults(faces, numOfDice);
		if(histogramCheckboxElement.checked)
			histogramElement?.classList.add("hidden");
		
		if(probabilitiesCheckboxElement.checked)
			probabilityDisplayElement?.classList.add("hidden");

		history = [];
		histogramBySum = Object.fromEntries((diceResults.map(res => sum(res.outcome))).map(sum => [sum, 0]));
		histogram = Object.fromEntries(diceResults.map(res => [res.outcome, 0]));
		newHistogramDisplay();
		newProbabilityDisplay();
		historyListElement.textContent = '';
		resultElement.textContent = '';
		numOfRollsElement.textContent = 0;
	};

	const newHistogramDisplay = () =>
	{
		const histogramToDisplay = bySum? histogramBySum : histogram;
		const newDisplayStats = document.createElement('template');
		const newDisplayBar = document.createElement('template');
		Object.entries(histogramToDisplay).forEach(([outcome, numOfRolls]) => 
		{
			newDisplayStats.innerHTML +=
			`<li>
				<p class="inline">${outcome}: </p>
				<p class="inline"></p>
			</li>`;
			newDisplayBar.innerHTML +=
			`<li>
				<progress></progress>
			</li>`;
		});
		histogramElement.children[0].innerHTML = newDisplayStats.innerHTML;
		histogramElement.children[1].innerHTML = newDisplayBar.innerHTML;
		updateHistogramDisplay();
	}
	
	const updateHistogramDisplay = () => 
	{
		const histogramToDisplay = bySum? histogramBySum : histogram;
		Object.entries(histogramToDisplay).forEach(([outcome, numOfRolls], index) => {
			const numOfRollsDisplay = histogramElement.children[0].children[index].children[1];
			const progressDisplay = histogramElement.children[1].children[index].children[0];
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
				<p class="inline">$</p>
			</li>`;
			newBarDisplay.innerHTML += 
			`<li>
				<progress></progress>
			</li>`;
		});
		probabilityDisplayElement.children[0].innerHTML = newStatsDisplay.innerHTML;
		probabilityDisplayElement.children[1].innerHTML = newBarDisplay.innerHTML;
		updateProbabilityDisplay();
	};
	
	const updateProbabilityDisplay = () => 
	{
		const probabilities = bySum? getProbabilitiesBySum(diceResults) : diceResults;
		probabilities.forEach((probability, index) => {
			probabilityDisplayElement.children[0].children[index].children[1].innerText = probability.prob.toFixed(3);
			probabilityDisplayElement.children[1].children[index].children[0].value = probability.prob;
		});
	};
	
	const roll = () =>
	{
		const result = Dice.roll(diceResults);
		pushToHistory(result);
		diceResults = Dice.modifyProbabilities(diceResults, result.outcome, modifier);
		displayLastResult();
		updateProbabilityDisplay();
		updateHistogramDisplay();	
	};
	
	const displayLastResult = () => 
	{
		const result = history[history.length - 1];
		resultElement.textContent = '';
		if (displayByDice)
		{
			diceDisplay(result).forEach(die => 
				resultElement.appendChild(die));
		}
		else
			resultElement.appendChild(createElementFromHtml(
			`<p>
				${sum(result)}: ${result}
			</p>`));
	};
	
	const unroll = () =>
	{
		if (history.length)
		{
			diceResults = Dice.modifyProbabilities(diceResults, popFromHistory(), modifier, {cancelLastRoll: true});
			updateProbabilityDisplay();
			updateHistogramDisplay();
			if (history.length > 0)
				displayLastResult();
			else
				resultElement.textContent = '';
		}
	};

	initialize();
	
	bySumCheckboxElement?.addEventListener('input', e => 
	{
		bySum = bySumCheckboxElement?.checked;
		newProbabilityDisplay();
		newHistogramDisplay();
	});
	
	histogramCheckboxElement?.addEventListener('input', e => 
	{
		histogramVisible = histogramCheckboxElement?.checked;
		histogramElement?.classList.toggle("hidden");
	});
	
	historyCheckboxElement?.addEventListener('input', e => 
	{
		historyVisible = historyCheckboxElement?.checked;
		historyListElement?.classList.toggle("hidden");
	});
	
	probabilitiesCheckboxElement?.addEventListener('input', e => 
	{
		probabilitiesVisible = probabilitiesCheckboxElement?.checked;
		probabilityDisplayElement?.classList.toggle("hidden");
	});
		
	resultDisplayByDiceCheckboxElement?.addEventListener('input', e => 
	{
		displayByDice = resultDisplayByDiceCheckboxElement?.checked;
		if (history.length)
			displayLastResult();
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
		const key = String.fromCharCode(e.which);
		if (key === ' ' || key === '\n')
		{
			e.preventDefault();
			roll();
		}
		else if (key === 'U')
			unroll();
		else if (key === 'R')
			initialize();
	});
	
	document.getElementById('reset-button')?.addEventListener('click', e => 
	{
		initialize();
	});
	
	document.getElementById('unroll-button')?.addEventListener('click', unroll);
});
