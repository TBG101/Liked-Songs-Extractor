async function fetchLikedList() {
  console.log("Fetching liked songs...");
  let url = "https://api.spotify.com/v1/me/tracks?limit=50";
  const allTracks: { name: string; artist: string; uri: string }[] = [];

  try {
    while (url) {
      const response = await Spicetify.CosmosAsync.get(url);

      if (!response) {
        Spicetify.showNotification(
          "Failed to fetch liked songs: Empty response"
        );
        return [];
      }

      if (response.error) {
        Spicetify.showNotification(
          `Failed to fetch liked songs: ${
            response.error.message || "Unknown error"
          }`
        );
        console.error("API error:", response.error);
        return [];
      }

      if (
        !response.items ||
        !Array.isArray(response.items) ||
        response.items.length === 0
      ) {
        break;
      }

      const likedTracks = response.items
        .filter((item: { track: any }) => item && item.track)
        .map((item: any) => ({
          name: item.track.name || "Unknown Track",
          artist: item.track.artists
            ? item.track.artists.map((a: any) => a.name).join(", ")
            : "Unknown Artist",
          uri: item.track.uri || "",
        }));

      allTracks.push(...likedTracks);
      url = response.next || null;

      // Show progress
      Spicetify.showNotification(
        `Fetched ${allTracks.length} tracks so far...`
      );
    }

    return allTracks;
  } catch (error) {
    console.error("Error in fetchLikedList:", error);
    const errorMessage =
      error instanceof Error && error.message ? error.message : "Unknown error";
    Spicetify.showNotification(`Error fetching tracks: ${errorMessage}`);
    return [];
  }
}

async function onGetSavedTracksClick() {
  try {
    Spicetify.showNotification("Fetching liked songs...", false);
    const likedTracks = await fetchLikedList();

    if (!likedTracks || likedTracks.length === 0) {
      Spicetify.showNotification("No liked songs found or error occurred.");
      return;
    }

    Spicetify.showNotification(
      `Found ${likedTracks.length} liked songs. Preparing download...`
    );

    await Spicetify.Platform.ClipboardAPI.copy(
      JSON.stringify(likedTracks, null, 2)
    );

    Spicetify.showNotification(
      `${likedTracks.length} Saved Tracks copied to clipboard!`,
      false,
      5000
    );
  } catch (error) {
    console.error("Error in onGetSavedTracksClick:", error);
    const errorMessage =
      error instanceof Error && error.message ? error.message : "Unknown error";
    Spicetify.showNotification(`Error: ${errorMessage}`);
  }
}

async function main() {
  // Wait for Spicetify to be fully initialized

  if (
    !Spicetify ||
    !Spicetify.Topbar ||
    !Spicetify.CosmosAsync ||
    !Spicetify.Platform ||
    !Spicetify.Platform.ClipboardAPI ||
    !Spicetify.showNotification ||
    !Spicetify.SVGIcons
  ) {
    setTimeout(main, 1000);
    return;
  }

  const button = new Spicetify.Topbar.Button(
    "Extract Liked Songs",
    '<svg data-encore-id="icon" role="img" aria-hidden="true" class="e-9890-icon e-9890-baseline" viewBox="0 0 24 24"><path xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" d="M8 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1h2a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2zm0 2H6v15h12V5h-2v1a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V5zm6-1h-4v1h4V4z" fill="#fff"/></svg>',
    async () => {
      await onGetSavedTracksClick();
    }
  );

  const svg = button.element.firstElementChild;
  if (svg instanceof HTMLElement) {
    svg.style.padding = "12px";
    svg.style.transform = "translateX(-1px)";
  }

  button.element.style.width = "48px";
  button.element.style.height = "48px";
  button.element.style.justifyContent = "center";
  button.element.style.alignItems = "center";
  button.element.style.background = "rgba(59, 45, 45, 0.5)";
  button.element.style.borderRadius = "12px";
  button.element.style.borderColor = "rgba(159, 140, 140, 0.5)";
  button.element.style.borderWidth = "1px";
  button.element.style.borderStyle = "solid";
  button.element.style.marginLeft = "12px";

  console.log("Liked Songs Extractor loaded successfully!");
}

export default main;
