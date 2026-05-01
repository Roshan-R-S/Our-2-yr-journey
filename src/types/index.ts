export interface StoryEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  image?: string;
  location?: string;
}

export interface Reason {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

export interface GalleryItem {
  id: string;
  url: string;
  caption: string;
  type: 'image' | 'video';
}

export interface MemoryPoint {
  id: string;
  lat: number;
  lng: number;
  title: string;
  description: string;
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  cover: string;
  description: string;
}

export interface Dream {
  id: string;
  flower: string;
  description: string;
  color: string;
}
