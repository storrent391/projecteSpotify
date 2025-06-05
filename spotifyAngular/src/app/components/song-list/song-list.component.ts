// **3. Assegura’t que `SongListComponent` mostri correctament `song.id` (UUID) i les altres propietats.**
// spotifyAngular/src/app/components/songs/song-list/song-list.component.ts

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SongService } from '../../services/song.service';
import { AuthService } from '../../services/auth.service';
import { Song } from '../../models/song.model';

@Component({
  selector: 'app-song-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.css']
})
export class SongListComponent implements OnInit {
  songs: Song[] = [];
  page: number = 1;
  limit: number = 20;
  queryTitle: string = '';
  queryArtist: string = '';
  errorMsg: string = '';

  private songService = inject(SongService);
  private authService = inject(AuthService);

  ngOnInit(): void {
    this.loadSongs();
  }

  loadSongs(): void {
    this.songService.getSongs(this.page, this.limit).subscribe({
      next: data => {
        this.songs = data;
      },
      error: err => {
        console.error('Error al carregar cançons:', err);
        this.errorMsg = 'No s’han pogut carregar les cançons';
      }
    });
  }

  search(): void {
    if (!this.queryTitle && !this.queryArtist) {
      this.page = 1;
      this.loadSongs();
      return;
    }
    this.songService.searchSongs(this.queryTitle, this.queryArtist).subscribe({
      next: data => {
        this.songs = data;
      },
      error: err => {
        console.error('Error en la cerca de cançons:', err);
        this.errorMsg = 'No s’han trobat cançons amb aquests criteris';
      }
    });
  }

  nextPage(): void {
    this.page++;
    this.loadSongs();
  }

  prevPage(): void {
    if (this.page > 1) {
      this.page--;
      this.loadSongs();
    }
  }

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('jwtToken');
  }

  isOwner(song: Song): boolean {
    const currentUser = this.authService.currentUser;
    return currentUser ? currentUser.id === song.userId : false;
  }

  deleteSong(songId: string): void {
    if (!confirm('Segur que vols eliminar aquesta cançó?')) return;

    this.songService.deleteSong(songId).subscribe({
      next: () => {
        this.loadSongs();
      },
      error: err => {
        console.error('Error en esborrar la cançó:', err);
        this.errorMsg = 'No s’ha pogut eliminar la cançó';
      }
    });
  }
}
