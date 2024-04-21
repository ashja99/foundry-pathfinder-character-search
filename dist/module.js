/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!****************************************************!*\
  !*** ./src/foundry-pathfinder-character-search.ts ***!
  \****************************************************/

console.log('hello world from foundry-pathfinder-character-search.ts still working');
const searchButtonHTML = `
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
// Hooks.on('renderCharacterSheetPF2e', (_, html) => {
// 	console.log('character sheet rendering: ',html);
// 	html.append(searchButtonHTML);
// });

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxPQUFPLENBQUMsR0FBRyxDQUFDLHVFQUF1RSxDQUFDLENBQUM7QUFFckYsTUFBTSxnQkFBZ0IsR0FBSTs7Ozs7OztDQU96QixDQUFDO0FBRUYsS0FBSyxDQUFDLEVBQUUsQ0FBQywwQkFBMEIsRUFBRSxDQUFDLENBQUMsRUFBRSxjQUFjLEVBQUUsRUFBRTtJQUMxRCxPQUFPLENBQUMsR0FBRyxDQUFDLCtCQUErQixFQUFFLGNBQWMsQ0FBQyxDQUFDO0lBRTdELE1BQU0sZ0JBQWdCLEdBQUcsY0FBYyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0lBQ3JFLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBRTNDLENBQUMsQ0FBQyxDQUFDO0FBRUgsc0RBQXNEO0FBQ3RELG9EQUFvRDtBQUVwRCxrQ0FBa0M7QUFDbEMsTUFBTSIsInNvdXJjZXMiOlsid2VicGFjazovL2ZvdW5kcnktcGF0aGZpbmRlci1jaGFyYWN0ZXItc2VhcmNoLy4vc3JjL2ZvdW5kcnktcGF0aGZpbmRlci1jaGFyYWN0ZXItc2VhcmNoLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnNvbGUubG9nKCdoZWxsbyB3b3JsZCBmcm9tIGZvdW5kcnktcGF0aGZpbmRlci1jaGFyYWN0ZXItc2VhcmNoLnRzIHN0aWxsIHdvcmtpbmcnKTtcclxuXHJcbmNvbnN0IHNlYXJjaEJ1dHRvbkhUTUwgPSAgYFxyXG48ZGl2IGNsYXNzPVwicGNcIj5cclxuXHQ8aDM+XHJcblx0XHQ8c3BhbiBjbGFzcz1cInZhbHVlXCI+PGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJzZWFyY2gtaW5wdXRcIiBwbGFjZWhvbGRlcj1cIlNlYXJjaC4uLlwiPjwvc3Bhbj5cclxuXHRcdFx0PGE+PGkgY2xhc3M9XCJmYS1zb2xpZCBmYS1mdyBmYS1zZWFyY2hcIj48L2k+PC9hPlxyXG5cdDwvaDM+XHJcbjwvZGl2PlxyXG5gO1xyXG5cclxuSG9va3Mub24oJ3JlbmRlckNoYXJhY3RlclNoZWV0UEYyZScsIChfLCBjaGFyYWN0ZXJTaGVldCkgPT4ge1xyXG5cdGNvbnNvbGUubG9nKCdyZW5kZXJDaGFyYWN0ZXJTaGVldFBGMmUgaG9vaycsIGNoYXJhY3RlclNoZWV0KTtcclxuXHJcblx0Y29uc3QgY2hhcmFjdGVyRGV0YWlscyA9IGNoYXJhY3RlclNoZWV0LmZpbmQoYHNlY3Rpb24uY2hhci1kZXRhaWxzYCk7XHJcblx0Y2hhcmFjdGVyRGV0YWlscy5hcHBlbmQoc2VhcmNoQnV0dG9uSFRNTCk7XHJcblxyXG59KTtcclxuXHJcbi8vIEhvb2tzLm9uKCdyZW5kZXJDaGFyYWN0ZXJTaGVldFBGMmUnLCAoXywgaHRtbCkgPT4ge1xyXG4vLyBcdGNvbnNvbGUubG9nKCdjaGFyYWN0ZXIgc2hlZXQgcmVuZGVyaW5nOiAnLGh0bWwpO1xyXG5cclxuLy8gXHRodG1sLmFwcGVuZChzZWFyY2hCdXR0b25IVE1MKTtcclxuLy8gfSk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==