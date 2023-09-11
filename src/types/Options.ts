import { z } from 'zod';

const booleanString = z
	.union([z.boolean(), z.literal('true'), z.literal('false'), z.literal('0'), z.literal('1')])
	.transform((value) => value === true || value === 'true' || value === '1');

export const Options = z.object({
	scope: z.coerce.string().default('').catch(''),
	preflight: booleanString.default(true).catch(true),
	baseLayer: booleanString.default(true).catch(true),
	componentsLayer: booleanString.default(true).catch(true),
	utilitiesLayer: booleanString.default(true).catch(true),
	time: booleanString.default(false).catch(false),
});

export type Options = z.infer<typeof Options>;
