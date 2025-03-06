/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'class',
	theme: {
		extend: {
			fontFamily: {
				'wenkai': ['LXGW WenKai Screen R', 'sans-serif'],
			},
			typography: {
				DEFAULT: {
					css: {
						maxWidth: 'none',
						p: {
							fontSize: '0.9375rem',
							lineHeight: '1.5',
							marginTop: '0.5em',
							marginBottom: '0.5em'
						},
						'h1, h2, h3, h4': {
							fontWeight: '600',
							lineHeight: '1.25',
							marginTop: '1em',
							marginBottom: '0.5em'
						},
						h1: {
							fontSize: '1.375rem'
						},
						h2: {
							fontSize: '1.25rem'
						},
						h3: {
							fontSize: '1.125rem'
						},
						li: {
							fontSize: '0.9375rem',
							marginTop: '0.25em',
							marginBottom: '0.25em'
						},
						'ul, ol': {
							marginTop: '0.5em',
							marginBottom: '0.5em',
							paddingLeft: '1.25em'
						},
						blockquote: {
							fontSize: '0.9375rem',
							fontStyle: 'oblique',
							backgroundColor: '#A78BFA',
							color: '#ffffff',
							padding: '0.75rem',
							borderLeftWidth: '4px',
							borderLeftColor: '#8B5CF6',
							marginTop: '0.75em',
							marginBottom: '0.75em',
							borderRadius: '0.2em',
							'p': {
								color: '#ffffff',
								margin: 0,
							},
						},
						code: {
							fontSize: '0.9375rem'
						},
						pre: {
							marginTop: '0.75em',
							marginBottom: '0.75em',
							padding: '0.75em'
						},
						img: {
							marginTop: '0.75em',
							marginBottom: '0.75em'
						},
						hr: {
							marginTop: '1em',
							marginBottom: '1em'
						}
					}
				},
				'invert': {
					css: {
						blockquote: {
							backgroundColor: '#8B5CF6',
							borderLeftColor: '#A78BFA',
							color: '#ffffff',
							'p': {
								color: '#ffffff',
							},
						},
					},
				},
				xl: {
					css: {
						fontSize: '0.9375rem',
						lineHeight: '1.5',
						p: {
							marginTop: '0.5em',
							marginBottom: '0.5em'
						},
						h1: {
							fontSize: '1.625rem',
							marginTop: '1em',
							marginBottom: '0.5em'
						},
						h2: {
							fontSize: '1.375rem',
							marginTop: '1em',
							marginBottom: '0.5em'
						},
						h3: {
							fontSize: '1.25rem',
							marginTop: '1em',
							marginBottom: '0.5em'
						}
					}
				}
			}
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
	],
} 