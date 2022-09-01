import { ChildProcessWithoutNullStreams, spawn } from 'child_process';
import { CommandExecutor } from '../../core/executor/command.executor';
import { IStreamLogger } from '../../core/handlers/stream-logger.interface';
import { FileService } from '../../core/files/file.service';
import { PromptService } from '../../core/prompt/prompt.service';
import { IFfmpegInput, ICommandExecFfmpeg } from './ffmpeg.types';
import { FfmpegBuilder } from './ffmpeg.builder';
import { StreamHandler } from '../../core/handlers/stream.handler';

export class FfmpegExecutor extends CommandExecutor<IFfmpegInput> {
	private fileService: FileService = new FileService();
	private promptService: PromptService = new PromptService();

	constructor(logger: IStreamLogger) {
		super(logger);
	}

	protected async prompt(): Promise<IFfmpegInput> {
		const width = await this.promptService.input<number>('width', 'number');
		const height = await this.promptService.input<number>('height', 'number');
		const path = await this.promptService.input<string>('Input file path', 'input');
		const name = await this.promptService.input<string>('Input file name', 'input');
		return {
			width,
			height,
			name,
			path,
		};
	}

	protected build({ width, height, name, path }: IFfmpegInput): ICommandExecFfmpeg {
		const output = this.fileService.getFilePath(path, name, 'mp4');
		const args = new FfmpegBuilder().input(path).setVideoSize(width, height).output(output);
		return {
			command: 'ffmpeg',
			args,
			output,
		};
	}

	protected spawn({ output, command, args }: ICommandExecFfmpeg): ChildProcessWithoutNullStreams {
		this.fileService.deleteFileIfExists(output);
		return spawn(command, args);
	}
	protected processStream(stream: ChildProcessWithoutNullStreams, logger: IStreamLogger): void {
		const handler = new StreamHandler(logger);
		handler.processOutput(stream);
	}
}
