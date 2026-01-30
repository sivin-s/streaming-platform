import ReactPlayer from 'react-player'
import type {VideoPlayerProps} from '../types/VideoPlayerProps'

export const PlayerComponent:React.FC<VideoPlayerProps>  = ({
    url,
    controls=true,
    playing= false,
    width='100%',
    height='100%',
    loop=false,
    muted=true,
    volume,
    onPlay,
    onPause,
    onEnded
})=>{
    return(
          <ReactPlayer 
          src={url}
          controls={controls}
          playing={playing}
          width={width}
          height={height}
          loop={loop}
          muted={muted}
          volume={volume}
          onPlay={onPlay}
          onPause={onPause}
          onEnded={onEnded}
          />
    )
}