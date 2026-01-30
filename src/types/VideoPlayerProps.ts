export interface VideoPlayerProps {
  url: string;
  controls?: boolean;
  playing?: boolean;
  width?: string;
  height?: string;
  loop?: boolean;
  muted?: boolean;
  volume?: number;
  onPlay?():  void;
  onPause?(): void;
  onEnded?(): void;
}