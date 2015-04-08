/**
 * angular-sofa-filter - v0.1.0 - Wed Apr 08 2015 12:22:37 GMT+0200 (CEST)
 * http://www.sofa.io
 *
 * Copyright (c) 2014 CouchCommerce GmbH (http://www.couchcommerce.com / http://www.sofa.io) and other contributors
 * THIS SOFTWARE CONTAINS COMPONENTS OF THE SOFA.IO COUCHCOMMERCE SDK (WWW.SOFA.IO)
 * IT IS PROVIDED UNDER THE LICENSE TERMS OF THE ATTACHED LICENSE.TXT.
 */
;(function (angular) {
angular.module('sofa.filter', [
    'sofa.filter.currency',
    'sofa.filter.stringReplace'
]);

'use strict';
angular
    .module('sofa.filter.currency', ['sofa.core'])
    .filter('currency', ['configService', function(configService){


        //the currency can be specified by either the html entity,
        //the symbol or the shorthand name
        var currencyMap = {
            EUR: {
                synonyms: ['&euro;', '€', 'EUR'],
                character: '\u20AC'
            },
            USD: { 
                synonyms: ['&&#36;', '$', 'USD'],
                character: '\u0024'
            },
            GBP: {
                synonyms: ['&pound;', '£', 'GBP'],
                character: '\u00A3'
            },
            CHF: {
                synonyms: ['CHF'],
                character: 'CHF'
            },
            PLN: {
                 synonyms: ['PLN'],
                 character: 'z\u0142'
            }
        };

        var pointToComma = function(val){
            return val.replace('.', ',');
        };

        var CURRENCY_SIGN = configService.get('currencySign');

        return function(val){

            var currency = (CURRENCY_SIGN || '&euro;').trim();

            var currencyKey = sofa.Util.findKey(currencyMap, function(item){
                                    return item.synonyms.indexOf(currency) > -1; 
                                });

            var currencyChar = currencyMap[currencyKey].character;

            var fixedVal = parseFloat(val).toFixed(2);

            if (currencyKey === 'EUR' ){
                return pointToComma(fixedVal) + ' ' + currencyChar;
            }
            else if (currencyKey === 'USD' || currencyKey === 'GBP'){
                return currencyChar + ' ' + fixedVal;
            }
            else if (currencyKey === 'CHF'){
                return currencyChar + ' ' + pointToComma(fixedVal);
            }
            else if (currencyKey === 'PLN'){
                return pointToComma(fixedVal) + ' ' + currencyChar;
            }
            else{
                return fixedVal;
            }
        };
    }]);

angular
    .module('sofa.filter.stringReplace', [])
    .filter('stringReplace', [function () {

        'use strict';
        // Takes n arguments after "template". Either an array or arguments are turned into one
        return function (template) {
            var values = [];

            if (arguments.length < 2) {
                return template;
            } else if (arguments.length > 2) {
                // Turn all arguments except the first one into an array
                values = Array.prototype.slice.call(arguments, 1);
            } else {
                var arg = arguments[1];

                if (angular.isArray(arg)) {
                    values = arg;
                } else if (angular.isString(arg) || angular.isNumber(arg)) {
                    values[0] = arg;
                } else {
                    return template;
                }
            }

            var parse = function (template, values) {
                var regEx = /%s/,
                    hits  = template.match(/%s/g).length,
                    i     = 0;

                for (; i < hits + 1; i++) {
                    template = template.replace(regEx, values[i]);
                }

                return template;
            };

            return parse(template, values);
        };
    }]);
}(angular));
