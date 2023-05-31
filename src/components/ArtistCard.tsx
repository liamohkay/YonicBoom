import React from 'react';
import { RouterOutputs } from '~/utils/api';
import Image from 'next/image';

type Artist = RouterOutputs['getArtists'][number]; 
interface ArtistCardProps {
  artist: Artist,
  color: string
}

const colors =  {
  'left field': 'text-[#99ADFF]',
  'acid': 'text-[#F08080]',
  'expirimental': 'text-[#A8FF33]',
  'bass': 'text-[#3386FF]',
  'pop': 'text-[#FF33DD]', 
  'uk funky': 'text-[#BF15E9]',
  'garage': 'text-[#00C85E]',
  'footwerk': 'text-[#FFD134]',
  'electro': 'text-[#34FF8D]',
  'dancehall': 'text-[#FF34A6]',
  'ambient': 'text-[#90FFFD]',
  'jungle': 'text-[#3232FF]',
  'drum and bass': 'text-[#5132FF]',
  'tech house': 'text-[#FFA832]',
  'jazz': 'text-[#2325AD]',
  'disco': 'text-[#C146F6]',
  'dubstep': 'text-[#E6F646]',
  'dub': 'text-[#C3F646]',
  'techno': 'text-[#000000]', 
  'gqom': 'text-[#',
  ']nu wave': 'text-[#00FFF3]',
  'rap': 'text-[#E892FF]',
  'hip hop': 'text-[#AA64BD]',
  'donk': 'text-[#E540DD]',
  'jersey club': 'text-[#F9FF2A]',
  'house': 'text-[#2A2DFF]',
}

const ArtistCard: React.FC<ArtistCardProps> = ({ artist }): JSX.Element => {
  const style = colors[artist.genre];
  return (
    <div className="w-1/5 min-w-[25rem] rounded shadow-lg bg-white">
      <div className="flex px-6 py-4">
        <Image src='/no-pic.png' alt="noPicture" width="75" height="75" />
        <div className="flex flex-col px-5">
          <div>
            <span className="font-bold text-l">{artist.artist}</span><span className="text-slate-400">{` (${artist.pronoun})`}</span>
          </div>
          <span className={style}>{artist.genre}</span>
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
