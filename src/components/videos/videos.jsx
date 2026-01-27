import React, { useState, useEffect } from 'react';
import { Badge } from '@radix-ui/themes';
import './videos.css';

// Hardcoded list of YouTube URLs
const YOUTUBE_URLS = [
  'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  'https://www.youtube.com/watch?v=jNQXAC9IVRw',
  'https://www.youtube.com/watch?v=9bZkp7q19f0',
  'https://www.youtube.com/watch?v=kJQP7kiw5Fk',
  'https://www.youtube.com/watch?v=fJ9rUzIMcZQ',
  'https://www.youtube.com/watch?v=OPf0YbXqDm0',
];

// Extract YouTube Video ID from various URL formats
const extractVideoId = (url) => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  return null;
};

// Validate YouTube URL
const isValidYouTubeUrl = (url) => {
  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
  return youtubeRegex.test(url);
};

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchVideoMetadata = async () => {
      const videoPromises = YOUTUBE_URLS.map(async (url) => {
        // Validate URL
        if (!isValidYouTubeUrl(url)) {
          return {
            url,
            videoId: null,
            title: 'Invalid URL',
            thumbnailUrl: null,
            error: 'Invalid YouTube URL',
          };
        }

        // Extract video ID
        const videoId = extractVideoId(url);
        if (!videoId) {
          return {
            url,
            videoId: null,
            title: 'Could not extract video ID',
            thumbnailUrl: null,
            error: 'Could not extract video ID from URL',
          };
        }

        try {
          // Fetch metadata from YouTube oEmbed API
          const response = await fetch(
            `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`
          );

          if (!response.ok) {
            throw new Error('Failed to fetch video metadata');
          }

          const data = await response.json();

          return {
            url,
            videoId,
            title: data.title,
            thumbnailUrl: data.thumbnail_url,
            error: null,
          };
        } catch (error) {
          console.error(`Error fetching metadata for ${url}:`, error);
          // Fallback to using video ID for thumbnail
          return {
            url,
            videoId,
            title: 'Video Title Unavailable',
            thumbnailUrl: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
            error: error.message,
          };
        }
      });

      const results = await Promise.all(videoPromises);
      setVideos(results);
      setLoading(false);
    };

    fetchVideoMetadata();
  }, []);

  const handleVideoClick = (url) => {
    window.open(url, '_blank');
  };

  if (loading) {
    return (
      <div className="videos-container">
        <div className="videos-loading">Loading videos...</div>
      </div>
    );
  }

  return (
    <div className="videos-container">
      <h1 className="videos-title">Videos</h1>
      <div className="videos-grid">
        {videos.map((video, index) => (
          <Badge
            key={index}
            className="video-badge"
            size="3"
            variant="soft"
            onClick={() => handleVideoClick(video.url)}
          >
            <div className="video-card">
              {video.thumbnailUrl ? (
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="video-thumbnail"
                />
              ) : (
                <div className="video-thumbnail-placeholder">No Thumbnail</div>
              )}
              <div className="video-info">
                <h3 className="video-title">{video.title}</h3>
                {video.error && (
                  <p className="video-error">Error: {video.error}</p>
                )}
              </div>
            </div>
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default Videos;

