import Head from "next/head";
import { type NextPage } from "next";
import React, { useState, useEffect } from 'react';
import ArtistCard from '~/components/ArtistCard';
import { api } from "~/utils/api";
import { RouterOutputs } from '~/utils/api';
import { genres } from '~/utils/genres';
import Loading from '~/components/Loading';

type Artist = RouterOutputs['getArtists'][number];

const Home: NextPage = () => {
  const allArtists = api.getArtists.useQuery().data;
  const [searchText, setSearchText] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All Genres');
  const [filteredArtists, setFilteredArtists] = useState(allArtists);

  useEffect(() => {
    if (!allArtists) return;
    setFilteredArtists(allArtists);
  }, [allArtists])

  // Filter based on genre or artist name
  useEffect(() => {
    if (selectedGenre === 'All Genres' && searchText === '') {
      setFilteredArtists(allArtists); 
    } else {
      const newFiltered = allArtists?.filter((artist: Artist) => {
        if (selectedGenre === 'All Genres') {
          return artist.artist.toLowerCase().includes(searchText.toLowerCase());
        } else if (searchText === '') {
          return artist.genre === selectedGenre;
        } else {
          return artist.genre === selectedGenre && artist.artist.toLowerCase().includes(searchText.toLowerCase());
        }
      })
      setFilteredArtists(newFiltered)
    }
  }, [searchText, selectedGenre])

  const getRandomArtist = () => {
    if (!allArtists) return;
    const artist = allArtists[Math.floor(Math.random() * allArtists.length)];
    if (artist) {
      setSearchText(artist.artist ?? '');
    }
  }

  return ( 
    <>
      <Head>
        <title>YonicBoom</title>
        <meta name="description" content="women, nonbinary, and trans artists in dance" /> 
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col min-h-screen items-center bg-[#FFEFE7] gap-12 px-2 py-10">
        <div className="flex w-8/12 gap-5 align-top">
          <input 
            type="text" 
            placeholder="Search for an artist"
            className="appearance-none bg-transparent border-0 border-b-2 border-gray-700 w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none focus:border-gray-400" 
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}>
          </input>
          <label htmlFor="underline_select" className="sr-only">Underline select</label>
          <select 
            value={selectedGenre} 
            onChange={(e) => setSelectedGenre(e.target.value)} 
            id="underline_select" 
            placeholder="Filter Genre" 
            className="block py-2.5 px-0 w-full text-sm text-gray-700 bg-transparent border-0 border-b-2 border-gray-700 appearance-none focus:outline-none focus:ring-0 focus:border-gray-400 peer">
              <option value="All Genres">All Genres</option>
              { genres.map(genre => <option key={genre} value={genre}>{genre}</option>)}
          </select>
          <button onClick={getRandomArtist} className="whitespace-nowrap text-black font-medium outline rounded-lg text-sm px-5 text-center mr-2 hover:outline-dashed">
            Random Artist!
          </button>
        </div>
        <div className="flex flex-wrap w-full md:w-auto gap-5 justify-center relative">
          
          { !allArtists ? 
          (<Loading /> ) :
          (filteredArtists?.map((artist: Artist) => <ArtistCard key={artist.id} artist={artist} />))
          }
        </div>
      </main> 
    </>
  );
};

export default Home;