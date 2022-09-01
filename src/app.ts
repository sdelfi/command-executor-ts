import { FfmpegExecutor } from './commands/ffmpeg/ffmpeg.executor';
import { ConsoleLogger } from './out/console-logger/console-logger';
import { DirExecutor } from './commands/dir/dir.executor';
export class App {
	async run() {
		// new DirExecutor(ConsoleLogger.getInstance()).execute();
		new FfmpegExecutor(ConsoleLogger.getInstance()).execute();
	}
}

const app = new App();

app.run();
