// src/app/services/song.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Song } from '../models/song.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  private apiUrl = `${environment.apiUrl}/songs`;

  constructor(private http: HttpClient) { }

  getSongs(page: number = 1, limit: number = 20): Observable<Song[]> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
    return this.http.get<Song[]>(this.apiUrl, { params });
  }

  searchSongs(title?: string, artist?: string): Observable<Song[]> {
    let params = new HttpParams();
    if (title) {
      params = params.set('title', title);
    }
    if (artist) {
      params = params.set('artist', artist);
    }
    return this.http.get<Song[]>(`${this.apiUrl}/search`, { params });
  }

  getSongById(id: string): Observable<Song> {
    return this.http.get<Song>(`${this.apiUrl}/${id}`);
  }

  createSong(title: string, artist: string): Observable<Song> {
    const body = { title, artist };
    return this.http.post<Song>(this.apiUrl, body);
  }

  updateSong(id: string, data: { title?: string; artist?: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteSong(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
