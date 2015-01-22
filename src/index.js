var fs = require('fs');

var chokidar = require('chokidar');
var log = console.log.bind(console);

var transform = require('./transform')

function FS(options) {
    var self = this;

    self.virtual = {};

    self.src = options.src;
    self.dest = options.dest;

    self.watcher = chokidar.watch(options.src);

    self.watcher.on('add', function(path) {
        self.transformFile(path)
    });
    self.watcher.on('addDir', function(path) {

    });
    self.watcher.on('change', function(path) {
        self.transformFile(path)
    });
    self.watcher.on('unlink', function(path) {

    });
    self.watcher.on('unlinkDir', function(path) {

    });
    self.watcher.on('error', function(path) {

    });
    self.watcher.on('ready', function(path) {

    });

    setTimeout(function() {
        log(self.virtual);
    }, 1000);
}






FS.prototype.transformFile = function(path) {
    var self = this
    fs.readFile(path, function(err, data) {
        if(err) { return log('error:', err) }

        transform(data.toString(), path, function(resp){
            self.virtual[resp.path] = resp.content;
        });
    })
};



function transformer(content, path, cb) {

}









//FS.prototype.add = function(path, stats) {
//    log('File', path, 'has been added', stats);
//    this.readFile(path);
//};
//
//FS.prototype.addDir = function(path, stats) { log('Directory', path, 'has been added', stats); };
//
//FS.prototype.change = function(path, stats) {
//    log('File', path, 'has been changed', stats);
//    this.readFile(path);
//};
//
//FS.prototype.unlink = function(path) { log('File', path, 'has been removed'); };
//
//FS.prototype.unlinkDir = function(path) { log('Directory', path, 'has been removed'); };
//
//FS.prototype.error = function(error) { log('Error happened', error); };
//
//FS.prototype.ready = function() { log('Initial scan complete. Ready for changes.'); };
//
//FS.prototype.raw = function(event, path, details) { log('Raw event info:', event, path, details); };
//
//
//
//
//FS.prototype.transform = function(content, path) {};



module.exports = function(options) {
    return new FS(options)
}