// src/app/components/playlists/playlist-list/playlist-list.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PlaylistService } from '../../services/playlist.service';
import { Playlist } from '../../models/playlist.model';

@Component({
  selector: 'app-playlist-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './playlist-list.component.html',
  styleUrls: ['./playlist-list.component.scss']
})
export class PlaylistListComponent implements OnInit {
  playlists: Playlist[] = [];
  private playlistService = inject(PlaylistService);

  ngOnInit(): void {
    this.loadPlaylists();
  }

  loadPlaylists(): void {
    this.playlistService.getPlaylists().subscribe({
      next: data => this.playlists = data,
      error: err => console.error('Error carregant playlists:', err)
    });
  }

  // Getter per a templates
  get isLoggedIn(): boolean {
    return !!localStorage.getItem('jwtToken');
  }
}
