import React from 'react';
import { RouterOutputs } from '~/utils/api';
import Image from 'next/image';
import { colors } from '~/utils/genres';

type Artist = RouterOutputs['getArtists'][number]; 
interface ArtistCardProps {
  artist: Artist;
}
interface IDictionary<TValue> {
  [id: string]: TValue;
}

const ArtistCard: React.FC<ArtistCardProps> = ({ artist }): JSX.Element => {
  let genreColor = `text-[${colors[artist.genre as keyof ObjectType]}]`;
  return (
    <div className="w-1/5 min-w-[25rem] rounded shadow-lg bg-white">
      <div className="flex px-6 py-4">
        <Image src='/no-pic.png' alt="noPicture" width="75" height="75" />
        <div className="flex flex-col px-5">
          <div>
            <span className="font-bold text-l">{artist.artist}</span><span className="font-italic">{` (${artist.pronoun})`}</span>
          </div>
          <span className={genreColor}>{artist.genre}</span>
        </div>
        <a href={artist.artistUrl}>
          <Image src={artist.artistUrl.includes('bandcamp') ? "/bc.png" : "/sc.png" } alt="artistProfile" width="25" height="25" />
        </a>
      </div>
    </div>
  )
}

export default ArtistCard;
