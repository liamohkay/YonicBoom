import React from 'react';
import internal from 'stream';
import { api } from "~/utils/api";

interface Artist {
  id: Number;
  artist: String;
  genre: String;
  pronoun: String;
  artistUrl: String;
  songUrl: String;
  createdAt: Date;
  createdBy: String;
}

const ArtistCard = (artist: Artist) => {

  return (
    <>
    </>
  )
}

export default ArtistCard;