# Song des Tages

Statische GitHub-Pages-Seite für `song.heute-auch-nicht.de`.

Die Seite liest den aktuellen Song und das Archiv aus `songs.json`. Der n8n-Workflow ersetzt diese Datei täglich über die GitHub Contents API. Es gibt keine Datenbank und keinen Serverprozess.

## Veröffentlichung

1. Dateien in ein öffentliches GitHub-Repository hochladen.
2. Unter **Settings → Pages** als Quelle **Deploy from a branch**, Branch **main** und Ordner **/(root)** auswählen.
3. Als Custom Domain `song.heute-auch-nicht.de` eintragen.
4. Beim DNS-Anbieter einen CNAME-Eintrag `song` anlegen, der auf `jonariver.github.io` zeigt.

## Datenformat

Neue Songs werden am Anfang des Arrays in `songs.json` eingefügt. Die Seite zeigt den ersten Eintrag groß und maximal 30 ältere Einträge im Archiv.

```json
{
  "date": "2026-08-13",
  "artist": "Eurythmics",
  "title": "Sweet Dreams (Are Made of This)",
  "release_year": 1983,
  "de_peak": 4,
  "uk_peak": 2,
  "us_peak": 1,
  "youtube_url": "https://www.youtube.com/results?search_query=..."
}
```
