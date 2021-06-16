import {path} from 'path'
import {markdownMagic} from 'markdown-magic'

const config = {
  transforms: {
    ARTIFACT: require('./index.js'),
  },
};

const markdownPath = path.join(__dirname, 'README.md');
markdownMagic(markdownPath, config);



