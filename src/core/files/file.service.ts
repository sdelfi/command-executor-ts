import { dirname, isAbsolute, join } from 'path';
import promises from 'fs';

export class FileService {
	private isExists(path: string) {
		try {
			promises.stat(path, () => {});
			return true;
		} catch {
			return false;
		}
	}
	public getFilePath(path: string, name: string, ext: string): string {
		if (!isAbsolute(path)) {
			path = join(dirname('.') + '/' + path);
		}
		return join(dirname(path) + '/' + name + '.' + ext);
	}

	async deleteFileIfExists(path: string) {
		if (this.isExists(path)) {
			promises.unlink(path, () => {});
		}
	}
}
