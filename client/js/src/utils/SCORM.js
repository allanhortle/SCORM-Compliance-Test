var _ = require('lodash');

var storedData = {};
var _data = {};
var _errorCode = 0;

var API_1484_11 = {
    Initialize: function () {
        SCORM.log(new Date());
        SCORM.success("Initialize");
        return 'true';
    },
    Terminate: function () {
        SCORM.success("Terminated");
        SCORM.info("Stored Data: ");
        SCORM.log(JSON.stringify(storedData));
        SCORM.log('\n');
        return "true";
    },
    GetValue: function (str) {
        var data = _data[str];
        if(data) {
            SCORM.info("GetValue(" + str + ")", data);
            return data;            
        } else {
            SCORM.error("Failed to GetValue: ", str);
            _errorCode = 301;
            return '';
        }
    },
    SetValue: function (name, value) {
        SCORM.log("SetValue(" + name + ", " + value + ")");
        storedData[name] = value;
        return "true";
    },
    Commit: function () {
        SCORM.success("Commit");
        return "true";
    },
    GetLastError: function () {
        return _errorCode;
    },
    GetErrorString: function () {
        // SCORM.log("GetErrorString");
        return _errorCode;
    },
    GetDiagnostic: function () {
        SCORM.log("GetDiagnostic");
        return "true";
    }
};

var SCORM = {
    initialize: function () {
        window['API_1484_11'] = API_1484_11;
    },
    log: function (message, data) {
        SCORM.message(message, 'white', data);
    },
    success: function (message, data) {
        SCORM.message('✓ ' + message, 'green', data);
    },
    info: function (message, data) {
        SCORM.message(message, 'blue', data);
    },
    error: function (message, data) {
        SCORM.message(message, 'red', data);
    },
    message: function (message, color, data) {
        console.log(message, data);
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