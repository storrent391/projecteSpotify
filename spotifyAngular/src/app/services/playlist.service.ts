// src/app/services/playlist.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Playlist } from '../models/playlist.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  private apiUrl = `${environment.apiUrl}/playlists`;

  constructor(private http: HttpClient) { }

  getPlaylists(): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(this.apiUrl);
  }

  getPlaylistById(id: string): Observable<Playlist> {
    return this.http.get<Playlist>(`${this.apiUrl}/${id}`);
  }

  createPlaylist(name: string): Observable<Playlist> {
    const body = { name };
    return this.http.post<Playlist>(this.apiUrl, body);
  }

  updatePlaylist(id: string, name: string): Observable<Playlist> {
    return this.http.put<Playlist>(`${this.apiUrl}/${id}`, { name });
  }

  deletePlaylist(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getSongsInPlaylist(playlistId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${playlistId}/songs`);
  }

  addSongToPlaylist(playlistId: string, songId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${playlistId}/songs`, { songId });
  }

  removeSongFromPlaylist(playlistId: string, songId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${playlistId}/songs/${songId}`);
  }
}
