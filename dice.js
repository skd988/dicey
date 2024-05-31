const cartesianMult = (sets) =>
{
	return sets.reduce((result, set) =>
		!result.length? 
			set.map(x => [x]) : 
			result.map(x => set.map(y => [x, y].flat())).flat()
	, []);
};

const setExponent = (set, expo) => 
{	
	return cartesianMult(Array(expo).fill(set));
};

const initNewDiceResults = (faces, numOfDice) =>
{
	const oneDieResults = Array(faces).fill(0).map((_, i) => i + 1);
	const diceOutcomes = setExponent(oneDieResults, numOfDice);
	const initProb = 1 / diceOutcomes.length;
	return diceOutcomes.reduce((diceResults, outcome, index) => 
	{
		diceResults.push(
		{
			outcome,
			prob: initProb,
			probSum: initProb + (index === 0? 0 : diceResults[index - 1].probSum)
		});
		return diceResults;
	}
	, []);
};

const modifyProbabilities = (diceResults, lastRollOutcome, modifier, {cancelLastRoll} = {cancelLastRoll: false}) =>
{
	let distributedValue = diceResults.find(res => res.outcome === lastRollOutcome).prob * 
							(modifier - 1) / (modifier * (diceResults.length - 1));
	if (cancelLastRoll)
		distributedValue *= modifier;
	return diceResults.reduce((newDiceResults, result, index) =>
	{
		const newProb = cancelLastRoll?
			result.outcome === lastRollOutcome? result.prob * modifier : result.prob - distributedValue :
			result.outcome === lastRollOutcome? result.prob / modifier : result.prob + distributedValue;
		newDiceResults.push(
		{
			...result, 
			prob: newProb,
			probSum: newProb + (!index? 0 : newDiceResults[index - 1].probSum)
		});
		return newDiceResults;
	}, []);
};

const roll = (diceResults, rand = Math.random()) =>
{	
	rand *= getTotalProbSum(diceResults);
	return diceResults.find(res => rand < res.probSum);
};

const getTotalProbSum = diceResults =>
{
	return diceResults[diceResults.length - 1].probSum;
};

export default { initNewDiceResults, roll, modifyProbabilities };
