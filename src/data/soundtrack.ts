import { Song } from '../types';
import song1 from '../songs/1 - Pookal Pookum - Roop Kumar Rathod, Harini, Andrea Jeremiah, GV Prakash Kumar.mp3';
import song2 from '../songs/En Rojaa Neeye - Kushi (Tamil).mp3';
import song3 from '../songs/Kadhal Ennulle.mp3';
import song4 from '../songs/Maalai_Mangum_Neram-VmusiQ.Com.mp3';
import song5 from '../songs/Neethanae  - TamilMoon.mp3';
import song6 from '../songs/Yaanji_Yaanji-5StarMusiQ.Com.mp3';

export const soundtrackData: (Song & { src: string })[] = [
  {
    id: '1',
    title: 'Pookal Pookum',
    artist: 'Roop Kumar Rathod, Harini, Andrea Jeremiah',
    cover: 'https://picsum.photos/seed/sound1/400/400',
    description: 'The first song we ever shared, a bridge between two souls.',
    src: song1
  },
  {
    id: '2',
    title: 'En Rojaa Neeye',
    artist: 'Kushi (Tamil)',
    cover: 'https://picsum.photos/seed/sound2/400/400',
    description: 'Our anthem during that rainy afternoon in the city.',
    src: song2
  },
  {
    id: '3',
    title: 'Kadhal Ennulle',
    artist: 'Unknown',
    cover: 'https://picsum.photos/seed/sound3/400/400',
    description: 'The melody that reminds me of our summer road trip.',
    src: song3
  },
  {
    id: '4',
    title: 'Maalai Mangum Neram',
    artist: 'Unknown',
    cover: 'https://picsum.photos/seed/sound4/400/400',
    description: 'A song that fills every evening with warmth.',
    src: song4
  },
  {
    id: '5',
    title: 'Neethanae',
    artist: 'Unknown',
    cover: 'https://picsum.photos/seed/sound5/400/400',
    description: 'Every note reminds me it was always you.',
    src: song5
  },
  {
    id: '6',
    title: 'Yaanji Yaanji',
    artist: 'Unknown',
    cover: 'https://picsum.photos/seed/sound6/400/400',
    description: 'The song that plays in my heart on repeat.',
    src: song6
  }
];
