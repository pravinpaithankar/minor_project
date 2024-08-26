"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var oas_1 = __importDefault(require("oas"));
var core_1 = __importDefault(require("api/dist/core"));
var openapi_json_1 = __importDefault(require("./openapi.json"));
var SDK = /** @class */ (function () {
    function SDK() {
        this.spec = oas_1.default.init(openapi_json_1.default);
        this.core = new core_1.default(this.spec, 'locationiq/1.5.0 (api/6.1.2)');
    }
    /**
     * Optionally configure various options that the SDK allows.
     *
     * @param config Object of supported SDK options and toggles.
     * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
     * should be represented in milliseconds.
     */
    SDK.prototype.config = function (config) {
        this.core.setConfig(config);
    };
    /**
     * If the API you're using requires authentication you can supply the required credentials
     * through this method and the library will magically determine how they should be used
     * within your API request.
     *
     * With the exception of OpenID and MutualTLS, it supports all forms of authentication
     * supported by the OpenAPI specification.
     *
     * @example <caption>HTTP Basic auth</caption>
     * sdk.auth('username', 'password');
     *
     * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
     * sdk.auth('myBearerToken');
     *
     * @example <caption>API Keys</caption>
     * sdk.auth('myApiKey');
     *
     * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
     * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
     * @param values Your auth credentials for the API; can specify up to two strings or numbers.
     */
    SDK.prototype.auth = function () {
        var _a;
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        (_a = this.core).setAuth.apply(_a, values);
        return this;
    };
    /**
     * If the API you're using offers alternate server URLs, and server variables, you can tell
     * the SDK which one to use with this method. To use it you can supply either one of the
     * server URLs that are contained within the OpenAPI definition (along with any server
     * variables), or you can pass it a fully qualified URL to use (that may or may not exist
     * within the OpenAPI definition).
     *
     * @example <caption>Server URL with server variables</caption>
     * sdk.server('https://{region}.api.example.com/{basePath}', {
     *   name: 'eu',
     *   basePath: 'v14',
     * });
     *
     * @example <caption>Fully qualified server URL</caption>
     * sdk.server('https://eu.api.example.com/v14');
     *
     * @param url Server URL
     * @param variables An object of variables to replace into the server URL.
     */
    SDK.prototype.server = function (url, variables) {
        if (variables === void 0) { variables = {}; }
        this.core.setServer(url, variables);
    };
    /**
     * The Search API allows converting addresses, such as a street address, into geographic
     * coordinates (latitude and longitude). These coordinates can serve various use-cases,
     * from placing markers on a map to helping algorithms determine nearby bus stops. This
     * process is also known as Forward Geocoding.
     *
     * @summary Free Form Query
     * @throws FetchError<400, types.SearchResponse400> Bad Request
     * @throws FetchError<401, types.SearchResponse401> Unauthorized
     * @throws FetchError<403, types.SearchResponse403> The request has been made from an unauthorized domain.
     * @throws FetchError<404, types.SearchResponse404> No location or places were found for the given input.
     * @throws FetchError<429, types.SearchResponse429> Request exceeded the rate-limits set on your account.
     * @throws FetchError<500, types.SearchResponse500> Internal Server Error
     */
    SDK.prototype.search = function (metadata) {
        return this.core.fetch('/search', 'get', metadata);
    };
    /**
     * Structured Query offers a more specific way to search for locations. Instead of using a
     * single text string, you can provide distinct address components in a structured format.
     * This includes specifying elements like street, neighborhood, city, state, country, and
     * postal code, each sent as separate API parameters.
     *
     * @summary Structured Geocoding
     * @throws FetchError<400, types.SearchStructuredResponse400> Bad Request
     * @throws FetchError<401, types.SearchStructuredResponse401> Unauthorized
     * @throws FetchError<403, types.SearchStructuredResponse403> The request has been made from an unauthorized domain.
     * @throws FetchError<404, types.SearchStructuredResponse404> No location or places were found for the given input.
     * @throws FetchError<429, types.SearchStructuredResponse429> Request exceeded the rate-limits set on your account.
     * @throws FetchError<500, types.SearchStructuredResponse500> Internal Server Error
     */
    SDK.prototype.searchStructured = function (metadata) {
        return this.core.fetch('/search/structured', 'get', metadata);
    };
    /**
     * Postal Address Lookup streamlines the task of locating details when only a postal code
     * match is necessary. It’s particularly useful when you want to fetch location information
     * without handling complete addresses.
     *
     * @summary Postal Code Search
     * @throws FetchError<400, types.SearchPostalcodeResponse400> Bad Request
     * @throws FetchError<401, types.SearchPostalcodeResponse401> Unauthorized
     * @throws FetchError<403, types.SearchPostalcodeResponse403> The request has been made from an unauthorized domain.
     * @throws FetchError<404, types.SearchPostalcodeResponse404> No location or places were found for the given input.
     * @throws FetchError<429, types.SearchPostalcodeResponse429> Request exceeded the rate-limits set on your account.
     * @throws FetchError<500, types.SearchPostalcodeResponse500> Internal Server Error
     */
    SDK.prototype.searchPostalcode = function (metadata) {
        return this.core.fetch('/search/postalcode', 'get', metadata);
    };
    /**
     * Reverse geocoding is the process of converting a coordinate or location (latitude,
     * longitude) to a readable address or place name. This permits the identification of
     * nearby street addresses, places, and/or area subdivisions such as a neighborhood,
     * county, state, or country.
     *
     * @summary Reverse Geocoding
     * @throws FetchError<400, types.ReverseResponse400> Bad Request
     * @throws FetchError<401, types.ReverseResponse401> Unauthorized
     * @throws FetchError<403, types.ReverseResponse403> The request has been made from an unauthorized domain.
     * @throws FetchError<404, types.ReverseResponse404> No location or places were found for the given input.
     * @throws FetchError<429, types.ReverseResponse429> Request exceeded the rate-limits set on your account.
     * @throws FetchError<500, types.ReverseResponse500> Internal Server Error
     */
    SDK.prototype.reverse = function (metadata) {
        return this.core.fetch('/reverse', 'get', metadata);
    };
    /**
     * The Autocomplete API is a variant of the Search API that returns place predictions in
     * response to an HTTP request. The request specifies a textual search string and optional
     * geographic bounds. The service can be used to provide autocomplete functionality for
     * text-based geographic searches, by returning places such as businesses, addresses and
     * points of interest as a user types.
     *
     * The Autocomplete API can match on full words as well as substrings. Applications can
     * therefore send queries as the user types, to provide on-the-fly place predictions.
     *
     * <a href="https://locationiq.com/demo#autocomplete" target="_blank">Try this API in our
     * Playground</a>
     *
     * > If you use Leaflet for your maps, you add LocationIQ's Autocomplete as a plugin
     * instantly! You can <a href="https://github.com/location-iq/leaflet-geocoder"
     * target="_blank">view instructions here</a>. You can also view a <a
     * href="https://maps.locationiq.com" target="_blank">live demo here</a>.
     *
     * > The Autocomplete API endpoint (https://api.locationiq.com/v1) offers an Anycast IP
     * address and route user requests to a datacenter closest to them. You can still manually
     * specify a `region` similar to other LocationIQ endpoints, but in the interest of
     * end-user experience, we don't recommended such a configuration.
     *
     * @summary Autocomplete
     * @throws FetchError<400, types.AutocompleteResponse400> Bad Request
     * @throws FetchError<401, types.AutocompleteResponse401> Unauthorized
     * @throws FetchError<403, types.AutocompleteResponse403> The request has been made from an unauthorized domain.
     * @throws FetchError<404, types.AutocompleteResponse404> No location or places were found for the given input.
     * @throws FetchError<429, types.AutocompleteResponse429> Request exceeded the rate-limits set on your account.
     * @throws FetchError<500, types.AutocompleteResponse500> Internal Server Error
     */
    SDK.prototype.autocomplete = function (metadata) {
        return this.core.fetch('/autocomplete', 'get', metadata);
    };
    /**
     * The lookup API allows querying the address and other details of one or multiple OSM
     * objects, such as nodes, ways, or relations.
     *
     * @summary Lookup
     * @throws FetchError<400, types.LookupResponse400> Bad Request
     * @throws FetchError<401, types.LookupResponse401> Unauthorized
     * @throws FetchError<403, types.LookupResponse403> The request has been made from an unauthorized domain.
     * @throws FetchError<404, types.LookupResponse404> No location or places were found for the given input.
     * @throws FetchError<500, types.LookupResponse500> Internal Server Error
     */
    SDK.prototype.lookup = function (metadata) {
        return this.core.fetch('/lookup', 'get', metadata);
    };
    /**
     * Finds the fastest route between coordinates in the supplied order.
     *
     * @summary Directions Service
     * @throws FetchError<400, types.DirectionsResponse400> Bad Request
     * @throws FetchError<401, types.DirectionsResponse401> Unauthorized
     * @throws FetchError<403, types.DirectionsResponse403> The request has been made from an unauthorized domain.
     * @throws FetchError<404, types.DirectionsResponse404> No location or places were found for the given input
     * @throws FetchError<429, types.DirectionsResponse429> Request exceeded the rate-limits set on your account
     * @throws FetchError<500, types.DirectionsResponse500> Internal Server Error
     */
    SDK.prototype.directions = function (metadata) {
        return this.core.fetch('/directions/{profile}/{coordinates}', 'get', metadata);
    };
    /**
     * Optimize API solves the Traveling Salesman Problem(TSP) using a greedy heuristic
     * (farthest-insertion algorithm) for 10 or more waypoints and uses brute force for less
     * than 10 waypoints. The returned path does not have to be the fastest path. As TSP is
     * NP-hard it only returns an approximation. Note that all input coordinates have to be
     * connected for the optimize service to work.
     *
     * @summary Optimize Service
     * @throws FetchError<400, types.OptimizeResponse400> Bad Request
     * @throws FetchError<401, types.OptimizeResponse401> Unauthorized
     * @throws FetchError<403, types.OptimizeResponse403> The request has been made from an unauthorized domain.
     * @throws FetchError<404, types.OptimizeResponse404> No location or places were found for the given input
     * @throws FetchError<429, types.OptimizeResponse429> Request exceeded the rate-limits set on your account
     * @throws FetchError<500, types.OptimizeResponse500> Internal Server Error
     */
    SDK.prototype.optimize = function (metadata) {
        return this.core.fetch('/optimize/{profile}/{coordinates}', 'get', metadata);
    };
    /**
     * Matching API matches or snaps given GPS points to the road network in the most plausible
     * way. Please note the request might result multiple sub-traces. Large jumps in the
     * timestamps (> 60s) or improbable transitions lead to trace splits if a complete matching
     * could not be found. The algorithm might not be able to match all points. Outliers are
     * removed if they can not be matched successfully.
     *
     * @summary Matching Service
     * @throws FetchError<400, types.MatchingResponse400> Bad Request
     * @throws FetchError<401, types.MatchingResponse401> Unauthorized
     * @throws FetchError<403, types.MatchingResponse403> The request has been made from an unauthorized domain.
     * @throws FetchError<404, types.MatchingResponse404> No location or places were found for the given input
     * @throws FetchError<429, types.MatchingResponse429> Request exceeded the rate-limits set on your account
     * @throws FetchError<500, types.MatchingResponse500> Internal Server Error
     */
    SDK.prototype.matching = function (metadata) {
        return this.core.fetch('/matching/{profile}/{coordinates}', 'get', metadata);
    };
    /**
     * Computes duration of the fastest route between all pairs of supplied coordinates.
     * Returns the durations or distances or both between the coordinate pairs. Note that the
     * distances are not the shortest distance between two coordinates, but rather the
     * distances of the fastest routes.
     *
     * @summary Matrix Service
     * @throws FetchError<400, types.MatrixResponse400> Bad Request
     * @throws FetchError<401, types.MatrixResponse401> Unauthorized
     * @throws FetchError<403, types.MatrixResponse403> The request has been made from an unauthorized domain.
     * @throws FetchError<404, types.MatrixResponse404> No location or places were found for the given input
     * @throws FetchError<429, types.MatrixResponse429> Request exceeded the rate-limits set on your account
     * @throws FetchError<500, types.MatrixResponse500> Internal Server Error
     */
    SDK.prototype.matrix = function (metadata) {
        return this.core.fetch('/matrix/{profile}/{coordinates}', 'get', metadata);
    };
    /**
     * Snaps a coordinate to the street network and returns the nearest n matches. Where
     * coordinates only supports a single {longitude},{latitude} entry.
     *
     * @summary Nearest Service
     * @throws FetchError<400, types.NearestResponse400> Bad Request
     * @throws FetchError<401, types.NearestResponse401> Unauthorized
     * @throws FetchError<403, types.NearestResponse403> The request has been made from an unauthorized domain.
     * @throws FetchError<404, types.NearestResponse404> No location or places were found for the given input
     * @throws FetchError<429, types.NearestResponse429> Request exceeded the rate-limits set on your account
     * @throws FetchError<500, types.NearestResponse500> Internal Server Error
     */
    SDK.prototype.nearest = function (metadata) {
        return this.core.fetch('/nearest/{profile}/{coordinates}', 'get', metadata);
    };
    /**
     * The Nearby API returns Points of Interest (PoI) such as cafes, hospitals or even
     * airports near a specified location.
     *
     * Note: The Nearby API endpoint is presently in BETA. The request or response format may
     * change without notice. While we don't expect to remove any elements, there will be
     * additions.
     *
     * @summary Nearby - Points of Interest (PoI) (Public BETA)
     * @throws FetchError<400, types.NearbyResponse400> Bad Request
     * @throws FetchError<401, types.NearbyResponse401> Unauthorized
     * @throws FetchError<403, types.NearbyResponse403> The request has been made from an unauthorized domain.
     * @throws FetchError<404, types.NearbyResponse404> No location or places were found for the given input.
     * @throws FetchError<429, types.NearbyResponse429> Request exceeded the rate-limits set on your account.
     * @throws FetchError<500, types.NearbyResponse500> Internal Server Error
     */
    SDK.prototype.nearby = function (metadata) {
        return this.core.fetch('/nearby', 'get', metadata);
    };
    /**
     * The Timezone API provides time offset data for locations on the surface of the earth.
     *
     * @summary Timezone
     * @throws FetchError<400, types.GetTimezoneResponse400> Bad Request
     * @throws FetchError<401, types.GetTimezoneResponse401> Unauthorized
     * @throws FetchError<403, types.GetTimezoneResponse403> The request has been made from an unauthorized domain.
     * @throws FetchError<404, types.GetTimezoneResponse404> No location or places were found for the given input.
     * @throws FetchError<429, types.GetTimezoneResponse429> Request exceeded the rate-limits set on your account.
     * @throws FetchError<500, types.GetTimezoneResponse500> Internal Server Error
     */
    SDK.prototype.getTimezone = function (metadata) {
        return this.core.fetch('/timezone', 'get', metadata);
    };
    /**
     * The Balance API provides a count of request credits left in the user's account for the
     * day. Balance is reset at midnight UTC every day (00:00 UTC).
     *
     * @summary Balance
     * @throws FetchError<400, types.BalanceResponse400> Bad Request
     * @throws FetchError<401, types.BalanceResponse401> Unauthorized
     * @throws FetchError<403, types.BalanceResponse403> The request has been made from an unauthorized domain.
     * @throws FetchError<429, types.BalanceResponse429> Request exceeded the rate-limits set on your account.
     * @throws FetchError<500, types.BalanceResponse500> Internal Server Error
     */
    SDK.prototype.balance = function () {
        return this.core.fetch('/balance', 'get');
    };
    return SDK;
}());
var createSDK = (function () { return new SDK(); })();
module.exports = createSDK;
