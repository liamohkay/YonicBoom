import React, { useState, useEffect } from 'react';
import ArtistCard from '~/components/ArtistCard';
import { api } from "~/utils/api";
import { RouterOutputs } from '~/utils/api';

type Artist = RouterOutputs['getAll'][number];

const SearchPage = () => {
  const allArtists = api.getAll.useQuery().data;
  const [filteredArtists, setFilteredArtists] = useState(allArtists);

  useEffect(() => {
    if (!allArtists) return;
    setFilteredArtists(allArtists);
  }, [allArtists])
  
  return (
    <div className="flex flex-col">
      {filteredArtists?.map((artist: Artist) => (
        <ArtistCard key={artist.id} artist={artist} />
      ))}
    </div>
  );
}

export default SearchPage;