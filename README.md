# Projecte Spotify Backend

Aquest projecte és una API desenvolupada amb Node.js i Express que permet la gestió d'usuaris, cançons i playlists, imitant parcialment el funcionament d'una plataforma com Spotify. S'ha implementat autenticació mitjançant JWT, operacions CRUD per a les diferents entitats i una estructura modular que facilita el manteniment i l'escalabilitat del codi.

---

## 1. Introducció

- **Descripció breu:**  
  El backend gestiona la creació i consulta d'usuaris, cançons i playlists. També s'ofereix la possibilitat d'afegir o eliminar cançons d'una playlist. El projecte compta amb un sistema d'autenticació basat en JWT que protegeix les rutes sensibles.

- **Demostració del frontend:**  
  El frontend permet interactuar amb aquestes funcionalitats. Per exemple, pots iniciar sessió, veure la llista de cançons, afegir-ne de noves, gestionar les teves playlists, etc.

---

## 2. Arquitectura i Tecnologies

### Tecnologies utilitzades

- **Node.js i Express:** Gestió del servidor i rutes API.
- **SQL Server:** Base de dades per emmagatzemar usuaris, cançons i playlists.
- **mssql:** Llibreria per interactuar amb SQL Server.
- **JWT:** Autenticació basada en tokens.
- **bcryptjs:** Xifrat de contrasenyes.
- **CORS, dotenv, etc.:** Configuració addicional per a la seguretat i gestió d'entorns.

### Organització del codi

La següent estructura de carpetes reflecteix com s'ha organitzat el projecte:

backend/ ├── config/ │ └── db.js # Configuració de la connexió a la BD ├── controllers/
│ ├── authController.js # Registre, login, actualització i eliminació d'usuaris │ ├── songController.js # Operacions CRUD per cançons │ ├── playlistController.js # Operacions CRUD per playlists │ └── playlistSongController.js # Gestió de cançons dins de playlists ├── middleware/ │ ├── authMiddleware.js # Verifica el token JWT │ └── errorHandler.js # Gestió global d'errors ├── models/ │ ├── userModel.js # Funcions per gestionar els usuaris a la BD │ ├── songModel.js # Funcions per gestionar les cançons │ ├── playlistModel.js # Funcions per gestionar les playlists │ └── playlistSongModel.js # Funcions per la relació Playlist-Song ├── routes/ │ ├── authRoutes.js # Rutes per a autenticació │ ├── songRoutes.js # Rutes per a cançons │ └── playlistRoutes.js # Rutes per a playlists i gestió de cançons en playlists ├── .env.example # Exemple de fitxer d'entorn ├── package.json └── index.js # Punt d'entrada del servidor


### Base de dades: Estructura i Relacions

S'ha dissenyat una base de dades anomenada `spotify` amb les següents taules:

- **Users:**  
  Emmagatzema informació dels usuaris (Id, Username, Email, Password, CreatedAt).

- **Songs:**  
  Emmagatzema les cançons (Id, Title, Artist, UserId, CreatedAt).  
  La columna **UserId** és una clau forana que fa referència a **Users(Id)**.

- **Playlists:**  
  Emmagatzema les playlists (Id, Name, UserId, CreatedAt).  
  La columna **UserId** és una clau forana que fa referència a **Users(Id)**.

- **PlaylistSongs:**  
  Taula intermitja per la relació molts a molts entre **Playlists** i **Songs**. Té com a claus primàries **PlaylistId** i **SongId**, amb claus foranes a les respectives taules.

*Adjunta el diagrama Entitat-Relació (ER) com a imatge si ho consideres necessari.*

---

## 3. Configuració del projecte

### Instal·lació de dependències

Després de clonar el repositori, instal·la les dependències amb:

```bash
npm install
