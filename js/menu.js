/*
 * File: menu.js
 * Description: This file handles the interface functionality
 * needed for the interface
 */

$(function () {
    init();
});

/*
 * init()
 * returns void
 * initializes elements with event listeners for the interface
 */
function init()
{
    $('#menu').draggable();
    /*
     * Initalize menu to be draggable and disables draggalbe functionality 
     * by default so user can drag the items out without moving the entire 
     * menu element.
     */
    $('#menu').draggable('disable'); 

    /*
     * Enable draggable functionality when 'mousedown' on menuHeader so the
     *  entire menu can be moved
     */
    $('#menuHeader').mousedown(function () {
        $('#menu').draggable('enable');
    });

    /*
     * Disable draggable functionality on 'mouseup' so individual elements
     * can be dragged out again without moving entire menu
     */
    $('#menuHeader').mouseup(function () {
        $('#menu').draggable('disable');
    });
    
    /*
     * Enable dragging for each class of '.datatype'
     */
    
    $('.datatype').each(function(){
       $(this).draggable();
    });
    
    $('.datatype').mousedown(function(){
        //make a copy of the element
        //drag this copied element onto canvas while leaving the original behind
    });
}