import axios from 'axios';

const checkImage = url => {
  axios
    .get(url)
    .then(res => {
      if (res.status > 400) {
        console.log(url);
        // return require('../assets/img/no-image.jpg');
        return false;
      } else {
        // console.log('okee nih');
        return true;
      }
    })
    .catch(() => {
      return false;
    });
};

export default checkImage;
