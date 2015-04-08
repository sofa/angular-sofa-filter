'use strict';

describe('sofa.filter.stringReplace', function() {
    var filter;

    beforeEach(module('sofa.filter.stringReplace'));

    beforeEach(inject(function($injector) {
        var _$filter_ = $injector.get('$filter');
        filter = _$filter_('stringReplace');
    }));
    
    it('should return the template when no arguments are given', function() {
        expect(filter('test')).toEqual('test');
    });

    it('should replace %s with data', function() {
        expect(filter('%s', 'test')).toEqual('test');
    });
});

