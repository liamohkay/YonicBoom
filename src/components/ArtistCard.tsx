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
        <span>{artist.artist}</span>
      </div>
    </div>
  )
}

export default ArtistCard;
