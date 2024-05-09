import { LogFn } from "../app/app";

export interface SearchIndex {
	add({id, type, title, description}): void;
	search(query: string): SearchResult[];
}

export abstract class SearchProvider {
	logger: LogFn;
	constructor({ logger }: { logger: LogFn }) {
		this.logger = logger;
	};

	public abstract newIndex(): SearchIndex;
}

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