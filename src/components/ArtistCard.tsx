import React from 'react';
import internal from 'stream';
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
interface ArtistCardProps {
  key: number;
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
