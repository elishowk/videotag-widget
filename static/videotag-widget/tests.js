/**
 * Tests.
 */
require([window.feedsTestsConfig.baseUrl + 'videotag/tools/sort.js',
        window.feedsTestsConfig.baseUrl + 'lib/chai-1.4.0.js'],
    function(sort, chai) {

    describe('testing sort.js', function() {
        it('simple test', function() {
            expect(Feeds).to.be.a('function');
            var feeds = Feeds(sockjsurl);
            expect(feeds).to.be.a('object');
            expect(feeds).to.have.property('sock');
            expect(feeds).to.have.property('feed');
            expect(feeds).to.have.property('trigger');
            expect(feeds).to.have.property('send');
        });
    });

    expect = chai.expect;
    if (window.mochaPhantomJS) { mochaPhantomJS.run(); }
    else { mocha.run(); }

});
