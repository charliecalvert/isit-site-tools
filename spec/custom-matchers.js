const customMatchers = {

    elfFileToExist: function(util) {

        return {
            compare: function(actual) {
                let expected = true;
                console.log('actual: ', actual);
                console.log('expected: ', expected);
                const result = {};

                result.pass = util.equals(actual, expected);
                if (result.pass) {
                    result.message = 'expected ' + actual + 'to be good';
                } else {
                    result.message = 'expected file to exist';
                }
                return result;
            }
        };
    }
};

module.exports = customMatchers;