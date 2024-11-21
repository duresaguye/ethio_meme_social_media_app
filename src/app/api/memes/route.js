import { NextResponse } from 'next/server';

export async function GET() {
  const memes = [
    {
      id: 1,
      title: 'Relatable Meme 1',
      imageUrl: '/tyson.jpeg',
      tags: ['Funny', 'Relatable'],
      likes: 10,
    },
    {
      id: 2,
      title: 'poltics Meme',
      imageUrl: '/images/meme2.jpg',
      tags: ['Animals'],
      likes: 5,
    },
     {
      id: 3,
      title: ' Meme 1',
      imageUrl: '/images/meme1.jpg',
      tags: ['Funny', 'Relatable'],
      likes: 10,
    },
    {
      id: 4,
      title: 'tech Meme',
      imageUrl: '/images/meme2.jpg',
      tags: ['Animals'],
      likes: 5,
    },
  ];

  return NextResponse.json(memes);
}
