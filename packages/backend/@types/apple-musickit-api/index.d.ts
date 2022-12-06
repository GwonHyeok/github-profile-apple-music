interface MusicKitCredential {
  key: string;
  teamId: string;
  keyId: string;
}

interface MusicKitResponse<T> {
  status: number;
  body: T;
}

interface PaginatedResourceCollectionResponse {
  next: string;
  data: Resource[];
}

interface Resource {
  id: string;
  type: string;
  href?: string;
  attributes: ResourceAttributesSong;
}

interface ResourceAttributesSong {
  albumName: string;
  genreNames: string[];
  trackNumber: number;
  durationInMillis: number;
  releaseDate: string;
  isrc: string;
  artwork: ResourceArtwork;
  composerName: string;
  artistName: string;
  url: string;
  playParams: ResourcePlayParams;
  discNumber: number;
  isAppleDigitalMaster: boolean;
  hasLyrics: boolean;
  name: string;
  previews: ResourcePreview[];
}

interface ResourceArtwork {
  width: number;
  height: number;
  url: string;
  bgColor: string;
  textColor1: string;
  textColor2: string;
  textColor3: string;
  textColor4: string;
}

interface ResourcePlayParams {
  id: string;
  kind: string;
}

interface ResourcePreview {
  url: string;
}

declare module "node-musickit-api" {
  class MusicKit {}

  interface MusicKitConstructor {
    new (credentials: MusicKitCredential): MusicKit;
  }

  let k: MusicKitConstructor;
  export = k;
}
declare module "node-musickit-api/personalized" {
  class MusicKit {
    async getLibrary(limit: number = 1, offset: number = 0): Promise<void>;

    async getRecentlyPlayed(
      limit: number = 1,
      offset: number = 0,
      type?: string,
    ): Promise<MusicKitResponse<PaginatedResourceCollectionResponse>>;
  }

  interface MusicKitConstructor {
    new (credentials: PersonalizedMusicKitCredential): MusicKit;
  }

  interface PersonalizedMusicKitCredential extends MusicKitCredential {
    userToken: string;
  }

  let k: MusicKitConstructor;
  export = k;
}
