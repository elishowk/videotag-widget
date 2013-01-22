/**
 * Tests.
 */
require([
        window.testConfig.baseUrl + 'videotag/tools/sort.js',
        window.testConfig.baseUrl + 'feeds/mockdata.js',
        window.testConfig.baseUrl + 'lib/chai-1.4.0.js',
        window.testConfig.baseUrl + 'lib/lodash-1.0.0.min.js'
],
    function(sort, mockdata, chai) {

    describe('testing sort.js', function() {
        it('simple test', function() {
            var users = sort.sort(_.values(mockdata.mockfeed));
            console.log(users);
            expect(users).to.be.a('array');
        });
    });

    expect = chai.expect;
    if (window.mochaPhantomJS) { mochaPhantomJS.run(); }
    else { mocha.run(); }

});
