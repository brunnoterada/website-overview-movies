const APIURL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=f377a4054d76342b9d1e671bf02712af";
const PESQUISAURL =
  "https://api.themoviedb.org/3/search/movie?&api_key=f377a4054d76342b9d1e671bf02712af&query=";

const IMGPATH = "https://image.tmdb.org/t/p/w1280";

const main = document.getElementById("main");
const form = document.getElementById("form");
const pesquisar = document.getElementById("pesquisar");

pegaFilmes(APIURL);

async function pegaFilmes(url) {
  const resp = await fetch(url);
  const respData = await resp.json();

  /*   respData.results.forEach((movie) => {
    //está const cria um elemento img e armazena na variavel img
    const img = document.createElement("img");
    //pega a variavel img e passa os parametros para ela
    img.src = IMGPATH + movie.poster_path;

    document.body.appendChild(img);
  }); */

  mostrarFilmes(respData.results);
}
function mostrarFilmes(movies) {
  main.innerHTML = "";
  movies.forEach((movie) => {
    const movieEl = document.createElement("div");
    movieEl.classList.add("filme");

    movieEl.innerHTML = `
        
            <img
            src="${IMGPATH + movie.poster_path}"
            alt="${movie.title}"
            />
            <div class="filme-info">
            <h3>${movie.title}</h3>
            <span class="${ClassDeAcordoComOVoto(movie.vote_average)}">${
      movie.vote_average
    }</span>
            </div>
            <div class="detalhes">
            <h4>Detalhes</h4>
            ${movie.overview}
            </div>
            
        `;
    main.appendChild(movieEl);
  });
}

function ClassDeAcordoComOVoto(vote) {
  if (vote >= 8) {
    return "verde";
  } else if (vote >= 5) {
    return "laranja";
  } else {
    return "vermelho";
  }
}
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = pesquisar.value;
  if (searchTerm) {
    pegaFilmes(PESQUISAURL + searchTerm);
    pesquisar.value = "";
  }
});
