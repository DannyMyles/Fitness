'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, Instagram, Facebook, Twitter } from 'lucide-react';

const galleryImages = [
  { id: 1, src: '/images/004.JPG', category: 'Training', title: 'Personal Training Session' },
  { id: 2, src: '/images/005.JPG', category: 'Workout', title: 'HIIT Class' },
  { id: 3, src: '/images/006.JPG', category: 'Gym', title: 'Strength Training' },
  { id: 4, src: '/images/007.JPG', category: 'Results', title: 'Client Transformation' },
  { id: 5, src: '/images/008.JPG', category: 'Training', title: 'Cardio Session' },
  { id: 6, src: '/images/026.JPG', category: 'Online', title: 'Virtual Training' },
  { id: 7, src: '/images/004.JPG', category: 'Nutrition', title: 'Meal Planning' },
  { id: 8, src: '/images/023.JPG', category: 'Events', title: 'Fitness Workshop' },
  { id: 9, src: '/images/018.JPG', category: 'Workout', title: 'Group Fitness' },
  { id: 10, src: '/images/004.JPG', category: 'Training', title: 'Stretching Session' },
  { id: 11, src: '/images/027.JPG', category: 'Gym', title: 'Equipment Training' },
  { id: 12, src: '/images/014.jpg', category: 'Results', title: 'Before & After' },
];

const categories = ['All', 'Training', 'Workout', 'Gym', 'Results', 'Events', 'Nutrition', 'Online'];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);

  const filteredImages = activeCategory === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  return (
    <div className="pt-8">
      {/* Hero Section */}
      <section className="relative py-28 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{
            backgroundImage: "url('/images/005.JPG')"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-fitness-dark/90 to-fitness-primary/70"></div>
        </div>
        
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Photo <span className="text-fitness-accent">Gallery</span>
            </h1>
            <p className="text-xl text-gray-200 leading-relaxed">
              Explore moments from training sessions, client transformations, fitness events, and more.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  activeCategory === category
                    ? 'bg-fitness-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-fitness-primary/10 hover:text-fitness-primary'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Images Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image) => (
              <div 
                key={image.id}
                className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-fitness-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white text-sm font-medium mb-1">{image.category}</p>
                    <h3 className="text-white font-semibold">{image.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Follow My Journey
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Stay updated with daily fitness tips, workout videos, and client transformations on social media.
          </p>
          <div className="flex justify-center gap-6">
            <a href="#" className="p-4 bg-gradient-to-br from-fitness-primary to-fitness-primaryDark from-[#BE2D6B] to-[#771440] text-white rounded-xl hover:shadow-fitness-lg transition-all hover:-translate-y-1">
              <Instagram size={28} />
            </a>
            <a href="#" className="p-4 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-xl hover:shadow-fitness-lg transition-all hover:-translate-y-1">
              <Facebook size={28} />
            </a>
            <a href="#" className="p-4 bg-gradient-to-br from-blue-400 to-blue-500 text-white rounded-xl hover:shadow-fitness-lg transition-all hover:-translate-y-1">
              <Twitter size={28} />
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-4 right-4 p-2 text-white hover:text-fitness-accent transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X size={32} />
          </button>
          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage.src}
              alt={selectedImage.title}
              className="w-full h-auto rounded-xl"
            />
            <div className="mt-4 text-white text-center">
              <p className="text-sm text-fitness-accent">{selectedImage.category}</p>
              <h3 className="text-xl font-semibold">{selectedImage.title}</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

