import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'cookbook-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit{
  public title = 'cookbook';
  public helloApi : string = '';


  constructor(private readonly http: HttpClient) {}

  ngOnInit() {

    this.http.get<{ message: string }>(`http://localhost:3000`).subscribe({
    next:(res) => {
      console.log(res.message);
      this.helloApi = res.message
    },
    error: () => {
    console.log('error');
    },
  })
  }
}
