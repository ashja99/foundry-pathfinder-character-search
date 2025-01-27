import { SearchProvider, SearchResult, SearchIndex, DataToIndex } from '../types';
import * as lunr from 'lunr';

function whitelistPlugin(builder: lunr.Builder, whitelist: string[]) {
	function stopWordWhitelist(token: lunr.Token) {
		// pass any token in the whitelist through
		if (whitelist.includes(token.toString())) return token;
		// all other tokens should be passed through the normal filter
		return lunr.stopWordFilter(token);
	}

	lunr.Pipeline.registerFunction(stopWordWhitelist, 'stopWordWhitelist')

	builder.pipeline.before(lunr.stopWordFilter, stopWordWhitelist)
	builder.pipeline.remove(lunr.stopWordFilter)

}
class LunrIndex implements SearchIndex {
	private index: lunr.Index;
	private dataSet: Record<string, { id: string, type: string, title: string, description: string }>;

	constructor() {
		// This index esstinally gets overwritten in the load method, since lunr indexes need all data ready at creation
		this.index = lunr(function() {
		});
		this.dataSet = {};
	}

	public load(data: DataToIndex[]): void {
		this.index = lunr(function() {
			this.ref('id')
			this.field('title')
			this.field('description')
			// "will" is a stopword in lunr, but important in pathfinder
			this.use(whitelistPlugin, ['will'])
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
