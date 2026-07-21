import { flag } from 'flags/next';

export const storeReleaseFlag = flag({
  key: 'store-release',
  description: 'Feature flag for releasing the e-commerce store',
  decide() {
    return process.env.STORE_RELEASE === 'true';
  },
});
