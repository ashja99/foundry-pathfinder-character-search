import { SearchAppConfig } from './app/search-app';

console.log('hello world from index.ts still working');
let app: any;

Hooks.once('init', () => {
  app = new SearchAppConfig({});
});

Hooks.on('renderCharacterSheetPF2e', (_, html) => {
	app.onSheetRender(html);
});