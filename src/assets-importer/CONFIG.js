module.exports = {
  COLLECTIONS: [
    {
      name: 'smallIcons',
      figmaFileKey: 'ZfLfSmSFdNbhNFvwitFIs6',
      matchingRegex: new RegExp('Icons/ic_', 'i'),
      filenameRegex: new RegExp('ic_.*?(?=_)', 'i'),
      dist: '/src/assets/small-icons',
      format: 'svg',
    },
    {
      name: 'bigIcons',
      figmaFileKey: 'KdznSjw9btqHEKdgmm2UT4co',
      matchingRegex: new RegExp('Icons XL/ic_', 'i'),
      filenameRegex: new RegExp('ic_[a-z0-9-]+', 'i'),
      dist: '/src/assets/big-icons',
      format: 'svg',
    },
    {
      name: 'bicolorIcons',
      figmaFileKey: 'ZfLfSmSFdNbhNFvwitFIs6',
      matchingRegex: new RegExp('Slidericon/ic_', 'i'),
      filenameRegex: new RegExp('ic_.*?(?=_)', 'i'),
      dist: '/src/assets/bicolor-icons',
      format: 'svg',
    },
  ],
};
