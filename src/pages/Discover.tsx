import React, { useState, useEffect } from 'react';
import ArtistCard from '~/components/ArtistCard';
import Loading from '~/components/Loading';
import { api } from "~/utils/api";
import { RouterOutputs } from '~/utils/api'
type Artist = RouterOutputs['getArtists'][number];

const Search: React.FC = (): JSX.Element => {
  const allArtists = api.getArtists.useQuery().data;
  const [searchText, setSearchText] = useState('');
  const [filteredArtists, setFilteredArtists] = useState(allArtists);

  useEffect(() => {
    if (!allArtists) return;
    setFilteredArtists(allArtists);
  }, [allArtists])
  
  // Filter artsits by name based on user input
  useEffect(() => {
    if (allArtists && searchText === '') {
      setFilteredArtists(allArtists)
    } else {
      const newFiltered = allArtists?.filter((artist: Artist) => {
        return artist.artist.toLowerCase().includes(searchText.toLowerCase());
      });
      setFilteredArtists(newFiltered);
    } 
  }, [searchText])

  return (
    <>
      <input 
        type="text" 
        placeholder="Search for an artist"
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
        onChange={(e) => setSearchText(e.target.value)}>
      </input>
      <div className="flex flex-wrap w-full md:w-auto gap-5 justify-center">
        {filteredArtists?.map((artist: Artist) => (
          <ArtistCard key={artist.id} artist={artist} />
        ))}
      </div>
    </>
  );
}

export default Search;