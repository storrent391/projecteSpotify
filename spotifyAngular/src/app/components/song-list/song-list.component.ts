// src/app/components/songs/song-list/song-list.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SongService } from '../../services/song.service';
import { Song } from '../../models/song.model';

@Component({
  selector: 'app-song-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.scss']
})
export class SongListComponent implements OnInit {
  songs: Song[] = [];
  page: number = 1;
  limit: number = 20;
  queryTitle: string = '';
  queryArtist: string = '';

  private songService = inject(SongService);

  ngOnInit(): void {
    this.loadSongs();
  }

  loadSongs(): void {
    this.songService.getSongs(this.page, this.limit).subscribe({
      next: data => this.songs = data,
      error: err => console.error('Error al carregar cançons:', err)
    });
  }

  search(): void {
    if (!this.queryTitle && !this.queryArtist) {
      this.page = 1;
      this.loadSongs();
      return;
    }
    this.songService.searchSongs(this.queryTitle, this.queryArtist).subscribe({
      next: data => this.songs = data,
      error: err => console.error('Error en la cerca de cançons:', err)
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

  // Getter per saber si l’usuari està loguejat
  get isLoggedIn(): boolean {
    return !!localStorage.getItem('jwtToken');
  }
}
