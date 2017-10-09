/**
 * Request module
 * @type {request|exports|module.exports}
 */
const request = require('request');

class YandexGeocoder {

    /**
     * Class constructor
     *
     * @param options
     * @param options.apiKey
     * @param [options.russianAddressesOnly]
     */
    constructor(options) {

        // if (!options.apiKey) {
        //     throw new Error('No apiKey specified');
        // }

        // this.apiKey               = options.apiKey;
        // this.russianAddressesOnly = !!options.russianAddressesOnly;
    }

    /**
     * Resolve address
     *
     * @param query
     * @param [options]
     * @param [options.timeout] request timeout in milliseconds
     * @param callback
     * @returns {*}
     */
    resolve(query, options, callback) {

        if (!query) {
            return callback(new Error('No address specified'));
        }

        if (typeof options == 'function') {
            callback = options;
            options  = {};
        }

        let geoRequest = this.buildRequest(query, options);

        this.resolveQuery(geoRequest, options, callback);
    }

    /**
     *
     * @param query
     * @param options
     * @returns {string}
     */
    buildRequest(query, options) {

        let results = options.results || 10;
        var q = 'geocode=' + encodeURIComponent(query) + '&results=' + results +
            '&format=json&lang=en-US';
            // + 'key=' + this.apiKey;

        if (options.kind) {
            q += '&kind=' + options.kind;
        }

        return q;
    }

    /**
     *
     * @param geoRequest
     * @param options
     * @param [options.timeout] request timeout in milliseconds
     * @param callback
     */
    resolveQuery(geoRequest, options, callback) {

        request.get({
            url: 'https://geocode-maps.yandex.ru/1.x/?' + geoRequest,
            json: true,
            timeout: options.timeout || 60000
        }, (err, response, body) => {

            var collection = [];

            if (err) {
                return callback(err);
            }

            if (!body) {
                return callback(null, collection);
            }

            if (body.error) {
                return callback(new Error(body.error.message));
            }

            if (!body.response) {
                return callback(new Error(`Empty response, address not resolved`));
            }

            body.response.GeoObjectCollection.featureMember.forEach(item => {

                let geoObject = item.GeoObject;

                // if (this.russianAddressesOnly) {
                //
                //     if (!geoObject.metaDataProperty.GeocoderMetaData.AddressDetails.Country) {
                //         return;
                //     }
                //
                //     if (geoObject.metaDataProperty.GeocoderMetaData.AddressDetails.Country.CountryNameCode !== 'RU') {
                //         return;
                //     }
                // }

                var refinedGeoObject = this.refineGeoObject(geoObject);

                if (refinedGeoObject != null) {
                    collection.push(refinedGeoObject);
                }
            });

            callback(null, collection);
        });
    }

    refineGeoObject(geoObject) {

        var administrativeArea = geoObject.metaDataProperty.GeocoderMetaData.AddressDetails.Country.AdministrativeArea;
        var countryCode = geoObject.metaDataProperty.GeocoderMetaData.Address.country_code;

        if (!administrativeArea) {
            return null;
        }

        let geoCoordinates = geoObject.Point.pos.split(' ');
        let locality;
        let Thoroughfare;
        let Premise;

        let geo = {
            longitude: geoCoordinates[0],
            latitude: geoCoordinates[1],
            obl: administrativeArea.AdministrativeAreaName,
            country_code: countryCode
        };

        if (administrativeArea.hasOwnProperty('SubAdministrativeArea')) {

            locality  = administrativeArea.SubAdministrativeArea.Locality;
            geo.raion = administrativeArea.SubAdministrativeArea.SubAdministrativeAreaName;

            if (locality) {
                geo.place = locality.LocalityName;
            } else {
                return null;
            }

        } else {

            locality = administrativeArea.Locality;

            if (locality) {
                geo.geoRaion = locality.LocalityName;
            } else {
                return null;
            }
        }

        if (locality.hasOwnProperty('DependentLocality')) {

            if (locality.DependentLocality.hasOwnProperty('Premise')) {

                geo.place = locality.DependentLocality.DependentLocalityName;
                Premise   = locality.DependentLocality.Premise;
                geo.house = Premise.PremiseNumber;

            } else if (locality.DependentLocality.hasOwnProperty('Thoroughfare')) {

                Thoroughfare = locality.DependentLocality.Thoroughfare;

                geo.street = Thoroughfare.ThoroughfareName;

                if (Thoroughfare.hasOwnProperty('Premise')) {
                    if (Thoroughfare.Premise.hasOwnProperty('PremiseNumber')) {
                        geo.house = Thoroughfare.Premise.PremiseNumber;
                    }
                }

            } else if (locality.DependentLocality.hasOwnProperty('DependentLocality')) {

                var DependentLocality2 = locality.DependentLocality.DependentLocality;
                geo.place              = DependentLocality2.DependentLocalityName;

            } else {

                geo.place = locality.DependentLocality.DependentLocalityName;
            }

        } else {

            if (locality.hasOwnProperty('Thoroughfare')) {

                Thoroughfare = locality.Thoroughfare;
                geo.street   = Thoroughfare.ThoroughfareName;

                if (Thoroughfare.hasOwnProperty('Premise')) {
                    geo.house = Thoroughfare.Premise.PremiseNumber;
                }
            }
        }

        var addressArr = [geo.obl];

        if (geo.raion) {
            addressArr.push(geo.raion);
        }

        if (geo.place) {
            addressArr.push(geo.place);
        }

        if (geo.street) {
            addressArr.push(geo.street);
        }

        if (geo.house) {
            addressArr.push(geo.house);
        }

        if (geo.country_code) {
            addressArr.push(geo.country_code);
        }

        geo.address = addressArr.join(', ');

        return geo;
    }
}

/**
 * Exporting YandexGeocoder Library
 *
 * @type {Function}
 */
module.exports = YandexGeocoder;
