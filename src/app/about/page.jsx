"use client";
import React from 'react';
import Navbar from '../components/Navbar';

const About = () => {
  return (
    <section className="py-20 bg-gray-100">
        <Navbar />

        
      <div className="container mx-auto text-center px-4 mt-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">About Ethiomemes</h1>
        <p className="text-xl text-gray-700 mb-6">
          Welcome to <strong className="text-green-600">Ethiomemes</strong>, the ultimate platform for sharing, discovering, and celebrating Ethiopian memes! Our goal is to bring a unique touch of humor to your daily life, with memes that reflect Ethiopian culture, lifestyle, and the things that make us laugh.
        </p>
        <p className="text-xl text-gray-700 mb-6">
          At Ethiomemes, we believe that laughter connects people, and we want to create a community where everyone can join in on the fun. Whether you're here to scroll through hilarious memes, share your own creations, or just enjoy a good laugh, you've come to the right place.
        </p>
        <p className="text-xl text-gray-700 mb-6">
          Our platform is built with you in mind, offering an easy-to-use interface, personalized content, and a vibrant community of meme lovers from all over Ethiopia. So sit back, relax, and enjoy the latest, funniest, and most relatable memes that speak to our shared experiences.
        </p>
        <p className="text-xl text-gray-700 mb-6">
          Join us today, and become part of the <strong className="text-green-600">Ethiomemes</strong> family. Your memes, your community, your humor—Ethiomemes is where it all comes together.
        </p>
      </div>
    </section>
  );
};

export default About;
