import { PromptService } from './core/prompt/prompt.service';
export class App {
	async run() {
		const result = await new PromptService().input<number>('Enter number:', 'number');
		console.log('Done', result);
	}
}

const app = new App();

app.run();
