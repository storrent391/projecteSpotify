// src/app/app.routes.ts
import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import { SongListComponent } from './components/song-list/song-list.component';
import { SongDetailComponent } from './components/song-detail/song-detail.component';
import { SongFormComponent } from './components/song-form/song-form.component';

import { PlaylistListComponent } from './components/playlist-list/playlist-list.component';
import { PlaylistDetailComponent } from './components/playlist-detail/playlist-detail.component';
import { PlaylistFormComponent } from './components/playlist-form/playlist-form.component';

import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },

  // Auth
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Songs
  { path: 'songs', component: SongListComponent },
  { path: 'songs/new', component: SongFormComponent, canActivate: [AuthGuard] },
  { path: 'songs/:id', component: SongDetailComponent },
  { path: 'songs/:id/edit', component: SongFormComponent, canActivate: [AuthGuard] },

  // Playlists
  { path: 'playlists', component: PlaylistListComponent },
  { path: 'playlists/new', component: PlaylistFormComponent, canActivate: [AuthGuard] },
  { path: 'playlists/:id', component: PlaylistDetailComponent },
  { path: 'playlists/:id/edit', component: PlaylistFormComponent, canActivate: [AuthGuard] },

  // Cua per defecte: redirigeix a Home
  { path: '**', redirectTo: '' }
];
