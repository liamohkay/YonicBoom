import React, { useState, useEffect } from 'react';
import ArtistCard from '~/components/ArtistCard';
import { api } from "~/utils/api";
import { RouterOutputs } from '~/utils/api';

type Artist = RouterOutputs['getAll'][number];

const SearchPage = () => {
  const allArtists = api.getAll.useQuery().data;
  const [searchText, setSearchText] = useState('');
  const [filteredArtists, setFilteredArtists] = useState(allArtists);

  useEffect(() => {
    if (!allArtists) return;
    setFilteredArtists(allArtists);
  }, [allArtists])
  
  // Filter based on user input
  useEffect(() => {
    if (allArtists && searchText === '') {
      setFilteredArtists(allArtists)
    } else {
      let newFiltered = allArtists?.filter((artist: Artist) => {
        return artist.artist.toLowerCase().includes(searchText.toLowerCase());
      });
      setFilteredArtists(newFiltered);
    } 
  }, [searchText])

  return (
    <>
      <div>
        <input 
          type="text" 
          placeholder="Search for an artist"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
          onChange={(e) => setSearchText(e.target.value)}>
        </input>
      </div>
      <div className="flex flex-col">
        {filteredArtists?.map((artist: Artist) => (
          <ArtistCard key={artist.id} artist={artist} />
        ))}
      </div>
    </>
  );
}

export default SearchPage;