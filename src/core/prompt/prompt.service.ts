import inquirer from 'inquirer';
import { PropmptType } from './prompt.types';

export class PromptService {
	public async input<T>(message: string, type: PropmptType) {
		const { result } = await inquirer.prompt<{ result: T }>([{ type, name: 'result', message }]);

		return result;
	}
}
