
console.log('hello world from foundry-pathfinder-character-search.ts still working');

Hooks.on('renderCharacterSheetPF2e', (charactersheet, html, data) => {
	console.log('character sheet rendering: ',charactersheet);
	console.log('html data is: ', html[0].innerHTML);
	console.log('hook data is: ', data.actor);
});