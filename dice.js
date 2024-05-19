function cartesianMult(...sets)
{
	let result = [];
	sets.forEach(set =>
	{
		if (result.length === 0)
			result = set.map(x => [x]);
		else
			result = result.reduce((newSet, x) => {
				set.forEach(y => newSet.push([x,y].flat()));
				return newSet;
			}, []);
	});
	return result;
}

function setExponent(set, expo)
{	
	return cartesianMult(...Array(expo).fill(set));
}

function splitArrayByCategories(arr, getCategory)
{
    let splitted = {};
    arr.forEach(obj => {
        let category = getCategory(obj);
        if (splitted[category] === undefined)
            splitted[category] = [obj];
        else
            splitted[category].push(obj);
    });
    return splitted;
};

export function Dice(faces, numOfDice, modifier = 2)
{	
	function modifyProbabilities(lastResult)
	{
		const toAdd = lastResult.prob * (modifier - 1) / (modifier * (results.length - 1));
		probSum = 0;
		results.forEach((result, index) => 
		{
			if (result === lastResult)
				result.prob /= modifier;
			else
				result.prob += toAdd;
			
			probSum += result.prob;
			result.probSum = probSum;
		});
	}
	
	const oneDieResults = [...Array(faces).keys()].map(i => i + 1);
	const diceResults = setExponent(oneDieResults, numOfDice);
	const initProb = 1 / diceResults.length;
	
	let probSum = 0;
	let history = [];

	//note that in floating point, x + ... + x !== x * n, so prob sum must be x + ... + x
	let results = diceResults.map((res, index) => 
	{
		probSum += initProb;
		return {
			val: res,
			prob: initProb,
			probSum: probSum,
			sum: res.reduce((sum, val) => sum + val)
		};
	});
	
	const roll = () =>
	{
		let result = results[0];
		const rand = Math.random() * probSum;
		result = results.find(res => rand < res.probSum);

		//const result = results[Math.floor(Math.random() * results.length)];
		
		modifyProbabilities(result);
		history.push(result);
		
		return result.val;
	}
	
	const getProbabilities = (bySum) =>
	{
		return bySum ? 
			Object.entries(splitArrayByCategories(results, res => res.sum)).map(([sum, resultsOfSum]) =>
				({
					val: sum,
					prob: resultsOfSum.reduce((probSum, result) => probSum + result.prob, 0)
				}))
			: 
			results.map(result => 
				({
					val: result.val,
					prob: result.prob
				}));
	}
	return { roll, getProbabilities };
}