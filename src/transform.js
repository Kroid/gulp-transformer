var path = require('path');
var haml = require('haml')
var jade = require('jade');

module.exports = function(content, filepath, cb) {
    var first = filepath.split('.');
    var last = first.pop();

    switch (last) {
        case 'jade':
            return fromJade(content, first, cb);
        case 'haml':
            return fromHaml(content, first, cb);

    }
};



function fromHaml(content, filepath, cb) {
    cb({
        path: [filepath, 'html'].join('.'),
        content: haml.render(content)
    });
}

function fromJade(content, filepath, cb) {
    cb({
        path: [filepath, 'html'].join('.'),
        content: jade.render(content)
    });
}