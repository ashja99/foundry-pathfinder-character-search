// import stemmer from 'flexsearch/dist/lang/en.min.js';
import { SearchIndex, SearchProvider, SearchResult } from './types';
import { LogFn } from '../app/app';
import Flexsearch from './flexsearch';

export class SearchService {
	public indexes: Record<string, SearchIndex>;
	private log: LogFn;
	private searchProvider: SearchProvider;

	constructor(logger: LogFn) {
		this.indexes = {};
		this.log = logger;

		// Update this line to use a difference search provider
		this.searchProvider = new Flexsearch({logger});
	}
	
	public loadCharacter(character): void {

		this.indexes[character.actor._id] = this.searchProvider.newIndex();

		
		character.items.map((item) => {
			this.indexes[character.actor._id].add({
				id: item._id,
				type: item.type,
				title: item.name,
				description: this.extractTextFromItem(item)
			});
		});

	}

	public extractTextFromItem(item: any): string {
		const parser = new DOMParser();

		let description = item?.system?.description?.value || '';
				
		if (description) {
			const doc = parser.parseFromString('<body>'+description+'</body>', 'text/html');
			description = doc.body.innerText;
		}

		if (!description) {
			this.log('No description found for item', item);
		}

		return description;
	}

	public searchCharacter(characterId: string, query: string): SearchResult[] {
		if (!this.indexes[characterId]) {
			this.log('No index found for character', characterId);
			return [];
		}

		const results = this.indexes[characterId].search(query);

		this.log('Search results', results);

		return results;
	}

}