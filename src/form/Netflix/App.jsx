import React, { useEffect, useState } from 'react'
// import axios from 'axios';
// import movieTrailer from 'movie-trailer';
// import YouTube from "react-youtube";

// function App() {
//   const [movies, setMovies] = useState([])
//   const [moviefliter, setMoviefliter] = useState([])
//   const [genres, setGenreList] = useState([])
//   const [selectedGenre, setSelectedGenre] = useState("");
//   const [showModal, setShowModal] = useState(false);

//   const opts = {
//     height: "390",
//     width: "640",
//     playerVars: {
//       autoplay: 1,
//     },
//   };

//   const url = 'https://image.tmdb.org/t/p/original'


//   useEffect(() => {
//     async function data() {
//       const result = await axios.get("https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=3fd23a7ac5678fbe2e498662b7e46701")
//       console.log(result.data)
//       setMovies(result.data.results)
//       console.log(await movieTrailer("the nun"));
//     }
//     data();

//     async function getGeneratelist() {
//       const result2 = await axios.get("https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=3fd23a7ac5678fbe2e498662b7e46701");
//       console.log(result2.data.genres);
//       setGenreList(result2.data.genres);
//     }
//     getGeneratelist();



//   }, []);




//   function filterByGenre(e, id) {
//     e.preventDefault();
//     if (id === "ALL") setMoviefliter([]);


//     else {
//       setMoviefliter(null);
//       setMoviefliter(
//         movies.filter((movie) => {
//           return movie.genre_ids.includes(id);
//         })
//       );

//       setSelectedGenre(
//         genres.find((genre) => {
//           return genre.id === id;
//         }).name
//       );
//     }
//   }


//   async function watchTrailer(e, title) {
//     e.preventDefault();
//     const trailerURL = await movieTrailer(title);
//     if (trailerURL) setShowModal(trailerURL.split("?v=")[1]);
//   }

//   return (
//     <>
//      {showModal ? (
//         <div className="modal">
//           <div className="iframe-wrapper">
//             <CloseIcon className="close-modal" onClick={() => setShowModal(false)}/>
//             {<YouTube videoId={showModal} opts={opts} />}
//           </div>
//         </div>
//       ) : (
//         ""
//       )}
//       <div className='main' >
//         <div className="sidebar">
//           <h3>Genres</h3>
//           <ul>
//             <li>
//               <a href="" onClick={(e)=> filterByGenre(e,"ALL")}>All</a>
//             </li>
//             {genres.map((genre, index) => {
//                 return <li key={index}>
//                   <a href={"/genre/" + genre.id}
//                    onClick={(e) => filterByGenre(e, genre.id)} >{genre.name} </a>

//                 </li>
//               })
//             }
//           </ul>
//         </div>

//         {moviefliter && moviefliter.length > 0 ? (
//           <div className="moviee">
//             <h3> Genre : {selectedGenre}</h3>
//             <div className="movie-wrapper">
//               {moviefliter.map((movie, index) => {
//                 return (
//                   <div className='show' key={index}>
//                     <img src={url + movie.poster_path} alt="" />
//                     <h3>{movie.title}</h3>
//                     <p>{movie.list}</p>
//                   </div>
//                 )
//               })}
//             </div>


//           </div>

//         ) : moviefliter !== null && moviefliter === 0 ? (
//           <div className="movies">
//             <h3>No Movie for this genre</h3>
//           </div>
//         ) : movies.length > 0 ? (
//           <div className="moviee">
//              {/* <YouTube
//                videoId="i3F4zEOfYWA"
//                opts={opts}
//           /> */}
//             <div className="movie-wrapper">
//               {moviefliter.map((movie, index) => {
//                 return (
//                   <div className='show' key={index}>
//                     <img src={url + movie.poster_path} alt="" />
//                     <a className="trailer-link" href="" onClick={(e) => watchTrailer(e, movie.title)}>
//                       Watch Trailer
//                     </a>
//                     <h3>{movie.title}</h3>
//                     <p>{movie.list}</p>
//                   </div>
//                 )
//               })}
//             </div>
//           </div>
//         ) : ("")}
//       </div>
//     </>
//   )
// }

