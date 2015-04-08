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
