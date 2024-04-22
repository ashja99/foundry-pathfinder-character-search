import { AppConfig } from './app/app';

let app: any;

Hooks.once('init', () => {
  app = new AppConfig();
});

Hooks.on('renderCharacterSheetPF2e', (_, html, data) => {
	app.onSheetRender(html, data);
});