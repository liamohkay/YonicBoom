import React, { useState, useEffect } from 'react';
import ArtistCard from '~/components/ArtistCard';
import { api } from "~/utils/api";

interface Artist {
  id: number;
  artist: string;
  genre: string;
  pronoun: string;
  artistUrl: string;
  songUrl: string;
  createdAt: Date;
  createdBy: string;
}

const Search = () => {
  const allArtists = api.getAll.useQuery().data;
  const [filteredArtists, setFilteredArtists] = useState(allArtists);

  useEffect(() => {
    if (!allArtists) return;
    setFilteredArtists(allArtists);
  }, [allArtists])
  
  return (
    <>
      {allArtists?.map((artist: Artist) => <ArtistCard key={artist.id} artist={artist} />)}
    </>
  );
}

export default Search;