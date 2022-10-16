import type { EntryTypes } from '../enums/entryType';

export type IEntry = {
	description: string;
	value: number;
	type: EntryTypes;
};
