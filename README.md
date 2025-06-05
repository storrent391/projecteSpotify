Spotify Clone – README
Aplicació full-stack amb Node.js/Express (backend) i Angular (frontend standalone components).

ÍNDEX
Descripció del projecte

Estructura de directoris

Requeriments

Configuració i arrencada del backend

4.1. Variables d’entorn

4.2. Instal·lació de dependències

4.3. Arrencada del servidor

Configuració i arrencada del frontend Angular

5.1. Variables d’entorn

5.2. Instal·lació de dependències

5.3. Estructura de fitxers

5.4. Arrencada de l’aplicació

Endpoints del backend

Funcionalitats principals

Usabilitat i accessibilitat

Membres del projecte

Descripció del projecte
Aplicació tipus “Spotify Clone” que permet a usuaris:

Registrar-se / Fer login amb JWT.

CRUD de cançons: llistar, cercar, veure detall, crear, editar i esborrar.

CRUD de playlists: llistar, veure detall, crear, editar, esborrar.

Afegir/treure cançons a playlists.

Interfície Angular “standalone components” que consumeix el backend via HTTP.

Estructura de directoris
graphql
Copiar
Editar
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
    │   ├── app.config.ts         # Configuració global (si s'utilitza)
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
Requeriments
Backend

Node.js ≥ 16

SQL Server (o Azure SQL)

Frontend

Node.js ≥ 16

Angular CLI ≥ 15

Configuració i arrencada del backend
4.1. Variables d’entorn
Crea un fitxer .env a la carpeta backend/ amb aquestes variables:

ini
Copiar
Editar
PORT=5000

DB_SERVER=<el_servidor_sql>
DB_DATABASE=<nom_base_dades>
DB_USER=<usuari_sql>
DB_PASSWORD=<password_sql>
DB_PORT=<port_sql>          # p. ex. 1433
DB_ENCRYPT=true             # “true” o “false” segons TLS
DB_TRUST_SERVER_CERTIFICATE=true

JWT_SECRET=<clau_super_secreta>
4.2. Instal·lació de dependències
Obre terminal, ves a backend/ i executa:

bash
Copiar
Editar
npm install
Les dependències principals inclouen:

express, cors, dotenv

mssql per connectar a SQL Server

bcryptjs, jsonwebtoken, express-validator

4.3. Arrencada del servidor
bash
Copiar
Editar
node app.js
O, si instal·les nodemon:

bash
Copiar
Editar
npx nodemon app.js
Si tot funciona correctament, veuràs:

pgsql
Copiar
Editar
🟢 Connected to SQL Server
✅ Servidor en execució a http://localhost:5000
Configuració i arrencada del frontend Angular
5.1. Variables d’entorn
A spotifyAngular/src/environments/ crea (o modifica) aquests fitxers:

ts
Copiar
Editar
// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000/api'
};
ts
Copiar
Editar
// src/environments/environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'http://localhost:5000/api'
};
5.2. Instal·lació de dependències
Obre terminal i ves a spotifyAngular/:

bash
Copiar
Editar
npm install
Instal·la paquets auxiliars (si cal):

bash
Copiar
Editar
npm install @angular/forms @auth0/angular-jwt
5.3. Estructura de fitxers del frontend
Els punts clau de la carpeta spotifyAngular/src/app/ (ubicació per defecte):

app.routes.ts

Defineix totes les rutes amb provideRouter([...]) a main.ts.

app.component.ts / app.component.html / app.component.css

Shell principal que inclou la barra de navegació i el <router-outlet>.

core/

(Opcional) Lògica o mòduls compartits.

guards/auth.guard.ts

CanActivateFn que bloqueja rutes protegides si no hi ha token.

interceptors/jwt.interceptor.ts

HttpInterceptor per afegir JWT a cada petició HTTP.

models/

user.model.ts, auth-response.model.ts, song.model.ts, playlist.model.ts.

services/

auth.service.ts (registre, login, logout, update, delete).

song.service.ts (CRUD cançons + cerca).

playlist.service.ts (CRUD playlists + gestió cançons dins playlist).

components/

home/

home.component.ts, home.component.html, home.component.css.

auth/

login/ (login.component.ts, login.component.html, login.component.css)

register/ (register.component.ts, register.component.html, register.component.css)

songs/

song-list/ (song-list.component.ts, .html, .css)

song-detail/ (song-detail.component.ts, .html, .css)

song-form/ (song-form.component.ts, .html, .css)

song-form-component/ (opcional duplicat)

playlists/

playlist-list/ (playlist-list.component.ts, .html, .css)

playlist-detail/ (playlist-detail.component.ts, .html, .css)

playlist-form/ (playlist-form.component.ts, .html, .css)

Nota: Cada component és standalone: true i importa explícitament CommonModule, FormsModule, RouterModule, etc.

5.4. Arrencada de l’aplicació
bash
Copiar
Editar
ng serve
Després, obre el navegador a http://localhost:4200.

