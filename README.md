# Spotify Clone – README

Aplicació full-stack amb **Node.js/Express** (backend) i **Angular** (frontend standalone components).

---

## ÍNDEX

1. [Descripció del projecte](#descripció-del-projecte)  
2. [Estructura de directoris](#estructura-de-directoris)  
3. [Requeriments](#requeriments)  
4. [Configuració i arrencada del backend](#configuració-i-arrencada-del-backend)  
   1. [Variables d’entorn](#41-variables-dentorn)  
   2. [Instal·lació de dependències](#42-instal·lació-de-dependències)  
   3. [Arrencada del servidor](#43-arrencada-del-servidor)  
5. [Configuració i arrencada del frontend Angular](#configuració-i-arrencada-del-frontend-angular)  
   1. [Variables d’entorn](#51-variables-dentorn)  
   2. [Instal·lació de dependències](#52-instal·lació-de-dependències)  
   3. [Estructura de fitxers](#53-estructura-de-fitxers)  
   4. [Arrencada de l’aplicació](#54-arrencada-de-laplicació)  
6. [Endpoints del backend](#endpoints-del-backend)  
7. [Funcionalitats principals](#funcionalitats-principals)  
8. [Usabilitat i accessibilitat](#usabilitat-i-accessibilitat)  

---

## Descripció del projecte

Aplicació tipus “Spotify Clone” que permet a usuaris:

- Registrar-se / Fer login amb JWT.  
- **CRUD de cançons**: llistar, cercar, veure detall, crear, editar i esborrar.  
- **CRUD de playlists**: llistar, veure detall, crear, editar, esborrar.  
- Afegir/treure cançons a playlists.  
- Interfície Angular “standalone components” que consumeix el backend via HTTP.  

---

## Estructura de directoris

```
projecteSpotify/
│
├── backend/                      # Servidor Express + SQL Server
│   ├── config/
│   │   └── db.js                 # Connexió a la BBDD (mssql)
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── songController.js
│   │   ├── playlistController.js
│   │   └── playlistSongController.js
│   ├── middleware/
│   │   └── authMiddleware.js     # Verifica i decodifica JWT
│   ├── models/
│   │   ├── userModel.js
│   │   ├── songModel.js
│   │   ├── playlistModel.js
│   │   └── playlistSongModel.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── songRoutes.js
│   │   └── playlistRoutes.js
│   ├── app.js                    # Entry point servidor
│   └── package.json
│
└── spotifyAngular/               # Aplicació Angular (standalone components)
    ├── .angular/                 # Angular CLI artifacts
    ├── .vscode/                  # VSCode settings
    ├── node_modules/             # Dependències instal·lades
    ├── public/                   # (opcional) recursos públics
    │
    ├── src/
    │   ├── environments/
    │   │   ├── environment.ts    # URL base API per a dev
    │   │   └── environment.prod.ts
    │   ├── main.ts               # bootstrapApplication + provides
    │   ├── index.html            # HTML principal
    │   ├── styles.css            # Estils globals
    │   ├── app.config.ts         # Configuració global (si s’utilitza)
    │   ├── app.routes.ts         # Rutes Angular
    │   ├── core/                 # Mòduls o serveis compartits
    │   │   └── (ex. guarda de lògica compartida)
    │   ├── guards/
    │   │   └── auth.guard.ts     # Protecció de rutes
    │   ├── interceptors/
    │   │   └── jwt.interceptor.ts # Interceptor per afegir JWT al header
    │   ├── models/
    │   │   ├── user.model.ts
    │   │   ├── auth-response.model.ts
    │   │   ├── song.model.ts
    │   │   └── playlist.model.ts
    │   ├── services/
    │   │   ├── auth.service.ts
    │   │   ├── song.service.ts
    │   │   └── playlist.service.ts
    │   └── components/
    │       ├── home/
    │       │   ├── home.component.ts
    │       │   ├── home.component.html
    │       │   └── home.component.css
    │       │
    │       ├── auth/
    │       │   ├── login/
    │       │   │   ├── login.component.ts
    │       │   │   ├── login.component.html
    │       │   │   └── login.component.css
    │       │   └── register/
    │       │       ├── register.component.ts
    │       │       ├── register.component.html
    │       │       └── register.component.css
    │       │
    │       ├── songs/
    │       │   ├── song-list/
    │       │   │   ├── song-list.component.ts
    │       │   │   ├── song-list.component.html
    │       │   │   └── song-list.component.css
    │       │   ├── song-detail/
    │       │   │   ├── song-detail.component.ts
    │       │   │   ├── song-detail.component.html
    │       │   │   └── song-detail.component.css
    │       │   ├── song-form/
    │       │   │   ├── song-form.component.ts
    │       │   │   ├── song-form.component.html
    │       │   │   └── song-form.component.css
    │       │   └── song-form-component/  # (opcional duplicat)
    │       │       ├── song-form-component.component.ts
    │       │       ├── song-form-component.component.html
    │       │       └── song-form-component.component.css
    │       │
    │       └── playlists/
    │           ├── playlist-list/
    │           │   ├── playlist-list.component.ts
    │           │   ├── playlist-list.component.html
    │           │   └── playlist-list.component.css
    │           ├── playlist-detail/
    │           │   ├── playlist-detail.component.ts
    │           │   ├── playlist-detail.component.html
    │           │   └── playlist-detail.component.css
    │           └── playlist-form/
    │               ├── playlist-form.component.ts
    │               ├── playlist-form.component.html
    │               └── playlist-form.component.css
    │
    ├── package.json
    └── tsconfig.json
```
## Requeriments

- **Backend**  
  - Node.js ≥ 16  
  - SQL Server (o Azure SQL)  

- **Frontend**  
  - Node.js ≥ 16  
  - Angular CLI ≥ 15  

---

## Configuració i arrencada del backend

### 4.1. Variables d’entorn

Crea un fitxer `.env` a la carpeta `backend/` amb aquestes variables:

```bash
PORT=5000

DB_SERVER=<el_servidor_sql>
DB_DATABASE=<nom_base_dades>
DB_USER=<usuari_sql>
DB_PASSWORD=<password_sql>
DB_PORT=<port_sql>          # p. ex. 1433
DB_ENCRYPT=true             # “true” o “false” segons TLS
DB_TRUST_SERVER_CERTIFICATE=true

JWT_SECRET=<clau_super_secreta>

---

4.2. Instal·lació de dependències
Obre terminal, ves a backend/ i executa:

bash
Copiar
Editar
npm install
Les dependències principals inclouen:

express, cors, dotenv

mssql (per connectar a SQL Server)

bcryptjs, jsonwebtoken, express-validator

4.3. Arrencada del servidor
Després d’haver configurat el .env i instal·lat dependències:

bash
Copiar
Editar
node app.js
O, si utilitzes nodemon per a recarregar en calent:

bash
Copiar
Editar
npx nodemon app.js
Si tot funciona correctament, hauràs de veure a la consola:

bash
Copiar
Editar
🟢 Connected to SQL Server
✅ Servidor en execució a http://localhost:5000

---
5.4. Arrencada de l’aplicació
Des d’un terminal, dins de spotifyAngular/, executa:

bash
Copiar
Editar
ng serve
Després, obre el navegador a http://localhost:4200.

---

## Endpoints del backend

Els endpoints retornen JSON i utilitzen JWT per a rutes protegides. Totes les rutes estan prefixades amb `/api`.

### 6.1. Autenticació (`/api/auth`)

- **POST /api/auth/register**  
  - **Body**:
    ```json
    {
      "username": "jordi",
      "email": "jordi@example.com",
      "password": "password123"
    }
    ```
  - **Response 201**:
    ```json
    {
      "message": "Usuari creat amb èxit",
      "user": {
        "id": "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
        "username": "jordi",
        "email": "jordi@example.com"
      }
    }
    ```

- **POST /api/auth/login**  
  - **Body**:
    ```json
    {
      "email": "jordi@example.com",
      "password": "password123"
    }
    ```
  - **Response 200**:
    ```json
    {
      "message": "Login correcte",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    ```

- **PUT /api/auth/update** (auth required)  
  - **Headers**:
    ```
    Authorization: Bearer <token>
    ```
  - **Body (opcional)**:
    ```json
    {
      "username": "nouNom",
      "email": "nou@example.com",
      "password": "novaPass456"
    }
    ```
  - **Response 200**:
    ```json
    {
      "message": "Usuari actualitzat correctament",
      "user": {
        "id": "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
        "username": "nouNom",
        "email": "nou@example.com"
      }
    }
    ```

- **DELETE /api/auth/delete** (auth required)  
  - **Headers**:
    ```
    Authorization: Bearer <token>
    ```
  - **Body**:
    ```json
    {}
    ```
  - **Response 200**:
    ```json
    { "message": "Usuari eliminat correctament" }
    ```

---

### 6.2. Cançons (`/api/songs`)

- **GET /api/songs?page=<n>&limit=<m>**  
  - Llista paginada de cançons.  
  - **Response 200**:
    ```json
    [
      { "id": "uuid-1", "title": "Imagine", "artist": "John Lennon", "userId": "user-uuid" },
      { "id": "uuid-2", "title": "Hey Jude", "artist": "The Beatles", "userId": "user-uuid" }
      // …
    ]
    ```

- **GET /api/songs/search?title=<t>&artist=<a>**  
  - Cerca per títol i/o artista (LIKE).  
  - **Response 200**: array de cançons que coincideixin.

- **GET /api/songs/:id**  
  - Obté detall d’una cançó concreta.  
  - **Response 200**:
    ```json
    { "id": "uuid", "title": "Imagine", "artist": "John Lennon", "userId": "user-uuid" }
    ```

- **POST /api/songs** (auth required)  
  - **Headers**:
    ```
    Authorization: Bearer <token>
    ```
  - **Body**:
    ```json
    { "title": "Imagine", "artist": "John Lennon" }
    ```
  - **Response 201**:
    ```json
    { "id": "nou-uuid", "title": "Imagine", "artist": "John Lennon", "userId": "user-uuid" }
    ```

- **PUT /api/songs/:id** (auth + owner)  
  - **Headers**:
    ```
    Authorization: Bearer <token>
    ```
  - **Body (almenys un camp)**:
    ```json
    { "title": "Imagine (Remastered)" }
    ```
  - **Response 200**:
    ```json
    { "message": "Cançó actualitzada correctament" }
    ```

- **DELETE /api/songs/:id** (auth + owner)  
  - **Headers**:
    ```
    Authorization: Bearer <token>
    ```
  - **Response 200**:
    ```json
    { "message": "Cançó eliminada amb èxit" }
    ```

---

### 6.3. Playlists (`/api/playlists`)

- **GET /api/playlists**  
  - Llista de totes les playlists.  
  - **Response 200**:
    ```json
    [
      { "id": "pl-uuid-1", "name": "Road Trip 2025", "userId": "user-uuid", "createdAt": "2025-06-04T12:34:56.789Z" },
      { "id": "pl-uuid-2", "name": "My Favorites", "userId": "user-uuid", "createdAt": "2025-06-03T09:20:15.123Z" }
      // …
    ]
    ```

- **GET /api/playlists/:id**  
  - Detall d’una playlist concreta.  
  - **Response 200**:
    ```json
    { "id": "pl-uuid-1", "name": "Road Trip 2025", "userId": "user-uuid", "createdAt": "2025-06-04T12:34:56.789Z" }
    ```

- **POST /api/playlists** (auth required)  
  - **Headers**:
    ```
    Authorization: Bearer <token>
    ```
  - **Body**:
    ```json
    { "name": "Road Trip 2025" }
    ```
  - **Response 201**:
    ```json
    { "id": "nou-pl-uuid", "name": "Road Trip 2025", "userId": "user-uuid", "createdAt": "2025-06-04T12:34:56.789Z" }
    ```

- **PUT /api/playlists/:id** (auth + owner)  
  - **Headers**:
    ```
    Authorization: Bearer <token>
    ```
  - **Body**:
    ```json
    { "name": "Road Trip 2025 - Updated" }
    ```
  - **Response 200**:
    ```json
    { "id": "pl-uuid-1", "name": "Road Trip 2025 - Updated", "userId": "user-uuid", "createdAt": "2025-06-04T12:34:56.789Z" }
    ```

- **DELETE /api/playlists/:id** (auth + owner)  
  - **Headers**:
    ```
    Authorization: Bearer <token>
    ```
  - **Response 200**:
    ```json
    { "message": "Playlist eliminada amb èxit" }
    ```

- **GET /api/playlists/:playlistId/songs**  
  - Llista de cançons que pertanyen a una playlist.  
  - **Response 200**:
    ```json
    [
      { "id": "song-uuid-1", "title": "Imagine", "artist": "John Lennon", "userId": "user-uuid" },
      { "id": "song-uuid-2", "title": "Hey Jude", "artist": "The Beatles", "userId": "user2-uuid" }
      // …
    ]
    ```

- **POST /api/playlists/:playlistId/songs** (auth + owner)  
  - **Headers**:
    ```
    Authorization: Bearer <token>
    ```
  - **Body**:
    ```json
    { "songId": "song-uuid-1" }
    ```
  - **Response 201**:
    ```json
    { "playlistId": "pl-uuid-1", "songId": "song-uuid-1", "addedAt": "2025-06-04T12:35:30.123Z" }
    ```

- **DELETE /api/playlists/:playlistId/songs/:songId** (auth + owner)  
  - **Headers**:
    ```
    Authorization: Bearer <token>
    ```
  - **Response 200**:
    ```json
    { "message": "Cançó eliminada de la playlist amb èxit" }
    ```
---

## Funcionalitats principals

1. **Autenticació amb JWT**  
   - Tots els endpoints protegits requereixen header `Authorization: Bearer <token>`.  
   - El middleware `authMiddleware` a `backend/middleware/authMiddleware.js` verifica la signatura del token i desa `req.user` amb `{ Id, Email }`.

2. **Gestió de cançons**  
   - **Llistat/paginació**:  
     - La funció `getAllSongs({ page, limit })` fa servir SQL Server amb `OFFSET ... FETCH NEXT ...` per retornar una pàgina de cançons.  
   - **Cerca**:  
     - La ruta `GET /api/songs/search?title=<t>&artist=<a>` implementa la cerca amb `WHERE Title LIKE '%<t>%' AND Artist LIKE '%<a>%'`.  
   - **CRUD**:  
     - **Crear**: `POST /api/songs` amb cos `{ "title": "...", "artist": "..." }` crea una nova cançó amb `INSERT ... OUTPUT INSERTED.*`.  
     - **Llegir**:  
       - `GET /api/songs` retorna totes (paginades).  
       - `GET /api/songs/:id` retorna la cançó per `id` (o per títol).  
     - **Actualitzar**: `PUT /api/songs/:id` accepta `{ "title"?: "...", "artist"?: "..." }` i executa `UPDATE Songs SET ... WHERE Id = @Id`.  
     - **Esborrar**: `DELETE /api/songs/:id` elimina la cançó amb `DELETE FROM Songs WHERE Id = @Id`.  
   - **Angular**:  
     - **`SongService`** a `spotifyAngular/src/app/services/song.service.ts`: mètodes `getSongs()`, `searchSongs()`, `getSongById()`, `addSong()`, `updateSong()`, `deleteSong()`.  
     - **Components**:  
       - **`song-list`**: mostra llistat de cançons amb cerca, paginació i botó “Esborrar” (només si `isOwner`).  
       - **`song-detail`**: mostra detall d’una cançó amb botons “Editar”/“Esborrar” (només si `isOwner`).  
       - **`song-form`**: formulari reactiu per a crear/editar cançons amb validacions (`Validators.required`).  

3. **Gestió de playlists**  
   - **CRUD de playlists**:  
     - **Crear**: `POST /api/playlists` amb `{ "name": "..." }` fa `INSERT INTO Playlists (Name, UserId, CreatedAt)`.  
     - **Llegir**:  
       - `GET /api/playlists` retorna totes les playlists.  
       - `GET /api/playlists/:id` retorna la playlist per `id`.  
     - **Actualitzar**: `PUT /api/playlists/:id` amb `{ "name": "..." }` actualitza el camp `Name`.  
     - **Esborrar**: `DELETE /api/playlists/:id` elimina la playlist.  
   - **Gestió de cançons dins una playlist**:  
     - **Llistar cançons d’una playlist**: `GET /api/playlists/:playlistId/songs` fa `SELECT` a `PlaylistSongs JOIN Songs`.  
     - **Afegir cançó**: `POST /api/playlists/:playlistId/songs` amb `{ "songId": "..." }` fa `INSERT INTO PlaylistSongs (PlaylistId, SongId, AddedAt)`.  
     - **Eliminar cançó**: `DELETE /api/playlists/:playlistId/songs/:songId` fa `DELETE FROM PlaylistSongs WHERE PlaylistId=@playlistId AND SongId=@songId`.  
   - **Angular**:  
     - **`PlaylistService`** a `spotifyAngular/src/app/services/playlist.service.ts`: mètodes `getPlaylists()`, `getPlaylistById()`, `addPlaylist()`, `updatePlaylist()`, `deletePlaylist()`, `getSongsInPlaylist()`, `addSongToPlaylist()`, `removeSongFromPlaylist()`.  
     - **Components**:  
       - **`playlist-list`**: mostra llistat de playlists i botó “Nova Playlist” (si `isLoggedIn`).  
       - **`playlist-detail`**: mostra detall d’una playlist amb llista de cançons, formulari per afegir cançó i botó “Eliminar cançó”.  
       - **`playlist-form`**: formulari per crear/editar playlists amb validacions.  

4. **Frontend Angular**  
   - **Standalone Components**:  
     - No es fa servir `AppModule`. Tots els components tenen `standalone: true` i importen explícitament els mòduls necessaris (`CommonModule`, `FormsModule`, `RouterModule`).  
   - **`main.ts`**:  
     - Línia clau:  
       ```ts
       bootstrapApplication(AppComponent, {
         providers: [
           provideHttpClient(withInterceptorsFromDi()),
           provideRouter(routes),
           {
             provide: HTTP_INTERCEPTORS,
             useClass: JwtInterceptor,
             multi: true
           }
         ]
       });
       ```  
     - Això arrenca l’aplicació, proveeix el client HTTP amb interceptors i registra les rutes.  
   - **Interceptor JWT** (`spotifyAngular/src/app/interceptors/jwt.interceptor.ts`):  
     - Afegeix el token a cada petició HTTP si existeix a `localStorage`.  
   - **AuthGuard** (`spotifyAngular/src/app/guards/auth.guard.ts`):  
     - `CanActivateFn` que comprova si hi ha token abans de permetre accedir a rutes protegides (`/songs/new`, `/playlists/new`, etc.).  
   - **Rutes** (`spotifyAngular/src/app/app.routes.ts`):  
     - Exemple:
       ```ts
       export const routes: Routes = [
         { path: '', component: HomeComponent },
         { path: 'login', component: LoginComponent },
         { path: 'register', component: RegisterComponent },
         {
           path: 'songs',
           children: [
             { path: '', component: SongListComponent },
             { path: 'new', component: SongFormComponent, canActivate: [AuthGuard] },
             { path: ':id', component: SongDetailComponent },
             { path: ':id/edit', component: SongFormComponent, canActivate: [AuthGuard] }
           ]
         },
         {
           path: 'playlists',
           children: [
             { path: '', component: PlaylistListComponent },
             { path: 'new', component: PlaylistFormComponent, canActivate: [AuthGuard] },
             { path: ':id', component: PlaylistDetailComponent },
             { path: ':id/edit', component: PlaylistFormComponent, canActivate: [AuthGuard] }
           ]
         },
         { path: '**', redirectTo: '' }
       ];
       ```
   - **Estils CSS**:  
     - Cada component té el seu fitxer `.css` amb estils senzills i contrast adequat per a accessibilitat.  

```markdown
---

## Usabilitat i accessibilitat

S’ha implementat la majoria de bones pràctiques per complir tant els 10 principis d’usabilitat de Nielsen com les directrius WCAG:

1. **Visibilitat de l’estat del sistema**  
   - Barra de navegació sempre visible, ressaltant l’estat “Login/Register” vs “Logout”.  
   - Missatges d’error i confirmacions (“Segur que vols esborrar?”).

2. **Coincidència amb el món real**  
   - Terminologia en català clara: “Cançons”, “Playlists”, “Entrar”, “Registra’t”.  
   - Labels i **placeholders** descriptius en formularis.

3. **Control i llibertat de l’usuari**  
   - Navegació lliure mitjançant nav-bar.  
   - Botó “Logout” accessible sempre.  
   - Confirmacions per esborrar, per evitar accions accidentals.

4. **Consistència i estàndards**  
   - Estils uniformes per a botons, formularis i llistes.  
   - Organització coherent de rutes (`/songs`, `/songs/:id`, `/songs/new`, `/songs/:id/edit` i `/playlists/...`).

5. **Prevenció d’errors**  
   - Botons `:disabled` si el formulari no és vàlid.  
   - Confirmacions a l’esborrar cançons i playlists.  
   - Validacions del formulari amb missatges d’error immediats.

6. **Reconèixer en comptes de recordar**  
   - Labels clarament associats amb inputs (`<label for="...">`).  
   - Botons i enllaços mostrats en context (per exemple, “Esborrar” només si ets propietari).

7. **Flexibilitat i eficiència d’ús**  
   - Navegació per teclat habilitada (`Tab`, `Enter`).  
   - Rutes directes accessibles des de la barra d’URL.

8. **Estètica i disseny minimalista**  
   - Colors neutres i espais nets.  
   - Contrast adequat sense excessos visuals.

9. **Ajuda en reconèixer, diagnosticar i recuperar-se d’errors**  
   - Missatges d’error clars sota cada camp.  
   - Si una ruta no existeix (`/songs/abc-invalid`), es mostra “Cançó no trobada”.

10. **Documentació i ajuda**  
    - README detallat amb instruccions.  
    - Placeholders exemple en formularis.  
    - Enllaços:  
      - “Ja tens compte? Inicia sessió”  
      - “Encara no tens compte? Registra’t”

### Directrius WCAG

- **Perceptible**  
  - Contrast ≥ 4.5:1 en colors de text sobre fons.  
  - Utilització de `[attr.aria-label]` en botons d’esborrar (p. ex.: `[attr.aria-label]="'Esborrar ' + song.title"`).

- **Operable**  
  - Navegació amb **Tab** i **Enter** per accedir i activar enllaços/botons.  
  - Focus visible estès a enllaços i inputs.

- **Comprensible**  
  - Formularis accessibles: cada `<input>` té un `<label for="...">`.  
  - Missatges clars d’error i indicacions textuals (p. ex.: “Títol és obligatori”).

- **Robust**  
  - HTML semàntic (`<nav>`, `<form>`, `<label>`, `<input>`, `<button>`, `<ul>`, `<li>`).  
  - Components Angular compatibles amb lectors de pantalla (VoiceOver, NVDA).


---

**Gràcies per provar el projecte!**
