import { Component, OnInit } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: [ './home.component.css' ]
})
export class HomeComponent implements OnInit {
	constructor(private auth: Auth) {}

	ngOnInit(): void {
		onAuthStateChanged(this.auth, (user) => {
			if (user) {
				window.location.href = '/courses';
			}
		});
	}
}
