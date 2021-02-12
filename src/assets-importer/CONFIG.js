module.exports = {
  COLLECTIONS: [
    {
      name: 'smallIcons',
      figmaFileKey: 'KdznSjw9btqHEKdgmm2UT4co',
      matchingRegex: new RegExp('Icons/ic_', 'i'),
      filenameRegex: new RegExp('ic_[a-z0-9-]+', 'i'),
      dist: '/src/assets/small-icons',
      format: 'svg',
    },
    {
      name: 'mediumIcons',
      figmaFileKey: 'KdznSjw9btqHEKdgmm2UT4co',
      matchingRegex: new RegExp('Icons M_ic_', 'i'),
      filenameRegex: new RegExp('ic_[a-z0-9-]+', 'i'),
      dist: '/src/assets/medium-icons',
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
      figmaFileKey: 'KdznSjw9btqHEKdgmm2UT4co',
      matchingRegex: new RegExp('Slidericon/ic_', 'i'),
      filenameRegex: new RegExp('ic_[a-z0-9-]+', 'i'),
      dist: '/src/assets/bicolor-icons',
      format: 'svg',
    },
  ],
};
