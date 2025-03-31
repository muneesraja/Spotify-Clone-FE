'use client';

import AudioPlayer from './AudioPlayer';

export default function PlayerContainer() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <AudioPlayer />
    </div>
  );
} 