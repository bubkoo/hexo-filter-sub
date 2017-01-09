var assign = require('object-assign');
var markup = '~';

hexo.config.sup = assign({ markup: markup }, hexo.config.sup);
var placeholder = (hexo.config.sup.markup || markup)
  .split('')
  .map(function (char) {
    return '\\' + char;
  })
  .join('');

var reg = new RegExp(placeholder + '(.*?)' + placeholder, 'g');

function parse(data) {
  var source = data.source;
  var ext = source.substring(source.lastIndexOf('.')).toLowerCase();

  if (['.js', '.css', '.html', '.htm'].indexOf(ext) > -1) {
    return;
  }

  // H~2~0 => H<sub>2</sub>O
  data.content = data.content.replace(reg, function (raw, content) {
    return '<sub>' + content + '</sub>';
  });

  console.log(data.content);
}

hexo.extend.filter.register('before_post_render', parse, 9);