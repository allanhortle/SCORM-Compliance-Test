var _ = require('lodash');

var storedData = {};
var _data = {};
var _errorCode = 0;

var API_1484_11 = {
    Initialize: function (a) {
        console.log("Initialize", a);
        return 'true';
    },
    Terminate: function () {
        console.log("Terminate");
        console.dir(storedData);
        return "true";
    },
    GetValue: function (str) {
        if(_data[str]) {
            console.log("GetValue(" + str + ") »", _data[str]);
            return _data[str];            
        } else {
            _errorCode = 301;
            return '';
        }
    },
    SetValue: function (name, value) {
        console.log("SetValue(" + name + ", " + value + ")");
        storedData[name] = value;
        return "true";
    },
    Commit: function () {
        console.log("Commit");
        return "true";
    },
    GetLastError: function () {
        return _errorCode;
    },
    GetErrorString: function () {
        // console.log("GetErrorString");
        return _errorCode;
    },
    GetDiagnostic: function () {
        console.log("GetDiagnostic");
        return "true";
    }
};

var SCORM = {
    initialize: function () {
        window['API_1484_11'] = API_1484_11;
    },
    set: function (obj) {
        _data = _.defaults(obj, _data);
    },
    get: function (key) {
        if(key) {
            return _data[key];
        }
        return _data;
    }
}

module.exports = SCORM;