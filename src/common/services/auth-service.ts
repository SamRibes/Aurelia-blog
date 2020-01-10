export class AuthService {
	public delay: any;
	public currentUser: any;
	public users: any;

	constructor() {
		this.delay = 100;
		this.currentUser = null;
		this.users = ['Nick Shallee', 'Jane Doe', 'Sam'];
	}

	login(name: string) {
		return new Promise((resolve, reject) => {
		  setTimeout(() => {
				if (this.users.includes(name)) {
					this.currentUser = name;
					resolve({ user: name });
				} else {
					reject('Invalid credentials.');
				}
		  }, this.delay);
		});
	}

	logout() {
		return new Promise((resolve, reject) => {
		  setTimeout(() => {
				this.currentUser = null;
				if (this.currentUser) {
					reject('Invalid credentials.');
				} else {
					resolve({ success: true });
				}
		  }, this.delay);
		});	
	}

	signup(name: string) {
		return new Promise((resolve, reject) => {
		  setTimeout(() => {
				if (!this.users.includes(name)) {
					this.users.push(name);
					this.currentUser = name;
					resolve({ user: name });
				} else {
					reject('This user already exists.');
				}
		  }, this.delay);
		});		
	}

}
