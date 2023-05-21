import React from 'react';
import { RouterOutputs } from '~/utils/api';

type Artist = RouterOutputs['getAll'][number]; 
interface ArtistCardProps {
  artist: Artist;
}

const ArtistCard: React.FC<ArtistCardProps> = ({ artist }): JSX.Element => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <div className="px-6 py-4">
        <p>{artist.artist}</p>
        <p>{artist.pronoun}</p>
        <p>{artist.genre}</p>
      </div>
    </div>
  )
}

export default ArtistCard;
