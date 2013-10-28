    /*
    * spa.shell.js
    * Shell module for SPA
    */

    /*jslint         browser : true, continue : true,
    devel  : true, indent  : 2,    maxerr   : 50,
    newcap : true, nomen   : true, plusplus : true,
    regexp : true, sloppy  : true, vars     : false,
    white  : true
    */
    /*global $, spa */

spa.shell = (function () {
    'use strict';
    
    //--------------------- BEGIN MODULE SCOPE VARIABLES --------------
    var
        configMap = {
            main_html : String()
                + '<div class="spa-shell-head">'
                + '<div class="spa-shell-head-logo">'
                + '<h1>SPA</h1>'
                + '<p>javascript end to end</p>'
                + '</div>'
                + '<div class="spa-shell-head-acct"></div>'
                + '</div>'
                + '<div class="spa-shell-main">'
                + '<div class="spa-shell-main-nav"></div>'
                + '<div class="spa-shell-main-content"></div>'
                + '</div>'
                + '<div class="spa-shell-foot"></div>'
                + '<div class="spa-shell-modal"></div>'
        },
        stateMap = {
          $container  : undefined,
        },
        jqueryMap = {},
        setJqueryMap, initModule;

    //--------------------- END MODULE SCOPE VARIABLES ---------------

    //--------------------- BEGIN UTILITY METHODS --------------------
    //--------------------- END UTILITY METHODS ----------------------

    //--------------------- BEGIN DOM METHODS ------------------------
    setJqueryMap = function(){
        var $container = stateMap.$container;
        jqueryMap = { $container: $container }
    }
    //--------------------- END DOM METHODS --------------------------

    //--------------------- BEGIN EVENT HANDLERS ---------------------
    //--------------------- END EVENT HANDLERS -----------------------

    //--------------------- BEGIN PUBLIC METHODS ---------------------
    initModule = function($container){
        stateMap.$container = $container;
        setJqueryMap();
        $container.html(configMap.main_html);
    };

    return { initModule : initModule };
    //--------------------- END PUBLIC METHODS -----------------------
}());
