import React, { useState } from 'react';
import { RouterOutputs } from '~/utils/api';
import Image from 'next/image';
import ReactPlayer from 'react-player/lazy'

type Artist = RouterOutputs['getArtists'][number]; 
interface ArtistCardProps {
  artist: Artist
}

const colors =  {
  'left field': 'text-[#99ADFF]/50',
  'acid': 'text-[#F08080]/50',
  'expirimental': 'text-[#A8FF33]/50',
  'bass': 'text-[#3386FF]/50',
  'pop': 'text-[#FF33DD]/50', 
  'uk funky': 'text-[#BF15E9]/50',
  'garage': 'text-[#00C85E]/50',
  'footwerk': 'text-[#FFD134]/50',
  'electro': 'text-[#34FF8D]/50',
  'dancehall': 'text-[#FF34A6]/50',
  'ambient': 'text-[#90FFFD]/50',
  'jungle': 'text-[#3232FF]/50',
  'drum and bass': 'text-[#5132FF]/50',
  'tech house': 'text-[#FFA832]/50',
  'jazz': 'text-[#2325AD]/50',
  'disco': 'text-[#C146F6]/50',
  'dubstep': 'text-[#E6F646]/50',
  'dub': 'text-[#C3F646]/50',
  'techno': 'text-[#e31507]/50', 
  'gqom': 'text-[#',
  ']nu wave': 'text-[#00FFF3]/50',
  'rap': 'text-[#E892FF]/50',
  'hip hop': 'text-[#AA64BD]/50',
  'donk': 'text-[#E540DD]/50',
  'jersey club': 'text-[#F9FF2A]/50',
  'house': 'text-[#2A2DFF]/50',
}

const ArtistCard: React.FC<ArtistCardProps> = ({ artist }): JSX.Element => {
  const style = colors[artist.genre as keyof typeof colors];
  return (
    <div className="w-1/5 min-w-[25rem] rounded shadow-lg bg-white">
      <div className="flex px-6 py-4">
        <Image src='/no-pic.png' alt="noPicture" width="75" height="75" />
        <div className="flex flex-col px-5 mt-[-5]">
          <div>
            <span className="font-bold text-l">{artist.artist}</span><span className="text-slate-400">{` (${artist.pronoun})`}</span>
          </div>
          <span className={style}>{artist.genre}</span>
        </div>
      </div>
      <div className="flex flex-row-reverse gap-3 px-3 pb-2 -mt-8">
        <a href={artist.songUrl} target="_blank" className="border-orange-400">
          <Image 
            src="/waveform.svg"
            alt="artistProfile" 
            width="25" 
            height="25"
          />
        </a>
        <a href={artist.artistUrl} target="_blank">
          <Image 
            src={artist.artistUrl.includes('bandcamp') ? "/bc.svg" : "/sc.svg" } 
            alt="artistProfile" 
            width="25" 
            height="25"
          />
        </a>
      </div>
    </div>
  )
}

export default ArtistCard;
