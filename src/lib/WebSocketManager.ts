import { HubConnectionBuilder } from '@microsoft/signalr';

export class WebSocketManager {
	private static instance: WebSocketManager;
	private connection: any;

	private async start() {
		try {
			this.connection.start();
		} catch (err: unknown) {
			console.log(err);
			setTimeout(this.start, 2000);
		}
	}

	private constructor() {
		this.connection = new HubConnectionBuilder()
			.withUrl(`http://localhost:5096/projectHub`)
			.build();
		// this.connection.start().catch((err:Error) => {
		//     console.error(err.toString())
		//     setTimeout()
		// });

		this.connection.onclose(async () => {
			await this.start();
		});

		this.start();
	}

	public static getInstance(): WebSocketManager {
		if (!WebSocketManager.instance) {
			WebSocketManager.instance = new WebSocketManager();
		}
		return WebSocketManager.instance;
	}

	public invoke(methodName: string, ...args: any[]): Promise<any> {
		return this.connection.invoke(methodName, ...args);
	}

	public stop(): Promise<void> {
		return this.connection.stop();
	}

	public on(eventName: string, callback: (...args: any[]) => void): void {
		this.connection.on(eventName, callback);
	}
}
