'use strict';

describe('sofa.filter.currency', function() {
    var $filter, configService;

    beforeEach(module('sofa.filter.currency'));

    beforeEach(inject(function($injector) {
        $filter = $injector.get('$filter');
        configService = $injector.get('configService');
    }));

    it('should correctly display EUR', function() {
        configService.set('currencySign', 'EUR');
        expect($filter('currency')('4.50')).toEqual('4,50 €');
    });

    it('should correctly display USD', function() {
        configService.set('currencySign', 'USD');
        expect($filter('currency')('4.50')).toEqual('$ 4.50');
    });
    
    it('should correctly display GBP', function() {
        configService.set('currencySign', 'GBP');
        expect($filter('currency')('4.50')).toEqual('£ 4.50');
    });

    it('should correctly display CHF', function() {
        configService.set('currencySign', 'CHF');
        expect($filter('currency')('4.50')).toEqual('CHF 4,50');
    });
});
