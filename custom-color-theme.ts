import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const myCustomTheme: CustomThemeConfig = {
	name: 'custom',
	properties: {
		// =~= Theme Properties =~=
		'--theme-font-family-base': `system-ui`,
		'--theme-font-family-heading': `system-ui`,
		'--theme-font-color-base': 'var(--color-surface-900)',
		'--theme-font-color-dark': 'var(--color-tertiary-50)',
		'--theme-rounded-base': '4px',
		'--theme-rounded-container': '4px',
		'--theme-border-base': '1px',
		// =~= Theme On-X Colors =~=
		'--on-primary': '255 255 255',
		'--on-secondary': '0 0 0',
		'--on-tertiary': '255 255 255',
		'--on-success': '255 255 255',
		'--on-warning': '255 255 255',
		'--on-error': '0 0 0',
		'--on-surface': '255 255 255',
		// =~= Theme Colors  =~=
		// primary | #791400
		'--color-primary-50': '235 220 217', // #ebdcd9
		'--color-primary-100': '228 208 204', // #e4d0cc
		'--color-primary-200': '222 196 191', // #dec4bf
		'--color-primary-300': '201 161 153', // #c9a199
		'--color-primary-400': '161 91 77', // #a15b4d
		'--color-primary-500': '121 20 0', // #791400
		'--color-primary-600': '109 18 0', // #6d1200
		'--color-primary-700': '91 15 0', // #5b0f00
		'--color-primary-800': '73 12 0', // #490c00
		'--color-primary-900': '59 10 0', // #3b0a00
		// secondary | #69a1dd
		'--color-secondary-50': '233 241 250', // #e9f1fa
		'--color-secondary-100': '225 236 248', // #e1ecf8
		'--color-secondary-200': '218 232 247', // #dae8f7
		'--color-secondary-300': '195 217 241', // #c3d9f1
		'--color-secondary-400': '150 189 231', // #96bde7
		'--color-secondary-500': '105 161 221', // #69a1dd
		'--color-secondary-600': '95 145 199', // #5f91c7
		'--color-secondary-700': '79 121 166', // #4f79a6
		'--color-secondary-800': '63 97 133', // #3f6185
		'--color-secondary-900': '51 79 108', // #334f6c
		// tertiary | #0d375e
		'--color-tertiary-50': '219 225 231', // #dbe1e7
		'--color-tertiary-100': '207 215 223', // #cfd7df
		'--color-tertiary-200': '195 205 215', // #c3cdd7
		'--color-tertiary-300': '158 175 191', // #9eafbf
		'--color-tertiary-400': '86 115 142', // #56738e
		'--color-tertiary-500': '13 55 94', // #0d375e
		'--color-tertiary-600': '12 50 85', // #0c3255
		'--color-tertiary-700': '10 41 71', // #0a2947
		'--color-tertiary-800': '8 33 56', // #082138
		'--color-tertiary-900': '6 27 46', // #061b2e
		// success | #26503b
		'--color-success-50': '222 229 226', // #dee5e2
		'--color-success-100': '212 220 216', // #d4dcd8
		'--color-success-200': '201 211 206', // #c9d3ce
		'--color-success-300': '168 185 177', // #a8b9b1
		'--color-success-400': '103 133 118', // #678576
		'--color-success-500': '38 80 59', // #26503b
		'--color-success-600': '34 72 53', // #224835
		'--color-success-700': '29 60 44', // #1d3c2c
		'--color-success-800': '23 48 35', // #173023
		'--color-success-900': '19 39 29', // #13271d
		// warning | #6a522f
		'--color-warning-50': '233 229 224', // #e9e5e0
		'--color-warning-100': '225 220 213', // #e1dcd5
		'--color-warning-200': '218 212 203', // #dad4cb
		'--color-warning-300': '195 186 172', // #c3baac
		'--color-warning-400': '151 134 109', // #97866d
		'--color-warning-500': '106 82 47', // #6a522f
		'--color-warning-600': '95 74 42', // #5f4a2a
		'--color-warning-700': '80 62 35', // #503e23
		'--color-warning-800': '64 49 28', // #40311c
		'--color-warning-900': '52 40 23', // #342817
		// error | #c087bd
		'--color-error-50': '246 237 245', // #f6edf5
		'--color-error-100': '242 231 242', // #f2e7f2
		'--color-error-200': '239 225 239', // #efe1ef
		'--color-error-300': '230 207 229', // #e6cfe5
		'--color-error-400': '211 171 209', // #d3abd1
		'--color-error-500': '192 135 189', // #c087bd
		'--color-error-600': '173 122 170', // #ad7aaa
		'--color-error-700': '144 101 142', // #90658e
		'--color-error-800': '115 81 113', // #735171
		'--color-error-900': '94 66 93', // #5e425d
		// surface | #45484a
		'--color-surface-50': '227 228 228', // #e3e4e4
		'--color-surface-100': '218 218 219', // #dadadb
		'--color-surface-200': '209 209 210', // #d1d1d2
		'--color-surface-300': '181 182 183', // #b5b6b7
		'--color-surface-400': '125 127 128', // #7d7f80
		'--color-surface-500': '69 72 74', // #45484a
		'--color-surface-600': '62 65 67', // #3e4143
		'--color-surface-700': '52 54 56', // #343638
		'--color-surface-800': '41 43 44', // #292b2c
		'--color-surface-900': '34 35 36' // #222324
	}
};
