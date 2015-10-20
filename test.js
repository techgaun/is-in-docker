'use strict';
const assert = require('assert');
const mock = require('mock-fs');
const isInDocker = require('./index');
const multiline = require('multiline');

describe('test is-in-docker', function () {
    after(function () {
        mock.restore();
    });

    it('should detect the process being run inside of container', function () {
        var str = '10:hugetlb:/system.slice/docker-d749f13ff4d603060452dd5d3f308eebb4de3ce84939c636822ce51e554f6904.scope\n' +
            '9:perf_event:/\n' +
            '8:cpu,cpuacct:/system.slice/docker-d749f13ff4d603060452dd5d3f308eebb4de3ce84939c636822ce51e554f6904.scope\n' +
            '7:freezer:/system.slice/docker-d749f13ff4d603060452dd5d3f308eebb4de3ce84939c636822ce51e554f6904.scope\n' +
            '6:cpuset:/system.slice/docker-d749f13ff4d603060452dd5d3f308eebb4de3ce84939c636822ce51e554f6904.scope\n' +
            '5:memory:/system.slice/docker-d749f13ff4d603060452dd5d3f308eebb4de3ce84939c636822ce51e554f6904.scope\n' +
            '4:blkio:/system.slice/docker-d749f13ff4d603060452dd5d3f308eebb4de3ce84939c636822ce51e554f6904.scope\n' +
            '3:net_cls,net_prio:/system.slice/docker-d749f13ff4d603060452dd5d3f308eebb4de3ce84939c636822ce51e554f6904.scope\n' +
            '2:devices:/system.slice/docker-d749f13ff4d603060452dd5d3f308eebb4de3ce84939c636822ce51e554f6904.scope\n' +
            '1:name=systemd:/system.slice/docker-d749f13ff4d603060452dd5d3f308eebb4de3ce84939c636822ce51e554f6904.scope'
        mock({
            '/proc/1/cgroup': str
        });
        assert.strictEqual(isInDocker(), true);
    });

    it('should detect the process being run outside of container', function () {
        var str = '10:hugetlb:/\n' +
            '9:perf_event:/\n' +
            '8:cpu,cpuacct:/\n' +
            '7:freezer:/\n' +
            '6:cpuset:/\n' +
            '5:memory:/\n' +
            '4:blkio:/\n' +
            '3:net_cls,net_prio:/\n' +
            '2:devices:/\n' +
            '1:name=systemd:/'
        mock({
            '/proc/1/cgroup': str
        });
        assert.strictEqual(isInDocker(), false);
    });
});
