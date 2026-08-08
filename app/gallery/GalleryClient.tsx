'use client';

import { useEffect, useState } from 'react';
import { X, Instagram, Facebook, Twitter, Loader2, AlertCircle, Image as ImageIcon, RefreshCw, Play, Youtube } from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import EmptyState from '@/components/ui/EmptyState';
import { galleryService, GalleryCategory, GalleryImage } from '@/app/api_services/galleryService';
import { youtubeService, YoutubeVideo } from '@/app/api_services/youtubeService';

const VIDEOS_PAGE_SIZE = 9;

export default function GalleryClient() {
  const [activeTab, setActiveTab] = useState<'photos' | 'videos'>('photos');

  const [categories, setCategories] = useState<GalleryCategory[]>([]);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const [videos, setVideos] = useState<YoutubeVideo[]>([]);
  const [videosLoading, setVideosLoading] = useState(true);
  const [videosError, setVideosError] = useState('');
  const [visibleVideoCount, setVisibleVideoCount] = useState(VIDEOS_PAGE_SIZE);
  const [selectedVideo, setSelectedVideo] = useState<YoutubeVideo | null>(null);

  const fetchGallery = () => {
    setIsLoading(true);
    setError('');
    Promise.all([galleryService.getCategories(), galleryService.getImages()])
      .then(([cats, imgs]) => {
        setCategories(cats);
        setImages(imgs);
      })
      .catch(() => setError('Could not load the gallery. Please try again shortly.'))
      .finally(() => setIsLoading(false));
  };

  const fetchVideos = () => {
    setVideosLoading(true);
    setVideosError('');
    youtubeService
      .getVideos()
      .then(setVideos)
      .catch(() => setVideosError('Could not load videos. Please try again shortly.'))
      .finally(() => setVideosLoading(false));
  };

  useEffect(() => {
    fetchGallery();
    fetchVideos();
  }, []);

  const categoryName = (categoryId: string) =>
    categories.find((c) => c.id === categoryId)?.name ?? '';

  const filteredImages =
    activeCategory === 'all' ? images : images.filter((img) => img.categoryId === activeCategory);

  const visibleVideos = videos.slice(0, visibleVideoCount);

  return (
    <div className="pt-0">
      {/* Hero Section */}
      <PageHero
        title="Photo & Video Gallery"
        subtitle="Explore moments from training sessions, client transformations, fitness events, and more."
      />

      {/* Photos / Videos toggle */}
      <div className="pt-16 flex justify-center">
        <div className="inline-flex bg-gray-100 rounded-full p-1.5">
          <button
            onClick={() => setActiveTab('photos')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-medium transition-all ${
              activeTab === 'photos' ? 'bg-white text-fitness-primary shadow-sm' : 'text-gray-600 hover:text-fitness-primary'
            }`}
          >
            <ImageIcon size={18} />
            Photos
          </button>
          <button
            onClick={() => setActiveTab('videos')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-medium transition-all ${
              activeTab === 'videos' ? 'bg-white text-fitness-primary shadow-sm' : 'text-gray-600 hover:text-fitness-primary'
            }`}
          >
            <Youtube size={18} />
            Videos
          </button>
        </div>
      </div>

      {activeTab === 'photos' ? (
      <>
      {/* Gallery Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 size={32} className="animate-spin text-gray-300" />
            </div>
          ) : error ? (
            <EmptyState
              icon={AlertCircle}
              title="Couldn't load the gallery"
              description={error}
              action={{ label: 'Try Again', icon: RefreshCw, onClick: fetchGallery }}
            />
          ) : images.length === 0 ? (
            <EmptyState
              icon={ImageIcon}
              title="No photos yet"
              description="Check back soon — new photos from training sessions and events are added regularly."
            />
          ) : (
            <>
              {/* Category Filter */}
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <button
                  onClick={() => setActiveCategory('all')}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    activeCategory === 'all'
                      ? 'bg-fitness-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-fitness-primary/10 hover:text-fitness-primary'
                  }`}
                >
                  All
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-6 py-2 rounded-full font-medium transition-all ${
                      activeCategory === category.id
                        ? 'bg-fitness-primary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-fitness-primary/10 hover:text-fitness-primary'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>

              {/* Images Grid */}
              {filteredImages.length === 0 ? (
                <EmptyState
                  icon={ImageIcon}
                  title="No photos in this category yet"
                  description="Try a different category, or check back soon."
                  action={{ label: 'Show All Photos', onClick: () => setActiveCategory('all') }}
                />
              ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredImages.map((image) => (
                  <div
                    key={image.id}
                    className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer"
                    onClick={() => setSelectedImage(image)}
                  >
                    <img
                      src={galleryService.getImageUrl(image)}
                      alt={image.title || categoryName(image.categoryId)}
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-fitness-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4">
                        <p className="text-white text-sm font-medium mb-1">{categoryName(image.categoryId)}</p>
                        {image.title && <h3 className="text-white font-semibold">{image.title}</h3>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              )}
            </>
          )}
        </div>
      </section>
      </>
      ) : (
      <>
      {/* Videos Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {videosLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 size={32} className="animate-spin text-gray-300" />
            </div>
          ) : videosError ? (
            <EmptyState
              icon={AlertCircle}
              title="Couldn't load videos"
              description={videosError}
              action={{ label: 'Try Again', icon: RefreshCw, onClick: fetchVideos }}
            />
          ) : videos.length === 0 ? (
            <EmptyState
              icon={Youtube}
              title="No videos yet"
              description="Check back soon — videos from the channel will show up here."
            />
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {visibleVideos.map((video) => (
                  <div
                    key={video.id}
                    className="group relative aspect-video rounded-xl overflow-hidden cursor-pointer bg-gray-100"
                    onClick={() => setSelectedVideo(video)}
                  >
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-fitness-dark/80 via-fitness-dark/10 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-white transition-all shadow-lg">
                        <Play size={22} className="text-fitness-primary ml-1" fill="currentColor" />
                      </div>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="text-white font-semibold text-sm line-clamp-2">{video.title}</h3>
                      <p className="text-white/70 text-xs mt-1">{youtubeService.formatDate(video.publishedAt)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {visibleVideoCount < videos.length && (
                <div className="flex justify-center mt-10">
                  <button
                    onClick={() => setVisibleVideoCount((n) => n + VIDEOS_PAGE_SIZE)}
                    className="px-8 py-3 rounded-full font-medium bg-gray-100 text-gray-700 hover:bg-fitness-primary/10 hover:text-fitness-primary transition-all"
                  >
                    Load More Videos
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
      </>
      )}

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
            <a href="#" className="p-4 bg-gradient-to-br from-[#BE2D6B] to-[#771440] text-white rounded-xl hover:shadow-fitness-lg transition-all hover:-translate-y-1">
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
              src={galleryService.getImageUrl(selectedImage)}
              alt={selectedImage.title || categoryName(selectedImage.categoryId)}
              className="w-full h-auto rounded-xl"
            />
            <div className="mt-4 text-white text-center">
              <p className="text-sm text-fitness-accent">{categoryName(selectedImage.categoryId)}</p>
              {selectedImage.title && <h3 className="text-xl font-semibold">{selectedImage.title}</h3>}
            </div>
          </div>
        </div>
      )}

      {/* Video Player Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <button
            className="absolute top-4 right-4 p-2 text-white hover:text-fitness-accent transition-colors"
            onClick={() => setSelectedVideo(null)}
          >
            <X size={32} />
          </button>
          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="aspect-video rounded-xl overflow-hidden bg-black">
              <iframe
                src={youtubeService.getEmbedUrl(selectedVideo.id)}
                title={selectedVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
            <div className="mt-4 text-white text-center">
              <h3 className="text-xl font-semibold">{selectedVideo.title}</h3>
              <p className="text-sm text-white/60 mt-1">{youtubeService.formatDate(selectedVideo.publishedAt)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
