import { invalid, type RequestEvent } from '@sveltejs/kit';
import { EntryTypes } from '../enums/entryType';
import Database from '../database';

export const load = async ({ url }: RequestEvent) => {
	const database = Database.Instance();

	const descriptionFilter = url.searchParams.get('description');
	const typeFilter = url.searchParams.get('type');

	const entries = await database.getEntries({
		filters: {
			description: descriptionFilter,
			type: typeFilter
		}
	});
	const balance = await database.getBalance();
	const incomingTotal = await database.getTotalIncomings();
	const outgoingTotal = await database.getTotalOutgoings();

	return {
		entries,
		balance,
		incomingTotal,
		outgoingTotal,
		filters: {
			description: descriptionFilter ?? '',
			type: typeFilter ?? ''
		}
	};
};

export const actions = {
	add: async ({ request }: RequestEvent) => {
		const data = await request.formData();

		const description = data.get('description');
		const value = data.get('value');
		const type = data.get('type');

		if (!description) {
			return invalid(400, { description, missing: true });
		}

		if (!value) {
			return invalid(400, { value, missing: true });
		}

		if (!type) {
			return invalid(400, { type, missing: true });
		}

		if (Number(type) !== EntryTypes.incoming && Number(type) !== EntryTypes.outgoing) {
			console.log('Type error', type);
			return invalid(400, { type, incorrect: true });
		}

		const database = Database.Instance();

		await database.insert({
			description: description.toString(),
			value: Number(value.toString()),
			type: Number(type.toString())
		});

		return { success: true };
	},
	remove: async ({ request }: RequestEvent) => {
		const data = await request.formData();

		const index = Number(data.get('index')?.toString() ?? -1);

		if (index === -1) {
			return invalid(400, { index, missing: true });
		}

		const database = Database.Instance();

		if (index < 0 || index >= (await database.size())) {
			return invalid(400, { index, incorrect: true });
		}

		await database.delete(index);

		return { success: true };
	}
};
