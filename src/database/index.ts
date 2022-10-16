import { EntryTypes } from '../enums/entryType';
import type { IEntry } from '../types/entry';

type IOptions = {
	filters?: {
		description: string | null;
		type: string | null;
	};
};

class Database {
	private static instance: Database;

	private entries: Array<IEntry> = [];

	public static Instance(): Database {
		if (!Database.instance) {
			Database.instance = new Database();
		}
		return Database.instance;
	}

	async getEntries(options: IOptions = {}) {
		return this.entries.filter((entry) => {
			const filterHandler = {
				description: true,
				type: true
			};

			if (options.filters?.description) {
				filterHandler.description = entry.description
					.toLowerCase()
					.includes(options.filters.description.toLowerCase());
			}

			if (options.filters?.type) {
				filterHandler.type = entry.type === Number(options.filters.type);
			}

			return filterHandler.description && filterHandler.type;
		});
	}

	async getBalance() {
		return this.entries.reduce((acc, entry) => {
			if (entry.type === EntryTypes.incoming) {
				return acc + entry.value;
			}

			if (entry.type === EntryTypes.outgoing) {
				return acc - entry.value;
			}

			return acc;
		}, 0);
	}

	async getTotalIncomings() {
		return this.entries.reduce((acc, entry) => {
			if (entry.type === EntryTypes.incoming) {
				return acc + entry.value;
			}

			return acc;
		}, 0);
	}

	async getTotalOutgoings() {
		return this.entries.reduce((acc, entry) => {
			if (entry.type === EntryTypes.outgoing) {
				return acc + entry.value;
			}

			return acc;
		}, 0);
	}

	async insert(entry: IEntry) {
		this.entries.push(entry);
	}

	async delete(index: number) {
		this.entries.splice(index, 1);
	}

	async size() {
		return this.entries.length;
	}
}

export default Database;
