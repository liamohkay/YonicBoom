import React from 'react';
import internal from 'stream';
import { api } from "~/utils/api";

type props = {

}


const ArtistCard: React.FC = (props) => {
  const { artist } = props;

  return (
    <div className="max-w-m rounded overflow-hidden shadow-lg">
      {artist.artist}
    </div>
  )
}

export default ArtistCard;