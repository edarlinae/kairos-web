import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgIf, DatePipe } from '@angular/common';

interface BlogArticle {
  id: number;
  title: string;
  date: string;
  image: string;
  content: string;
}

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [NgIf, DatePipe, RouterLink],
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {
  article?: BlogArticle;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.http.get<BlogArticle[]>('assets/blog.json').subscribe(arts => {
      this.article = arts.find(a => a.id === id);
    });
  }
}
