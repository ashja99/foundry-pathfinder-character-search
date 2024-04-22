import Document from 'flexsearch/dist/module/document';
import { LogFn } from '../app/app';

export type SearchResult = {
	id: string;
	fields: string[];
	order: number;
	doc: {
		id: string;
		type: string;
		title: string;
		description: string;
	}
}

type RawSearchResult = {
	field: string;
	result: {
		id: string;
		doc: {
			id: string;
			type: string;
			title: string;
			description: string;
		}
	}[]
}

export class SearchService {
	public indexes: Record<string, Document>;
	private log: LogFn;

	constructor(logger: LogFn) {
		this.indexes = {};
		this.log = logger;
	}
	
	public loadCharacter(character): void {

		this.indexes[character.actor._id] = new Document({
			document: {
				id: 'id',
				tag: 'type',
				index: ['title', 'description'],
				store: true
			}
		});

		
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

		const results = this.indexes[characterId].search(query, {enrich: true});

		this.log('Search results', results);

		return this.flattenSearchResults(results);
	}

	private flattenSearchResults(results: RawSearchResult[]): SearchResult[] {
		const flattenedSearchResults: SearchResult[] = [];

		results.map((resultByField) => {
			resultByField.result.map((searchResult) => {
				const existingResult = flattenedSearchResults.find((result) => result.id === searchResult.id);
				if (existingResult) {
					if (!existingResult.fields.includes(resultByField.field)) {
						existingResult.fields.push(resultByField.field);
					}
				} else {
					flattenedSearchResults.push({
						id: searchResult.id,
						fields: [resultByField.field],
						order: resultByField.field === 'title'? 0: 1,
						doc: searchResult.doc
					});
				}
			});
		});

		return flattenedSearchResults;
	}

}