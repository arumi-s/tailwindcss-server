import tailwindcss from 'tailwindcss';
import postcss from 'postcss';
import postcssNested from 'postcss-nested';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import { Options } from './types/Options';

export async function build(html: string, options: Options): Promise<string> {
	const timeStart = performance.now();

	const result = await postcss([
		tailwindcss({
			content: [{ raw: html, extension: 'html' }],

			important: options.important,
			prefix: options.prefix,
			separator: options.separator,
			safelist: options.safelist,
			blocklist: options.blocklist,
			presets: options.presets,
			future: options.future,
			experimental: options.experimental,
			darkMode: options.darkMode,

			corePlugins: {
				preflight: options.preflight,
			},
		}),
		postcssNested(),
		autoprefixer(),
		cssnano(),
	]).process(
		`${options.scope} {
	${options.baseLayer ? '@tailwind base;' : ''}
	${options.componentsLayer ? '@tailwind components;' : ''}
	${options.utilitiesLayer ? '@tailwind utilities;' : ''}
}`,
		{
			from: undefined,
		},
	);

	const timeTaken = performance.now() - timeStart;

	return result.css + (options.time ? `/*${timeTaken.toFixed(0)}ms/` : '');
}
