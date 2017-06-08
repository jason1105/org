"use strict";
var Device = (function () {
    function Device(id, sn, type, appId, memo, custom, conf, version, metaId, metaData, status) {
        this.id = id;
        this.sn = sn;
        this.type = type;
        this.appId = appId;
        this.memo = memo;
        this.custom = custom;
        this.conf = conf;
        this.version = version;
        this.metaId = metaId;
        this.metaData = metaData;
        this.status = status;
    }
    return Device;
}());
exports.Device = Device;
