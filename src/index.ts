import { AppConfig } from './app/app';

let app: AppConfig;

Hooks.once('init', () => {
  app = new AppConfig();
});

Hooks.on('renderCharacterSheetPF2e', (_, html, data) => {
	app.init(html, data);
});