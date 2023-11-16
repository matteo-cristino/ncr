import { introspect } from 'zenroom';
import { Type } from '@sinclair/typebox';
import { TypeCompiler, ValueErrorIterator } from '@sinclair/typebox/compiler';
import { Codec } from './types';
import _ from 'lodash';

//

export const getSchema = async (content: string, keys?: JSON) => {
	const codec: Codec = await introspect(content);
	if (keys) {
		for (const k of Object.keys(keys)) delete codec[k];
	}
	const encodingToType = {
		string: Type.String(),
		number: Type.Number()
	};
	const schema = Type.Object(
		Object.fromEntries(
			Object.values(codec).map(({ name, encoding }) => [name, encodingToType[encoding]])
		)
	);
	return schema;
};

export const validateData = (schema: any, data: JSON | Record<string, unknown>) => {
	const C = TypeCompiler.Compile(schema);
	if (C.Check(data)) {
		return data;
	} else {
		throw new Error(`Invalid data provided:
${JSON.stringify(formatTypeboxErrors(C.Errors(data)), null, 2)}
`);
	}
};

export function formatTypeboxErrors(typeboxErrors: ValueErrorIterator): Record<string, string[]> {
	const errors = [...typeboxErrors];
	const groups = _.groupBy(errors, (error) => error.path);
	return _.mapValues(groups, (group) => group.map((error) => error.message));
}

//

export const handleArrayBuffer = (message: ArrayBuffer | string) => {
	if (message instanceof ArrayBuffer) {
		const decoder = new TextDecoder();
		return JSON.parse(decoder.decode(message));
	}
	return JSON.parse(message);
};
