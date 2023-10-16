import { z } from 'zod';

const booleanString = z
	.union([z.boolean(), z.literal('true'), z.literal('false'), z.literal('0'), z.literal('1')])
	.transform((value) => value === true || value === 'true' || value === '1');

export const Options = z.object({
	scope: z.coerce.string().default('').catch(''),

	/** configs */
	important: z.boolean().or(z.string()).optional(),
	prefix: z.string().optional(),
	separator: z.string().optional(),
	safelist: z.array(z.string().or(z.object({ pattern: z.instanceof(RegExp), variants: z.array(z.string()).optional() }))).optional(),
	blocklist: z.array(z.string()).optional(),
	presets: z.array(z.any()).optional(),
	future: z.literal('all').or(z.record(z.boolean().optional())).optional(),
	experimental: z.literal('all').or(z.record(z.boolean().optional())).optional(),
	darkMode: z
		.enum(['media', 'class'])
		.or(z.tuple([z.enum(['class']), z.string()]))
		.optional(),

	/** corePlugins */
	preflight: booleanString.default(true).catch(true),

	/** layers */
	baseLayer: booleanString.default(true).catch(true),
	componentsLayer: booleanString.default(true).catch(true),
	utilitiesLayer: booleanString.default(true).catch(true),

	/** logs */
	time: booleanString.default(false).catch(false),
});

export type Options = z.infer<typeof Options>;
