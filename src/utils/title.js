import constants from '@/constants/index';

function createTitle(title) {
  return `${title} | ${constants.titleEnding}`
}

export default createTitle
