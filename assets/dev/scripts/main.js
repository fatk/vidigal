'use strict';

require.config({
    paths: {
        jquery: 'vendor/jquery/jquery',
        requirejs: 'vendor/requirejs/require'
    },
    shim: {

    }
});

require(['app']);
