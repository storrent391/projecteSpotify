import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SongService, Song } from '../../services/song.service';

@Component({
  selector: 'app-song-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.css']
})
export class SongListComponent implements OnInit {
  songs: Song[] = [];

  constructor(private songService: SongService) {}

  ngOnInit(): void {
    this.loadSongs();
  }

  loadSongs(): void {
    this.songService.getSongs().subscribe({
      next: (data) => {
        console.log('Canciones recibidas:', data); // Ver qué datos llegan realmente
        if (Array.isArray(data)) {
          this.songs = data;
        } else {
          console.error('Error: La API no devuelve un array');
        }
      },
      error: (err) => console.error('Error obteniendo canciones:', err)
    });
  }
  
}