Endpoints del backend
Els endpoints retornen JSON i utilitzen JWT per a rutes protegides. Totes les rutes estan prefixades amb /api.

1. Autenticació (/api/auth)
POST /api/auth/register

Body:

json
Copiar
Editar
{
  "username": "jordi",
  "email": "jordi@example.com",
  "password": "password123"
}
Response 201:

json
Copiar
Editar
{
  "message": "Usuari creat amb èxit",
  "user": {
    "id": "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
    "username": "jordi",
    "email": "jordi@example.com"
  }
}
POST /api/auth/login

Body:

json
Copiar
Editar
{
  "email": "jordi@example.com",
  "password": "password123"
}
Response 200:

json
Copiar
Editar
{
  "message": "Login correcte",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
PUT /api/auth/update (auth required)

Headers: Authorization: Bearer <token>

Body (opcional):

json
Copiar
Editar
{
  "username": "nouNom",
  "email": "nou@example.com",
  "password": "novaPass456"
}
Response 200:

json
Copiar
Editar
{
  "message": "Usuari actualitzat correctament",
  "user": {
    "id": "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
    "username": "nouNom",
    "email": "nou@example.com"
  }
}
DELETE /api/auth/delete (auth required)

Headers: Authorization: Bearer <token>

Body: {}

Response 200:

json
Copiar
Editar
{ "message": "Usuari eliminat correctament" }
2. Cançons (/api/songs)
GET /api/songs?page=<n>&limit=<m>

Llista paginada de cançons.

Response 200:

json
Copiar
Editar
[
  { "id": "uuid-1", "title": "Imagine", "artist": "John Lennon", "userId": "user-uuid" },
  { "id": "uuid-2", "title": "Hey Jude", "artist": "The Beatles", "userId": "user-uuid" }
  // …
]
GET /api/songs/search?title=<t>&artist=<a>

Cerca per títol i/o artista (LIKE).

Response 200: array de cançons que coincideixin (JSON).

GET /api/songs/:id

Obté detall d’una cançó concreta.

Response 200:

json
Copiar
Editar
{ "id": "uuid", "title": "Imagine", "artist": "John Lennon", "userId": "user-uuid" }
POST /api/songs (auth required)

Headers: Authorization: Bearer <token>

Body:

json
Copiar
Editar
{ "title": "Imagine", "artist": "John Lennon" }
Response 201:

json
Copiar
Editar
{ "id": "nou-uuid", "title": "Imagine", "artist": "John Lennon", "userId": "user-uuid" }
PUT /api/songs/:id (auth + owner)

Headers: Authorization: Bearer <token>

Body (almenys un camp):

json
Copiar
Editar
{ "title": "Imagine (Remastered)" }
Response 200:

json
Copiar
Editar
{ "message": "Cançó actualitzada correctament" }
DELETE /api/songs/:id (auth + owner)

Headers: Authorization: Bearer <token>

Response 200:

json
Copiar
Editar
{ "message": "Cançó eliminada amb èxit" }
3. Playlists (/api/playlists)
GET /api/playlists

Llista de totes les playlists.

Response 200:

json
Copiar
Editar
[
  { "id": "pl-uuid-1", "name": "Road Trip 2025", "userId": "user-uuid", "createdAt": "2025-06-04T12:34:56.789Z" },
  { "id": "pl-uuid-2", "name": "My Favorites", "userId": "user-uuid", "createdAt": "2025-06-03T09:20:15.123Z" }
  // …
]
GET /api/playlists/:id

Detall d’una playlist concreta.

Response 200:

json
Copiar
Editar
{ "id": "pl-uuid-1", "name": "Road Trip 2025", "userId": "user-uuid", "createdAt": "2025-06-04T12:34:56.789Z" }
POST /api/playlists (auth required)

Headers: Authorization: Bearer <token>

Body:

json
Copiar
Editar
{ "name": "Road Trip 2025" }
Response 201:

json
Copiar
Editar
{ "id": "nou-pl-uuid", "name": "Road Trip 2025", "userId": "user-uuid", "createdAt": "2025-06-04T12:34:56.789Z" }
PUT /api/playlists/:id (auth + owner)

Headers: Authorization: Bearer <token>

Body:

json
Copiar
Editar
{ "name": "Road Trip 2025 - Updated" }
Response 200:

json
Copiar
Editar
{ "id": "pl-uuid-1", "name": "Road Trip 2025 - Updated", "userId": "user-uuid", "createdAt": "2025-06-04T12:34:56.789Z" }
DELETE /api/playlists/:id (auth + owner)

Headers: Authorization: Bearer <token>

Response 200:

json
Copiar
Editar
{ "message": "Playlist eliminada amb èxit" }
GET /api/playlists/:playlistId/songs

Llista de cançons que pertanyen a una playlist.

Response 200:

json
Copiar
Editar
[
  { "id": "song-uuid-1", "title": "Imagine", "artist": "John Lennon", "userId": "user-uuid" },
  { "id": "song-uuid-2", "title": "Hey Jude", "artist": "The Beatles", "userId": "user2-uuid" }
  // …
]
POST /api/playlists/:playlistId/songs (auth + owner)

Headers: Authorization: Bearer <token>

Body:

json
Copiar
Editar
{ "songId": "song-uuid-1" }
Response 201:

json
Copiar
Editar
{ "playlistId": "pl-uuid-1", "songId": "song-uuid-1", "addedAt": "2025-06-04T12:35:30.123Z" }
DELETE /api/playlists/:playlistId/songs/:songId (auth + owner)

Headers: Authorization: Bearer <token>

Response 200:

json
Copiar
Editar
{ "message": "Cançó eliminada de la playlist amb èxit" }
Funcionalitats principals
Autenticació amb JWT

Tots els endpoints protegits requereixen header Authorization: Bearer <token>.

El middleware authMiddleware a backend/middleware/authMiddleware.js verifica i desa req.user amb { Id, Email }.

Gestió de cançons

Llistat/paginació: getAllSongs({ page, limit }) amb SQL Server OFFSET ... FETCH NEXT ....

Cerca: searchSongs({ title, artist }) amb LIKE '%...%'.

CRUD: Crear (INSERT ... OUTPUT INSERTED.*), actualitzar només camps canviats, esborrar per Id.

Angular:

SongService (a spotifyAngular/src/app/services/song.service.ts).

Components:

song-list (llista + cerca + paginació + esborrar si és owner).

song-detail (detall + botons “Editar”/“Esborrar”).

song-form (form per crear/editar amb validacions).

Gestió de playlists

CRUD de playlists amb timestamps CreatedAt.

Associació Playlist–Song: taula PlaylistSongs(PlaylistId, SongId, AddedAt).

Angular:

PlaylistService (a spotifyAngular/src/app/services/playlist.service.ts).

Components:

playlist-list (llista, botó “Nova Playlist”).

playlist-detail (detall + llista de cançons + formulari per afegir-ne + botó per esborrar cançó).

playlist-form (form per crear/editar playlist).

Frontend Angular

Standalone Components: no s’utilitza AppModule. Tot ho arrenca bootstrapApplication a main.ts.

Interceptor JWT (spotifyAngular/src/app/interceptors/jwt.interceptor.ts) afegeix el token a cada petició.

AuthGuard (spotifyAngular/src/app/guards/auth.guard.ts) protegeix rutes que requereixen autenticació.

Rutes definides a spotifyAngular/src/app/app.routes.ts i registrades a main.ts mitjançant provideRouter(routes).

Estructura CSS: cada component té el seu fitxer .css amb estils senzills i contrast adequat.

Usabilitat i accessibilitat
S’ha implementat la majoria de bones pràctiques per complir tant els 10 principis d’usabilitat de Nielsen com les directrius WCAG:

Visibilitat de l’estat del sistema

Barra de navegació sempre visible, ressaltant l’estat “Login/Register” vs “Logout”.

Missatges d’error i confirmacions (“Segur que vols esborrar?”).

Coincidència amb el món real

Terminologia en català clara: “Cançons”, “Playlists”, “Entrar”, “Registra’t”.

Labels i placeholders descriptius.

Control i llibertat de l’usuari

Navegació lliure mitjançant nav-bar.

Botó “Logout” accessible sempre.

Confirmacions per esborrar per evitar accions accidentals.

Consistència i estàndards

Estils uniformes per a botons, formularis i llistes.

Organització coherent de rutes (/songs, /songs/:id, /songs/new, /songs/:id/edit i /playlists/…).

Prevenció d’errors

Botons “:disabled” si el formulari no és vàlid.

Confirmacions a l’esborrar cançons i playlists.

Validacions del formulari amb missatges d’error immediats.

Reconèixer en comptes de recordar

Labels clarament associats amb inputs (<label for="…">).

Botons i enllaços mostrats en context (per exemple, “Esborrar” només si ets propietari).

Flexibilitat i eficiència d’ús

Navegació per teclat habilitada (Tab, Enter).

Rutes directes accessibles des de la barra d’URL.

Estètica i disseny minimalista

Colors neutres i espais nets.

Contrast adequat sense excessos visuals.

Ajuda en reconèixer, diagnosticar i recuperar-se d’errors

Missatges d’error clars sota cada camp.

Si una ruta no existeix (/songs/abc-invalid), es mostra “Cançó no trobada”.

Documentació i ajuda

README detallat amb instruccions.

Placeholders exemple en formularis.

Links “Ja tens compte? Inicia sessió” i “Encara no tens compte? Registra’t”.

Accessibilitat WCAG

Perceptible: contrast ≥ 4.5:1, [attr.aria-label] en botons d’esborrar.

Operable: navegació per teclat, focus visible.

Comprensible: formularis amb label, missatges clars, placeholders.

Robust: HTML semàntic (nav, form, label, input, button, ul, li) i compatible amb lectors de pantalla.