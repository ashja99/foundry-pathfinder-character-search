import { SearchProvider, SearchResult, SearchIndex } from './types';
import { LogFn } from '../app/app';
import Document from 'flexsearch/dist/module/document';

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

function flattenSearchResults(results: RawSearchResult[]): SearchResult[] {
	const flattenedSearchResults: any[]= [];

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

class FlexsearchIndex implements SearchIndex {
	private index: Document;
	private logger: LogFn;

	constructor(logger: LogFn) {
		this.logger = logger;
		this.index = new Document({
			document: {
				id: 'id',
				tag: 'type',
				index: ['title', 'description'],
				store: true
			},
			tokenize: 'strict',
			context: true,
			language: 'en',
		});
	}

	add({id, type, title, description}) {
		this.index.add({
			id,
			type,
			title,
			description
		});
	}

	search(query: string): SearchResult[] {
		const results = this.index.search(query, {enrich: true});
		if (!results) this.logger('No search results found for query', query);
		return flattenSearchResults(results);
	}

}

export default class Flexsearch extends SearchProvider {

		public newIndex() {
			return new FlexsearchIndex(this.logger);
		}

}