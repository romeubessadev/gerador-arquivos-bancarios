module.exports = {
	comments: false,
	presets: [
		[
			'@babel/preset-env',
			{
				targets: {
					node: 'current',
				},
			},
		],
		'@babel/preset-typescript',
		'minify',
	],
	ignore: ['**/*.spec.ts'],
};
