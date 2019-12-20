export default [
  {
    caption: 'Picture Sources Test',
    image: 'https://dummyimage.com/1536x364?text=1+Picture+Sources+Test',
    thumbnail: 'https://dummyimage.com/154x86?text=1+thumb+TL+to+D',
    pictureSources: {
      'max-width: 600px': 'https://dummyimage.com/306x172?text=1+M',
      'max-width: 900px': 'https://dummyimage.com/768x432?text=1+TP',
      'max-width: 1200px': 'https://dummyimage.com/768x432?text=1+TL',
    },
    thumbnailPictureSources: {
      'max-width: 900px': 'https://dummyimage.com/768x432?text=1+thumb+M+to+TP',
    },
  }, {
    caption: 'Picture Sources Test',
    image: 'https://dummyimage.com/1536x864?text=2+Picture+Sources+Test',
    thumbnail: 'https://dummyimage.com/154x86?text=2+thumb+TL+to+D',
    pictureSources: {
      'max-width: 600px': 'https://dummyimage.com/306x172?text=2+M',
      'max-width: 900px': 'https://dummyimage.com/768x432?text=2+TP',
      'max-width: 1200px': 'https://dummyimage.com/768x432?text=2+TL',
    },
    thumbnailPictureSources: {
      'max-width: 900px': 'https://dummyimage.com/768x432?text=2+thumb+M+to+TP',
    },
  }, {
    caption: 'Image Source Set test',
    image: 'https://dummyimage.com/1536x364?text=3+Image+Source+Set+test',
    imageSrcSet: 'https://dummyimage.com/3072x726?text=3+DPR2x 2x, https://dummyimage.com/4608x1092?text=3+DPR3x 3x',
    thumbnail: 'https://dummyimage.com/154x86?text=3+thumb+default+density',
    thumbnailSrcSet: 'https://dummyimage.com/308x172?text=3+thumb+DPR2x 2x, https://dummyimage.com/462x258?text=3+thumb+DPR3x 3x',
  }, {
    caption: 'Image and Picture Source Sets test',
    image: 'https://dummyimage.com/1536x864?text=4+Picture+Source+Sets+Test',
    imageSrcSet: 'https://dummyimage.com/3072x726?text=4+DPR2x 2x, https://dummyimage.com/4608x1092?text=4+DPR3x 3x',
    thumbnail: 'https://dummyimage.com/256x61?text=4+thumb+thumbnail',
    pictureSources: {
      'max-width: 600px': 'https://dummyimage.com/306x172?text=4+M 1x, https://dummyimage.com/306x172?text=4+M+DPI2x 2x, https://dummyimage.com/306x172?text=4+M+DPI3x 3x',
      'max-width: 900px': 'https://dummyimage.com/768x432?text=4+TP 1x, https://dummyimage.com/1536x864?text=4+TP+DPI2x 2x, https://dummyimage.com/2304x1296?text=4+TP3x 3x',
      'max-width: 1200px': 'https://dummyimage.com/768x432?text=4+TL 1x, https://dummyimage.com/1536x864?text=4+TL+DPI2x 2x, https://dummyimage.com/2304x1296?text=4+TL3x 3x',
    },
    thumbnailPictureSources: {
      'max-width: 900px': 'https://dummyimage.com/768x432?text=4+thumb+M+to+TP+DPR1x 1x, https://dummyimage.com/1536x864?text=4+thumb+TP+DPI2x 2x, https://dummyimage.com/2304x1296?text=4+thumb+TP3x 3x',
    },
    thumbnailSrcSet: 'https://dummyimage.com/612x344?text=4+thumb+DPR2x 2x, https://dummyimage.com/918x516?text=4+thumb+DPR3x 3x',
  }, {
    caption: 'Uneven image',
    image: 'https://dummyimage.com/1536x2864?text=5+uneven+image',
    thumbnail: 'https://dummyimage.com/2306x3172?text=5+thumb+uneven+image',
  }, {
    image: 'https://dummyimage.com/1536x864?text=6',
    thumbnail: 'https://dummyimage.com/306x172?text=6',
    caption: 'Cellar',
  }, {
    image: 'https://dummyimage.com/1536x864?text=7',
    thumbnail: 'https://dummyimage.com/306x172?text=7',
    caption: '__vue_devtool_undefined__',
  }, {
    image: 'https://dummyimage.com/1536x864?text=8',
    thumbnail: 'https://dummyimage.com/306x172?text=8',
    caption: '__vue_devtool_undefined__',
  }, {
    image: 'https://dummyimage.com/1536x864?text=9',
    thumbnail: 'https://dummyimage.com/306x172?text=9',
    caption: 'Some title',
  }, {
    image: 'https://dummyimage.com/1536x864?text=10',
    thumbnail: 'https://dummyimage.com/306x172?text=10',
    caption: 'Some title',
  }, {
    image: 'https://dummyimage.com/1536x864?text=11',
    thumbnail: 'https://dummyimage.com/306x172?text=11',
    caption: 'Some title',
  }, {
    image: 'https://dummyimage.com/1536x864?text=12',
    thumbnail: 'https://dummyimage.com/306x172?text=12',
    caption: 'Some title',
  },
];
