/**(Call API) and (Search button event handler) */
const searchBtn = document.querySelector('#search-btn');
searchBtn.addEventListener("click",function(){
  const searchBox = document.querySelector('#search-box');
  fetch(` ${'https://api.lyrics.ovh/suggest/'}${searchBox.value} `)
    .then((res) => res.json())
    .then((data) => dataInfo(data.data))
    .catch((error) => console.log(error));
});
  
/** dataInfo for 10 results */
function dataInfo (data) {
  for (let i = 0; i < data.length; i++) {
    if (i > 9) {
      break;
    } else {
      displayItems(data[i].title
                  ,data[i].artist.name
                  ,data[i].album.title
                  ,data[i].artist.picture
                  );
    }
  }
};

/** Display items  */
function displayItems (title, artist, album, img) {
  const items = document.querySelector('#items');
  items.innerHTML += `<div class="single-result row align-items-center my-3 p-3">
                      <div class="col-md-7">
                        <h3 class="lyrics-name">${title}</h3>
                        <p class="author lead">Artist: <span>${artist}</span></p>
                        <p class="author lead">Album by: <span>${album}</span></p>
                      </div>
                      <div class="col-md-2">
                        <img src="${img}" height="120" style="border-radius: 50%;" >
                      </div>
                      <div class="col-md-3 text-md-right text-center">
                        <button class="btn btn-success" onclick="lyrics('${artist}', '${title}')">Get Lyrics</button>
                      </div>
                    </div>
                    `;
};

/** Call API for lyrics information */
function lyrics (artist, title) {
  fetch(` ${'https://api.lyrics.ovh/v1/'}/${artist}/${title} `)
    .then((res) => res.json())
    .then((data) => {
      displayLyrics(artist, title, data.lyrics);
    });
};

/** Display Lyrics */
function displayLyrics (artist, title, lyrics) {
  const lyricsData = document.querySelector('#lyrics-data');
  lyricsData.innerHTML = `<h1 class="text-success col-mb-4">${title}</h1>
                          <h3 class="text-success col-mb-4">${artist}</h3>
                          <pre class="lyric text-white">${lyrics}</pre>
                          `;
};
