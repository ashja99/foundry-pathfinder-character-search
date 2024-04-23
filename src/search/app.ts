import { SearchService } from "./service";
import { LogFn } from "../app/app";

export class SearchAppConfig extends FormApplication {
  static searchAppId = 'foundry-pathfinder-character-search';

  private searchService: SearchService;
	private log: LogFn;
	private character;
	private query = '';

  constructor(character, searchService: SearchService, log: LogFn) {
    super({});
    this.searchService = searchService;
		this.log = log;
		this.character = character;
	}


	static get defaultOptions() {
    const defaults = super.defaultOptions;
  
    const overrides = {
      height: 600,
			width: 600,
      id: this.searchAppId,
      template: `modules/${this.searchAppId}/templates/search-window.hbs`,
      title: 'Character Search',
      submitOnChange: true,
      closeOnSubmit: false,
    };
  
    const mergedOptions = foundry.utils.mergeObject(defaults, overrides);
    
    return mergedOptions;
  }

	protected async _updateObject(event): Promise<void> {
		if (event.type =="submit") {
			this.query = event.target[0].value;
			this.render();
		}
	}

	async getData(): Promise<FormApplication.Data<object, FormApplicationOptions>> {
		const searchResults = this.searchService
			.searchCharacter(this.character.actor._id, this.query)
			.sort((a, b) => a.order - b.order)
			.map(async (result) => {
				return {
					...result,
					enrichedDescription: await TextEditor.enrichHTML(result.doc.description),
				};
			});
		return {
			character: this.character,
			results: await Promise.all(searchResults),
		} as unknown as FormApplication.Data<object, FormApplicationOptions>;
	}

	activateListeners(html: JQuery<HTMLElement>): void {

		html.on('click', '.character-search-result .title', (event) => {
				// Get the clicked element
				const title = $(event.target);

				// Find the sibling description div and toggle the 'open' class
				title.siblings('.description').toggleClass('open');
		});
	}

}