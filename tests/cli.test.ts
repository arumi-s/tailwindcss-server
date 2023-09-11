import { expect, test } from 'bun:test';

test('cli can serve', async () => {
	const proc = Bun.spawn(['bun', 'run', '../src/index.ts', '--preflight=false'], { cwd: import.meta.dir, stdin: Bun.file('./test.html') });
	const result = Bun.readableStreamToText(proc.stdout);

	expect(result).toContain('*,:after,:before');
});
