import { URL } from 'url';
import debug from 'debug';

const log = debug('EleventyPluginRSS');

export default async function (url, base) {
  try {
    return new URL(url, base).toString();
  } catch (e) {
    log(
      'Trying to convert %o to be an absolute url with base %o and failed, returning: %o (invalid url)',
      url,
      base,
      url
    );
    // TODO add debug output!
    return url;
  }
};
