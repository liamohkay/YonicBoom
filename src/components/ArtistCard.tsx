import React from 'react';
import { RouterOutputs } from '~/utils/api';
import Image from 'next/image';
import { colors } from '~/utils/genres';

type Artist = RouterOutputs['getArtists'][number]; 
interface ArtistCardProps {
  artist: Artist,
  color: string
}
interface IDictionary<TValue> {
  [id: string]: TValue;
}
const ArtistCard: React.FC<ArtistCardProps> = ({ artist, color }): JSX.Element => {
  return (
    <div className="w-1/5 min-w-[25rem] rounded shadow-lg bg-white">
      <div className="flex px-6 py-4">
        <Image src='/no-pic.png' alt="noPicture" width="75" height="75" />
        <div className="flex flex-col px-5">
          <div>
            <span className="font-bold text-l">{artist.artist}</span><span className="text-slate-400">{` (${artist.pronoun})`}</span>
          </div>
          <span className={color}>{artist.genre}</span>
        </div>
        <div className="flex-row"></div>
          <a href={artist.artistUrl}>
            <Image src={artist.artistUrl.includes('bandcamp') ? "/bc.png" : "/sc.png" } alt="artistProfile" width="25" height="25" />
          </a>
          {/* <Image src='/headphone-off.png' alt="headoff" width="50" height="25" /> */}
      </div>
    </div>
  )
}

export default ArtistCard;
