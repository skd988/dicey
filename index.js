import { Dice } from "./dice.js";
const dice = Dice(6,2);

console.log(document.getElementById('roll-button'));
document.getElementById('roll-button')?.addEventListener('click', () => {
	document.getElementById('result').innerText = dice.roll().val;
});
