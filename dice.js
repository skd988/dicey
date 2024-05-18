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

export function Dice(faces, numOfDice)
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
	
	//note that in floating point, x + ... + x !== x * n, so prob sum must be x + ... + x
	let results = diceResults.map((res, index) => 
	{
		probSum += initProb;
		return {
			prob: initProb,
			probSum: probSum,
			val: res,
			sum: res.reduce((sum, val) => sum + val)
		};
	});
	let modifier = 2;
	
	
	const roll = () =>
	{
		let result = results[0];
		const rand = Math.random() * probSum;
		result = results.find(res => rand < res.probSum);

		//const result = results[Math.floor(Math.random() * results.length)];
		
		modifyProbabilities(result);
		console.log(results);
		return result;
	}
	
	return { roll };
}