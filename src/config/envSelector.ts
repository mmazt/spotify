import dev from './dev';
import prod from './prod';
const env = process.env.NODE_ENV;

const envSelector = () => {
  if (env === 'development') {
    return dev;
  } else {
    return prod;
  }
};

export default envSelector;
