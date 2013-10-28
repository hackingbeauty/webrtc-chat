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
                + '<div class="spa-shell-chat"></div>'
                + '<div class="spa-shell-modal"></div>',
            chat_extend_time    : 1000,
            chat_retract_time   : 300,
            chat_extend_height  : 450,
            chat_retract_height : 15
        },
        stateMap = {
          $container  : null,
        },
        jqueryMap = {},
        setJqueryMap, toggleChat, initModule;
    //--------------------- END MODULE SCOPE VARIABLES ---------------

    //--------------------- BEGIN UTILITY METHODS --------------------
    //--------------------- END UTILITY METHODS ----------------------

    //--------------------- BEGIN DOM METHODS ------------------------
    setJqueryMap = function(){
        var $container = stateMap.$container;
        jqueryMap = { 
            $container: $container, 
            $chat : $container.find('.spa-shell-chat')
        };
    }

    toggleChat = function(do_extend, callback){
        var
            px_chat_ht  = jqueryMap.$chat.height(),
            is_open     = px_chat_ht === configMap.chat_extend_height,
            is_closed   = px_chat_ht === configMap.chat_retract_height,
            is_sliding  = !is_open && !is_closed;

        //avoid race conditions
        if(is_sliding){ return false; }

        //begin extend chat slider
        if(do_extend){
            jqueryMap.$chat.animate(
                { height: configMap.chat_extend_height},
                configMap.chat_extend_time,
                function(){
                    if(callback){ callback(jqueryMap.$chat); }
                }
            );
            return true;
        }
        //end extend chat slider

        //begin retract chat slider
       jqueryMap.$chat.animate(
            { height: configMap.chat_retract_height},
            configMap.chat_retract_time,
            function(){
                if(callback){ callback(jqueryMap.$chat); }
            }
        );
        return true;
        //end retract chat slider
    }
    //--------------------- END DOM METHODS --------------------------

    //--------------------- BEGIN EVENT HANDLERS ---------------------
    //--------------------- END EVENT HANDLERS -----------------------

    //--------------------- BEGIN PUBLIC METHODS ---------------------
    initModule = function($container){
        // load HTML and map jQuery collections
        stateMap.$container = $container;
        $container.html(configMap.main_html);
        setJqueryMap();

        // test toggle
        setTimeout(function(){ toggleChat(true); }, 3000);
        setTimeout(function(){ toggleChat(false); }, 8000);
    };

    return { initModule : initModule };
    //--------------------- END PUBLIC METHODS -----------------------
}());
