import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  public helloApi: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {

    this.http.get<{ message: string }>(`http://localhost:3000`).subscribe({
    next:() => {
    console.log('success');
    },
    error: () => {
    console.log('error');
    },
  })
  }
}