// export default App

import axios from "axios";
import movieTrailer from "movie-trailer";
import YouTube from "react-youtube";
import CloseIcon from '@mui/icons-material/Close';

function App() {
  const [movies, setMovies] = useState([]);
  const [moviefilter, setmoviefilter] = useState(null);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const img_base_path = "https://image.tmdb.org/t/p/original";
  const [showModal, setShowModal] = useState(false);

  const opts = {
    height: "380",
    width: "650",
    playerVars: {
      autoplay: 1,
    },
  };

  useEffect(() => {
    async function fetchData() {
      const response1 = await axios.get(
        "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=8125db8f67d23da1d30f6063b1b794b8"
      );
      setMovies(response1.data.results);
      console.log(await movieTrailer(""));
    }
    fetchData();

    async function getGenreList() {
      const response2 = await axios.get(
        "https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=8125db8f67d23da1d30f6063b1b794b8"
      );
      setGenres(response2.data.genres);
    }
    getGenreList();

  }, []);


  function filterByGenre(e, id) {
    e.preventDefault();
    if (id === "ALL") setmoviefilter(null);
    else {
      setmoviefilter(null);
      setmoviefilter(
        movies.filter((movie) => {
          return movie.genre_ids.includes(id);
        })
      );
      setSelectedGenre(
        genres.find((genre) => {
          return genre.id === id;
        }).name
      );
    }
  }

  async function watchTrailer(e, title) {
    e.preventDefault();
    const trailerURL = await movieTrailer(title);
    if (trailerURL) setShowModal(trailerURL.split("?v=")[1]);
  }

  return (
    <>
      {showModal ? (
        <div className="modal">
          <div className="iframe-wrapper">
            <CloseIcon className="close-modal" onClick={() => setShowModal(false)}/>
            {<YouTube videoId={showModal} opts={opts} />}
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="netflix">
        <div className="sidebar">
          <div className="logo">
            <img src="https://i.pcmag.com/imagery/reviews/05cItXL96l4LE9n02WfDR0h-5.fit_scale.size_760x427.v1582751026.png" alt="Logo Netflix" />
          </div>
          <ul>
            <li>
              <a href="" onClick={(e) => filterByGenre(e, "ALL")}>
                ALL
              </a>
            </li>
            {genres.map((genre, index) => {
              return (
                <li key={index}>
                  <a
                    href={"/genre/" + genre.id}
                    onClick={(e) => filterByGenre(e, genre.id)}
                  >
                    {genre.name}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {moviefilter && moviefilter.length > 0 ? (
          <div className="movies">
            <h3>Genre: {selectedGenre}</h3>
            <div className="movie-wrapper">
              {moviefilter.map((movie, index) => {
                return (
                  <div className="movie" key={index}>
                    <img
                      src={img_base_path + movie.poster_path}
                      alt={movie.title || movie.original_title}
                    />
                    <h3>{movie.title || movie.original_title}</h3>
                  </div>
                );
              })}
            </div>
          </div>
        ) : moviefilter !== null && moviefilter.length === 0 ? (
          <div className="movies">
            <h3>No Movie for this genre</h3>
          </div>
        ) : movies.length > 0 ? (
          <div className="movies">
            <div className="movie-wrapper">
              {movies.map((movie, index) => {
                return (
                  <div className="movie" key={index}>
                    <img
                      src={img_base_path + movie.poster_path}
                      alt={movie.title || movie.original_title}
                    />
                   <button onClick={(e) => watchTrailer(e, movie.title)}> <a className="trailer-link" href="" >
                    </a>Watch Trailer</button>
                    <h3>{movie.title || movie.original_title}</h3>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default App;



