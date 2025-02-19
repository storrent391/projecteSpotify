import { Component, OnInit } from '@angular/core';
import { SongService } from '../../services/song.service';
import { Song } from '../../models/song.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  songs: Song[] = [];

  constructor(private songService: SongService) {}

  ngOnInit(): void {
    this.songService.getSongs().subscribe((songs) => {
      
    });
  }

}
