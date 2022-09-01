import { IStreamLogger } from '../../core/handlers/stream-logger.interface';

export class ConsoleLogger implements IStreamLogger {
	private static instance?: ConsoleLogger;

	public static getInstance() {
		return ConsoleLogger.instance ?? new ConsoleLogger();
	}

	log(...args: any[]): void {
		console.log(...args);
	}
	error(...args: any[]): void {
		console.log(...args);
	}
	end(): void {
		console.log('Done');
	}
}
