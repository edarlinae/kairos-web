import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgFor, NgIf, DatePipe } from '@angular/common';

export interface BlogPost {
  id: number;
  title: string;
  date: string;
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
      this.posts = data.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      // Abrir por query (?post=ID) si llega enlazado
      const params = new URLSearchParams(window.location.search);
      const pid = params.get('post');
      if (pid) {
        const p = this.posts.find(x => String(x.id) === pid);
        if (p) this.openPost(p, false);
      }
    });
  }

  private canonicalUrlFor(post: BlogPost): string {
    const base = window.location.origin + '/blog';
    return `${base}?post=${post.id}`;
  }

  openPost(post: BlogPost, pushState = true) {
    this.selectedPost = post;
    document.body.style.overflow = 'hidden';
    if (pushState) history.pushState({}, '', this.canonicalUrlFor(post));
  }

  closePost() {
    this.selectedPost = null;
    document.body.style.overflow = '';
    history.pushState({}, '', '/blog');
  }

  share(kind: 'whatsapp' | 'x' | 'facebook' | 'email') {
    if (!this.selectedPost) return;
    const url = this.canonicalUrlFor(this.selectedPost);
    const title = this.selectedPost.title;
    let shareUrl = '';

    switch (kind) {
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`;
        break;
      case 'x':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(title + '\\n' + url)}`;
        break;
    }
    window.open(shareUrl, '_blank');
  }
}
