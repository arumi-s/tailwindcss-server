import minimist from 'minimist';
import { Options } from './types/Options';
import { build } from './build';
import { Args } from './types/Args';

/**
 * hide tailwindcss warning message workaround
 * see: https://github.com/tailwindlabs/tailwindcss/blob/master/src/util/log.js#L6
 */
try {
	if (typeof process?.env === 'object' && !process.env.JEST_WORKER_ID) {
		process.env.JEST_WORKER_ID = '1';
	}
} catch (_: unknown) {}

process.env.BROWSERSLIST_IGNORE_OLD_DATA = '1';

const args = minimist(Bun.argv, {
	alias: Object.fromEntries(
		[...Object.keys(Args.options.flatMap((option) => option.keyof().Values)), ...Object.keys(Options.keyof().Values)]
			.map((key) => [key, key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()])
			.filter((key) => key[0] !== key[1]),
	),
});

const serveArgs = Args.safeParse(args);

if (serveArgs.success) {
	/**
	 * server mode: respond to http requests based on query string and post body
	 */

	Bun.serve({
		...serveArgs.data,
		async fetch(req) {
			const url = new URL(req.url);

			const html = req.body ? await Bun.readableStreamToText(req.body) : '';
			const options = Options.parse(Object.fromEntries(url.searchParams.entries()));

			const result = await build(html, options);

			return new Response(result);
		},
	});
} else {
	const cliArgs = Options.safeParse(args);

	if (cliArgs.success) {
		/**
		 * cli mode: respond to shell commands based on argv and stdin
		 */

		process.stdout.write(await build(await Bun.readableStreamToText(Bun.stdin.stream()), cliArgs.data));
		process.exit(0);
	}

	process.exit(127);
}
