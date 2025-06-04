// src/app/services/song.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Song } from '../models/song.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  private apiUrl = `${environment.apiUrl}/songs`;

  constructor(private http: HttpClient) { }

  // Obtenir totes les cançons (amb paginació opcional)
  getSongs(page: number = 1, limit: number = 20): Observable<Song[]> {
    let params = new HttpParams().set('page', page.toString()).set('limit', limit.toString());
    return this.http.get<Song[]>(this.apiUrl, { params });
  }

  // Cercar cançons per query params
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

  // Obtenir cançó per id
  getSongById(id: string): Observable<Song> {
    return this.http.get<Song>(`${this.apiUrl}/${id}`);
  }

  // Crear cançó (requereix JWT)
  createSong(title: string, artist: string): Observable<Song> {
    const body = { title, artist };
    return this.http.post<Song>(this.apiUrl, body);
  }

  // Actualitzar cançó per id (requereix JWT)
  updateSong(id: string, data: { title?: string; artist?: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  // Esborrar cançó per id (requereix JWT)
  deleteSong(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
