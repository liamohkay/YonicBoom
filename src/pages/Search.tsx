import React, { useState, useEffect } from 'react';
import ArtistCard from '~/components/ArtistCard';
import { api } from "~/utils/api";
import { RouterOutputs } from '~/utils/api';


type Artist = RouterOutputs['getAll'][number];

// interface Artist {
//   id: number;
//   artist: string;
//   genre: string;
//   pronoun: string;
//   artistUrl: string;
//   songUrl: string;
//   createdAt: Date;
//   createdBy: string;
// }

const Search = () => {
  const allArtists = api.getAll.useQuery().data;
  const [filteredArtists, setFilteredArtists] = useState(allArtists);

  useEffect(() => {
    if (!allArtists) return;
    setFilteredArtists(allArtists);
  }, [allArtists])
  
  return (
    <>
      {filteredArtists?.map((artist: Artist) => (
        <div key={artist.id}>
          <ArtistCard artist={artist} />
        </div>
      ))}
    </>
  );
}

export default Search;