import pino from "pino";

/**
 * Server-side structured logger using Pino
 * - DEV: Pretty-printed colorized output with timestamps
 * - PROD: JSON formatted logs for log aggregation services
 *
 * Usage:
 * import { log } from '~/utils/logger';
 * log.info('User action', { userId: 123 });
 * log.error('API failure', error, { endpoint: '/api/contact' });
 */
export const logger = pino({
	level: import.meta.env.DEV ? "debug" : "info",
	transport: import.meta.env.DEV
		? {
				target: "pino-pretty",
				options: {
					colorize: true,
					translateTime: "HH:MM:ss",
					ignore: "pid,hostname",
				},
			}
		: undefined,
});

/**
 * Typed helper functions for common logging patterns
 */
export const log = {
	/**
	 * Log informational messages
	 * @param msg - Human-readable message
	 * @param data - Structured data to include in log
	 */
	info: (msg: string, data?: object) => logger.info(data, msg),

	/**
	 * Log error messages with optional error object
	 * @param msg - Human-readable error description
	 * @param error - Error object or unknown error
	 * @param data - Additional context data
	 */
	error: (msg: string, error?: Error | unknown, data?: object) => {
		logger.error({ err: error, ...data }, msg);
	},

	/**
	 * Log warning messages
	 * @param msg - Human-readable warning
	 * @param data - Structured data to include in log
	 */
	warn: (msg: string, data?: object) => logger.warn(data, msg),

	/**
	 * Log debug messages (only in DEV mode)
	 * @param msg - Debug message
	 * @param data - Debug data
	 */
	debug: (msg: string, data?: object) => logger.debug(data, msg),
};
