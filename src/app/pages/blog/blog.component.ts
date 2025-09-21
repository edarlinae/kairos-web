import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgFor, NgIf, DatePipe } from '@angular/common';

export interface BlogPost {
  id: number;
  title: string;
  date: string;      // ISO yyyy-mm-dd
  image: string;
  excerpt: string;
  content: string;   // HTML
  category?: string;
}

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [NgFor, NgIf, DatePipe],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  posts: BlogPost[] = [];
  selectedPost: BlogPost | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<BlogPost[]>('assets/blog.json').subscribe((data) => {
      // ordenar por fecha desc
      this.posts = data.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    });
  }

  openPost(post: BlogPost) {
    this.selectedPost = post;
    // opcional: bloquear scroll al abrir modal
    document.body.style.overflow = 'hidden';
  }

  closePost() {
    this.selectedPost = null;
    document.body.style.overflow = '';
  }
}
