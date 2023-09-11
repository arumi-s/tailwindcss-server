import { z } from 'zod';

export const Args = z.union([
	z.object({
		port: z.number().or(z.string()).default(3000),
		hostname: z.string().optional(),
	}),
	z.object({ unix: z.string() }),
]);

export type Args = z.infer<typeof Args>;
