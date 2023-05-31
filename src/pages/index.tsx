import Head from "next/head";
import { type NextPage } from "next";
import React, { useState, useEffect } from 'react';
import ArtistCard from '~/components/ArtistCard';
import { api } from "~/utils/api";
import { RouterOutputs } from '~/utils/api';
import { genres } from '~/utils/genres';

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

  return ( 
    <>
      
      <Head>
        <title>YonicBoom</title>
        <meta name="description" content="women, nonbinary, and trans artists in dance" /> 
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col min-h-screen items-center bg-[#FFEFE7] gap-12 px-5 py-10">
        <div className="flex w-8/12 gap-5 align-top">
          <input 
            type="text" 
            placeholder="Search for an artist"
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" 
            onChange={(e) => setSearchText(e.target.value)}>
          </input>
          <label htmlFor="underline_select" className="sr-only">Underline select</label>
          <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)} id="underline_select" placeholder="Filter Genre" className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
              <option value="All Genres">All Genres</option>
              { genres.map(genre => <option key={genre} value={genre}>{genre}</option>)}
          </select>
        </div>
        <div className="flex flex-wrap w-full md:w-auto gap-5 justify-center relative">
          {filteredArtists?.map((artist: Artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      </main> 
    </>
  );
};

export default Home;