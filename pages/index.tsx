import type { GetServerSideProps } from "next";
import Head from "next/head";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ImageSlider from "../components/ImageSlider";
import Row from "../components/Row";
import { Movie } from "../typings";
import requests from "../utils/requests";
import type { RootState } from "../app/store";
import { useSelector } from "react-redux";
import Modal from "../components/Modal";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserMoviesList } from "../features/userMoviesList/userMoviesListSlice";

interface Props {
  netflixOriginals: Movie[];
  trendingNow: Movie[];
  topRated: Movie[];
  actionMovies: Movie[];
  comedyMovies: Movie[];
  horrorMovies: Movie[];
  romanceMovies: Movie[];
  documentaries: Movie[];
}

const Home = ({
  netflixOriginals,
  trendingNow,
  topRated,
  actionMovies,
  comedyMovies,
  horrorMovies,
  romanceMovies,
  documentaries,
}: Props) => {
  const isLoggedIn = useSelector(
    (state: RootState) => state.loginStatus.value.isLoggedIn
  );
  const userId = useSelector(
    (state: RootState) => state.loginStatus.value.userId
  );
  const showModal = useSelector((state: RootState) => state.showModal.value);
  const userMoviesList = useSelector(
    (state: RootState) => state.userMoviesList.value
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      const fetchUserMovies = async () => {
        await fetch("api/readUserMovie", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        })
          .then((res) => res.json())
          .then((data) => dispatch(setUserMoviesList(data.movies)));
      };
      fetchUserMovies();
    }
  }, [isLoggedIn]);

  return (
    <div>
      <Head>
        <title>Home - Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        <ImageSlider slides={topRated} />
        <section className="pl-4 mb-14">
          <Row title="Trending Now" movies={trendingNow} id="trending-movies" />
          <Row title="Top Rated" movies={topRated} id="top-rated-movies" />
          <Row
            title="Action Thrillers"
            movies={actionMovies}
            id="action-movies"
          />
          {/* My List Component*/}
          {isLoggedIn && userMoviesList && (
            <Row title="My List" movies={userMoviesList} id="my-list-movies" />
          )}
          <Row title="Comedies" movies={comedyMovies} id="comedies-movies" />
          <Row title="Scary Movies" movies={horrorMovies} id="scary-movies" />
          <Row
            title="Romance Movies"
            movies={romanceMovies}
            id="romance-movies"
          />
          <Row
            title="Documentaries"
            movies={documentaries}
            id="documentary-movies"
          />
        </section>
        {/* Modal */}
        {showModal && <Modal />}
      </main>
      <Footer />
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),
  ]);

  return {
    props: {
      netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results,
    },
  };
};
