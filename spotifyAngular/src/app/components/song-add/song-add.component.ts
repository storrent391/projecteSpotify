import { Component } from '@angular/core';
import { SongService, Song } from '../../services/song.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-song-add',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './song-add.component.html',
  styleUrls: ['./song-add.component.css']
})
export class SongAddComponent {
  
  newSong: Partial<Song> = {
    Title: '',
    Artist: ''
  };

  constructor(private songService: SongService) {}

  addSong(): void {
    const token = 'tu_token_aqui';
    this.songService.addSong(this.newSong, token).subscribe({
      next: (data) => {
        console.log('Canción añadida:', data);
      },
      error: (err) => {
        console.error('Error afegint cançó', err);
      }
    });
  }
}
