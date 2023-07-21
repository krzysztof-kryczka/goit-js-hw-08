import throttle from 'lodash.throttle';
import Vimeo from '@vimeo/player';

const VP_CURRENT_TIME = 'videoplayer-current-time';
const THROTTLE_TIME = 1000;

const searchVimeoPlayer = document.querySelector('#vimeo-player');
const player = new Vimeo(searchVimeoPlayer);

player
  .setCurrentTime(Number(localStorage.getItem(VP_CURRENT_TIME)))
  .then(seconds => console.log(`seconds: ${seconds} = the actual time that the player seeked to`))
  .catch(error => console.log(`${error} the time was less than 0 or greater than the video’s duration`));

const onPlay = currentTime => {
  player.getEnded().then(ended => {
    if (ended) {
      console.log('The video is finish');
      localStorage.setItem(VP_CURRENT_TIME, 0);
    } else {
      console.log('The video is ongoing');
      localStorage.setItem(VP_CURRENT_TIME, Number(currentTime.seconds));
    }
  });
};

//player.on(event, callback);
//throttle(func, wait, options);
player.on('timeupdate', throttle(onPlay, THROTTLE_TIME));
