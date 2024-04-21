export class SearchAppConfig extends FormApplication {
  static searchAppId = 'foundry-pathfinder-character-search';
  public searchButtonHTML =  `
    <a class='character-search-icon-button'><i class="fa-solid fa-fw fa-search"></i></a>
  `;

  private log(...args: any[]) {
    console.log('CharacterSearch |', ...args);
  }

	static get defaultOptions() {
    const defaults = super.defaultOptions;
  
    const overrides = {
      height: 'auto',
      id: this.searchAppId,
      template: `modules/${this.searchAppId}/templates/search-window.hbs`,
      title: 'Character Search',
    };
  
    const mergedOptions = foundry.utils.mergeObject(defaults, overrides);
    
    return mergedOptions;
  }

	protected async _updateObject(event: Event, formData?: object | undefined): Promise<void> {
    this.log(event, formData);
		this.log("updateObject not implemented.");
	}

  public onSheetRender(html: JQuery<HTMLElement>) {
    const characterDetails = html.find(`h4.window-title`);
    characterDetails.append(this.searchButtonHTML);
  
    html.on('click', '.character-search-icon-button', (_) => {
      this.log('Button Clicked!');
      this.render(true);
    });
  }

}