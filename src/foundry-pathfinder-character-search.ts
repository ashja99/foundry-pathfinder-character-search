console.log('hello world from foundry-pathfinder-character-search.ts still working');

const searchButtonHTML =  `
<div class="pc">
	<h3>
		<span class="value"><input type="text" class="search-input" placeholder="Search..."></span>
			<a><i class="fa-solid fa-fw fa-search"></i></a>
	</h3>
</div>
`;

Hooks.on('renderCharacterSheetPF2e', (_, characterSheet) => {
	console.log('renderCharacterSheetPF2e hook', characterSheet);

	const characterDetails = characterSheet.find(`section.char-details`);
	characterDetails.append(searchButtonHTML);

});