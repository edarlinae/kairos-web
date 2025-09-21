import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgFor, DatePipe } from '@angular/common';

interface BlogArticle {
  id: number;
  title: string;
  date: string;
  image: string;
  excerpt: string;
  content: string;
}

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [NgFor, DatePipe],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  articles: BlogArticle[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.http.get<BlogArticle[]>('assets/blog.json').subscribe(data => {
      this.articles = data.sort((a, b) => +new Date(b.date) - +new Date(a.date));
    });
  }

  openArticle(id: number) {
    this.router.navigate(['/blog', id]);
  }
}
