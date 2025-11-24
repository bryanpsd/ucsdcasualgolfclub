/**
 * Client-side logging utilities
 * - DEV: Console output with emojis for visibility
 * - PROD: Completely silent (tree-shaken by bundler)
 *
 * Usage:
 * import { clientLog } from '~/utils/clientLogger';
 * clientLog.info('Component mounted', { componentId });
 * clientLog.error('API call failed', error);
 */

/**
 * Client-side logger that only outputs in development mode
 * All console statements are completely removed in production builds
 */
export const clientLog = {
	/**
	 * Log informational messages (DEV only)
	 * @param message - Human-readable message
	 * @param args - Additional arguments to log
	 */
	info: (message: string, ...args: unknown[]) => {
		if (import.meta.env.DEV) {
			// eslint-disable-next-line no-console
			console.log(`ℹ️ ${message}`, ...args);
		}
	},

	/**
	 * Log error messages (DEV only)
	 * @param message - Human-readable error description
	 * @param error - Error object or unknown error
	 */
	error: (message: string, error?: Error | unknown) => {
		if (import.meta.env.DEV) {
			// eslint-disable-next-line no-console
			console.error(`❌ ${message}`, error);
		}
	},

	/**
	 * Log warning messages (DEV only)
	 * @param message - Human-readable warning
	 * @param args - Additional arguments to log
	 */
	warn: (message: string, ...args: unknown[]) => {
		if (import.meta.env.DEV) {
			// eslint-disable-next-line no-console
			console.warn(`⚠️ ${message}`, ...args);
		}
	},

	/**
	 * Log debug messages (DEV only)
	 * @param message - Debug message
	 * @param args - Debug data
	 */
	debug: (message: string, ...args: unknown[]) => {
		if (import.meta.env.DEV) {
			// eslint-disable-next-line no-console
			console.debug(`🔍 ${message}`, ...args);
		}
	},
};
