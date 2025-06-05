// src/app/components/playlists/playlist-detail/playlist-detail.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { PlaylistService } from '../../services/playlist.service';
import { SongService } from '../../services/song.service';
import { AuthService } from '../../services/auth.service';
import { Playlist } from '../../models/playlist.model';
import { Song } from '../../models/song.model';

@Component({
  selector: 'app-playlist-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './playlist-detail.component.html',
  styleUrls: ['./playlist-detail.component.css']
})
export class PlaylistDetailComponent implements OnInit {
  playlistId!: string;
  playlist!: Playlist;
  songsInPlaylist: Song[] = [];
  errorMsg: string = '';

  // Per buscar cançons per nom
  querySongTitle: string = '';
  searchResults: Song[] = [];
  selectedSongId: string | null = null;
  searchError: string = '';

  private playlistService = inject(PlaylistService);
  private songService = inject(SongService);
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.playlistId = this.route.snapshot.paramMap.get('id') as string;
    this.loadPlaylist();
    this.loadSongsInPlaylist();
  }

  loadPlaylist(): void {
    this.playlistService.getPlaylistById(this.playlistId).subscribe({
      next: data => {
        this.playlist = data;
      },
      error: err => {
        console.error('Error al carregar la playlist:', err);
        this.errorMsg = 'No s’ha pogut carregar la playlist';
      }
    });
  }

  loadSongsInPlaylist(): void {
    this.playlistService.getSongsInPlaylist(this.playlistId).subscribe({
      next: data => {
        // Convertim each raw a Song model, si cal
        this.songsInPlaylist = data.map((raw: any) => ({
          id: raw.Id,
          title: raw.Title,
          artist: raw.Artist,
          userId: raw.UserId
        }));
      },
      error: err => {
        console.error('Error al carregar cançons de la playlist:', err);
        this.errorMsg = 'No s’han pogut carregar les cançons de la playlist';
      }
    });
  }

  get isOwner(): boolean {
    const currentUser = this.authService.currentUser;
    return currentUser ? currentUser.id === this.playlist.userId : false;
  }

  deleteSongFromPlaylist(songId: string): void {
    if (!confirm('Segur que vols eliminar aquesta cançó de la playlist?')) return;

    this.playlistService.removeSongFromPlaylist(this.playlistId, songId).subscribe({
      next: () => {
        this.loadSongsInPlaylist();
      },
      error: err => {
        console.error('Error en eliminar la cançó de la playlist:', err);
        this.errorMsg = 'No s’ha pogut eliminar la cançó de la playlist';
      }
    });
  }

  // Cerca cançons per títol
  searchSongByTitle(): void {
    if (!this.querySongTitle.trim()) {
      this.searchError = 'Introduce un títol per cercar.';
      this.searchResults = [];
      return;
    }
    this.songService.searchSongs(this.querySongTitle, '').subscribe({
      next: data => {
        this.searchResults = data;
        if (this.searchResults.length === 0) {
          this.searchError = 'No s’han trobat cançons amb aquest títol';
        } else {
          this.searchError = '';
        }
        this.selectedSongId = null;
      },
      error: err => {
        console.error('Error en la cerca de cançons:', err);
        this.searchError = 'Error en cercar cançons';
        this.searchResults = [];
      }
    });
  }

  addSelectedSong(): void {
    if (!this.selectedSongId) {
      this.searchError = 'Selecciona una cançó de la llista.';
      return;
    }
    this.playlistService.addSongToPlaylist(this.playlistId, this.selectedSongId).subscribe({
      next: () => {
        this.querySongTitle = '';
        this.searchResults = [];
        this.selectedSongId = null;
        this.loadSongsInPlaylist();
      },
      error: err => {
        console.error('Error en afegir la cançó a la playlist:', err);
        this.searchError = 'No s’ha pogut afegir la cançó';
      }
    });
  }
}
