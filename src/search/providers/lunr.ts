import { SearchProvider, SearchResult, SearchIndex, DataToIndex } from '../types';
import * as lunr from 'lunr';

class LunrIndex implements SearchIndex {
	private index: lunr.Index;
	private dataSet: Record<string, { id: string, type: string, title: string, description: string }>;

	constructor() {
		this.index = lunr(function() {
			this.ref('id')
			this.field('title')
			this.field('description')
		});
		this.dataSet = {};
	}

	public load(data: DataToIndex[]): void {
		this.index = lunr(function() {
			this.ref('id')
			this.field('title')
			this.field('description')
			data.forEach((doc) => this.add(doc));
		});
		
		this.dataSet = data.reduce((acc, doc) => {
			acc[doc.id] = doc;
			return acc;
		}, {});
	}

	public search(query: string): SearchResult[] {
		if (!query) return [];
		const results = this.index.search(query);
		return results.map(({ ref, score }) => ({
			id: ref,
			order: -score,
			doc: this.dataSet[ref]
		}));
	}
}

export default class LunrSearchProvider extends SearchProvider {
	public newIndex(): SearchIndex {
		return new LunrIndex();
	}
}
