import { SearchService } from "../search/service";
import { SearchAppConfig } from "../search/app";

export type LogFn = (...args: any[]) => void;

export class AppConfig extends Application {
  static appId = 'foundry-pathfinder-character-search';
  public searchButtonHTML =  `
    <a class='character-search-icon-button'><i class="fa-solid fa-fw fa-search"></i></a>
  `;

  private searchService: SearchService;

  constructor() {
    super({});
    this.searchService = new SearchService(this.log);
  }
  

  private log(...args: any[]) {
    console.log('CharacterSearch |', ...args);
  }

	static get defaultOptions() {
    const defaults = super.defaultOptions;
  
    const overrides = {
      id: this.appId,
      title: 'Character Search',
      character: null,
    };
  
    const mergedOptions = foundry.utils.mergeObject(defaults, overrides);
    
    return mergedOptions;
  }

  public onSheetRender(html: JQuery<HTMLElement>, actor: any) {
    const characterDetails = html.find(`h4.window-title`);
    characterDetails.append(this.searchButtonHTML);
    this.log('Loading character', actor);
    this.searchService.loadCharacter(actor);
  
    html.on('click', '.character-search-icon-button', (_) => {
      const newWindow = new SearchAppConfig(actor, this.searchService);
      newWindow.render(true, {character: actor} as unknown as FormApplicationOptions);
    });
  }

}