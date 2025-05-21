# Liked Songs Extractor for Spicetify

<div align="center">
  
![Spicetify](https://img.shields.io/badge/Spicetify-Extension-brightgreen)
![Version](https://img.shields.io/badge/Version-0.1.0-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

</div>

A simple and powerful Spicetify extension that extracts all your liked songs from Spotify and copies them to your clipboard in JSON format. Perfect for creating backups of your music library or analyzing your music taste!

## ✨ Features

- 📋 Extract your complete liked songs library with one click
- ⚡ Fast and efficient extraction process with progress notifications
- 🔄 Automatically handles pagination for large libraries
- 📱 Clean and intuitive UI with a simple button in the Spotify toolbar
- 💾 Copy results to clipboard for easy export to any format
- 🛡️ Error handling with user-friendly notifications

## 🚀 Installation

1. Make sure you have [Spicetify](https://spicetify.app/) installed
2. Install [Spicetify Creator](https://github.com/spicetify/spicetify-creator) if you haven't already
3. Clone this repository:
   ```bash
   git clone https://github.com/TBG101/Liked-Songs-Extractor.git
   ```
4. Navigate to the project directory:
   ```bash
   cd Liked-Songs-Extractor
   ```
5. Build the extension:
   ```bash
   npm run build-local
   ```
6. Copy the built files to your Spicetify extensions folder
7. Apply the changes:
   ```bash
   spicetify apply
   ```

## 💡 Usage

1. Open Spotify
2. Look for the "Extract Liked Songs" button in the top bar
3. Click the button to start the extraction process
4. Wait for the process to complete
5. Your liked songs will be copied to your clipboard in JSON format
6. Paste the content into a text editor or other application to save or process the data

## 📊 JSON Output Format

```json
[
  {
    "name": "Song Name",
    "artist": "Artist Name",
    "uri": "spotify:track:xxxxxxxxxxxxxxxxxxxx"
  },
  ...
]
```

## 🔧 Development

This extension is built with Spicetify Creator, which provides a modern development environment with TypeScript support.

```bash
# Install dependencies
npm install

# Start development mode with auto-reload
npm run watch

# Build for production
npm run build
```

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👏 Acknowledgements

- [Spicetify](https://spicetify.app/) for the amazing platform
- [Spicetify Creator](https://github.com/spicetify/spicetify-creator) for the development tools

---

<div align="center">
  Made with ❤️ for Spotify users everywhere
</div>