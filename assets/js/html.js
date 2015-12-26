/**
 * Created by Jeton on 5/16/2015.
 */
var HTML = {
    set: function (setId, htmlId) {
        $('#' + setId).load('/templates/components.html #' + htmlId);
    }
};