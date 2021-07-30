import { BroadcastChannel } from 'broadcast-channel';

type Message = {
	token: string;
};

const channel: BroadcastChannel<Message> = new BroadcastChannel('openchannel-csrf-sync');

const MemoryStorage = () => {
	let xsrfToken = '';

	channel.onmessage = (msg) => {
		xsrfToken = msg.token;
	};

	return {
		setXsrfToken: async (token: string) => {
			xsrfToken = token;
			await channel.postMessage({ token });
		},
		getXsrfToken: () => xsrfToken,
		removeXsrfToken: async () => {
			xsrfToken = '';
		},
	}
}

export const memoryStorage = MemoryStorage();
