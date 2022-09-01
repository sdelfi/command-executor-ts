export class DirBuilder {
	private options: Map<string, string> = new Map();

	detailedOutput() {
		this.options.set('-l', '');
		return this;
	}

	output(): string[] {
		const args: string[] = [];
		this.options.forEach((value, key) => {
			args.push(key);
			if (value.length) args.push(value);
		});
		return args;
	}
}
