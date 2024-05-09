import { LogFn } from "../app/app";

export type DataToIndex = {
	id: string;
	type: string;
	title: string;
	description: string;
}

export interface SearchIndex {
	load(data: DataToIndex[]): void;
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
	order: number;
	doc: {
		id: string;
		type: string;
		title: string;
		description: string;
	};
};