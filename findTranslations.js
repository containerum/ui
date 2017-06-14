// Run me: node findTranslations.js

var fs = require('fs');
var path = require('path');

var walk = function (dir, regExcludes, done) {
    var results = [];

    fs.readdir(dir, function (err, list) {
        if (err) return done(err);

        var pending = list.length;
        if (!pending) return done(null, results);

        list.forEach(function (file) {
            file = path.join(dir, file);

            var excluded = false;
            var len = regExcludes.length;
            var i = 0;

            for (; i < len; i++) {
                if (file.match(regExcludes[i])) {
                    excluded = true;
                }
            }

            // Add if not in regExcludes
            if(excluded === false) {
                results.push(file);

                // Check if its a folder
                fs.stat(file, function (err, stat) {
                    if (stat && stat.isDirectory()) {

                        // If it is, walk again
                        walk(file, regExcludes, function (err, res) {
                            results = results.concat(res);

                            if (!--pending) { done(null, results); }

                        });
                    } else {
                        if (!--pending) { done(null, results); }
                    }
                });
            } else {
                if (!--pending) { done(null, results); }
            }
        });
    });
};

var regExcludes = [/index\.html/, /\.css/, /styles/, /middlewares/, /images/, /\.svg/];

walk('./src', regExcludes, function(err, results) {
    if (err) {
        throw err;
    }
    var localizationPaths = [];
    var propNameAndWord = [];
    results.map((item) => {
        if(path.extname(item) === '.js') {
            if(item.indexOf('localization') + 1) {
                localizationPaths.push(item);
            }
            var text = fs.readFileSync(item, 'utf8');
            if(text.indexOf('<Translate content=') >= 0) {
                var regexp = /<Translate content='[A-Za-z. ]*'>[A-Za-z.-_\d ]*<\/Translate>/gi;
                var matches_array = text.match(regexp);
                matches_array.map(function (item) {
                    var middleVar = item.substring(item.indexOf('Translate content') + 19, item.indexOf("'>")).split('.')
                    middleVar.push(item.substring(item.indexOf("'>") + 2, item.indexOf("</")));
                    propNameAndWord.push(middleVar);
                });
            }
        }
    });
    localizationPaths.map(function (item) {
        var absolutePath = item;
        var text = fs.readFileSync(absolutePath, 'utf8');
        var requiredTextInsert = '';
        for (var i=0; i<propNameAndWord.length; i++) {
            if (text.indexOf(propNameAndWord[i][0]) + 1 && absolutePath.indexOf(propNameAndWord[i][0] + '.js') + 1) {
            var indexProp = text.indexOf(propNameAndWord[i][0]) + propNameAndWord[i][0].length;
            requiredTextInsert = text.substring(0, indexProp) + ': {\n\t\t';
            propNameAndWord.map(function (item, i) {
                if (absolutePath.indexOf(item[0]) + 1) {
                    if (propNameAndWord[propNameAndWord.length - 1] === item) {
                        requiredTextInsert += propNameAndWord[i][1] + ': "' + propNameAndWord[i][2] + '"';
                    } else {
                        requiredTextInsert += propNameAndWord[i][1] + ': "' + propNameAndWord[i][2] + '",\n\t\t';
                    }
                }
            });
            requiredTextInsert += '\n\t}\n});\n';

            fs.open(item, "w+", function(err, file_handle) {
                if (!err) {
                    fs.write(file_handle, requiredTextInsert, function(err, written) {
                        if (!err) {
                            console.log("Text successfully written to file");
                        } else {
                            console.log("There was an error writing");
                        }
                    });
                } else {
                    console.log("An error occurred while opening");
                }
            });
        }
        }
    });
});
