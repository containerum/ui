// Run me: node findTranslations.js

const fs = require('fs');
const path = require('path');

var walk = function (dir, regExcludes, done) {
    let results = [];

    fs.readdir(dir, (err, list) => {
        if (err) return done(err);

        let pending = list.length;
        if (!pending) return done(null, results);

        list.forEach((file) => {
            file = path.join(dir, file);

            let excluded = false;
            const len = regExcludes.length;
            let i = 0;

            for (; i < len; i++) {
                if (file.match(regExcludes[i])) {
                    excluded = true;
                }
            }

            // Add if not in regExcludes
            if (excluded === false) {
                results.push(file);

                // Check if its a folder
                fs.stat(file, (err, stat) => {
                    if (stat && stat.isDirectory()) {
                        // If it is, walk again
                        walk(file, regExcludes, (err, res) => {
                            results = results.concat(res);

                            if (!--pending) {
                                done(null, results);
                            }
                        });
                    } else if (!--pending) {
                        done(null, results);
                    }
                });
            } else if (!--pending) {
                done(null, results);
            }
        });
    });
};

const regExcludes = [/index\.html/, /\.css/, /styles/, /middlewares/, /images/, /\.svg/];

walk('./src', regExcludes, (err, results) => {
    if (err) {
        throw err;
    }
    const localizationPaths = [];
    const propNameAndWord = [];
    results.map((item) => {
        if (path.extname(item) === '.js') {
            if (item.indexOf('localization') + 1) {
                localizationPaths.push(item);
            }
            const text = fs.readFileSync(item, 'utf8');
            if (text.indexOf('<Translate content=') >= 0) {
                const regexp = /<Translate content='[A-Za-z. ]*'>[A-Za-z.-_\d ]*<\/Translate>/gi;
                const matches_array = text.match(regexp);
                matches_array.map((item) => {
                    const middleVar = item.substring(item.indexOf('Translate content') + 19, item.indexOf("'>")).split('.');
                    middleVar.push(item.substring(item.indexOf("'>") + 2, item.indexOf('</')));
                    propNameAndWord.push(middleVar);
                });
            }
        }
    });
    localizationPaths.map((item) => {
        const absolutePath = item;
        const text = fs.readFileSync(absolutePath, 'utf8');
        let requiredTextInsert = '';
        for (let i = 0; i < propNameAndWord.length; i++) {
            if (text.indexOf(propNameAndWord[i][0]) + 1 && absolutePath.indexOf(propNameAndWord[i][0] + '.js') + 1) {
                const indexProp = text.indexOf(propNameAndWord[i][0]) + propNameAndWord[i][0].length;
                requiredTextInsert = text.substring(0, indexProp) + ': {\n\t\t';
                propNameAndWord.map((item, i) => {
                    if (absolutePath.indexOf(item[0]) + 1) {
                        if (propNameAndWord[propNameAndWord.length - 1] === item) {
                            requiredTextInsert += propNameAndWord[i][1] + ': "' + propNameAndWord[i][2] + '"';
                        } else {
                            requiredTextInsert += propNameAndWord[i][1] + ': "' + propNameAndWord[i][2] + '",\n\t\t';
                        }
                    }
                });
                requiredTextInsert += '\n\t}\n});\n';

                fs.open(item, 'w+', (err, file_handle) => {
                    if (!err) {
                        fs.write(file_handle, requiredTextInsert, (err, written) => {
                            if (!err) {
                                console.log('Text successfully written to file');
                            } else {
                                console.log('There was an error writing');
                            }
                        });
                    } else {
                        console.log('An error occurred while opening');
                    }
                });
            }
        }
    });
});
