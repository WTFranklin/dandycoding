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
     * Reverts back to original position if dropped in an 'invalid' 
     * drop location
     */
    
    $('.datatype').each(function(){
       $(this).draggable({
           revert: true
       });
    });
    
    $('.datatype').mousedown(function(){
        //make a copy of the element
        //drag this copied element onto canvas while leaving the original behind
    });
    
    /*
     * Enable dropping for canvas element
     */
    $('#canvas').droppable({
        drop: function(event, ui) {
            //get type of variable from html
            var varType = $(ui.helper).html();

            //launch modal
            $("#addVariable").modal();
            
            //setup modal
            $("#varType").html(varType);
        }
    });
    
    $('#addVariable #submit').click(function(){
       //validate data going into this variable
       var dataType = $("#varType").html();
       var varName = $("#varName").val().trim();
       var value = $("#varValue").val().trim();
       
       switch(dataType)
       {
           case "byte":
               //validate byte
               break;
           case "boolean":
               
               if(value !== "true" && value !== "false") {
                   alert("Invalid value for this type!");
                   return;
               }
               
               addVariable(dataType, varName, value);
               break;
       }
    });
    
}//init()

function addVariable(dataType, varName, value)
{
    var variable = '<div class="var-icon">';
        variable += '<div class="btn-group icon-header">';
        variable += '<span class="glyphicon glyphicon-option-vertical btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></span>';
        variable += '<ul class="dropdown-menu">';
        variable += '<li><a href="#">Edit <span class="glyphicon glyphicon-pencil"></span></a></li>'
        variable += '<li role="separator" class="divider"></li>';
        variable += '<li><a href="#"><span class="remove-icon">Remove Variable</span>&nbsp;<span class="glyphicon glyphicon-remove remove-icon"></span></a></li>';
        variable += '</ul>';
        variable += '</div>';
        variable += '<div class="var-name">';
        variable += '<span class="var-data-type">' + dataType + '</span> <span class="var-name">' + varName + '</span>';
        variable += '</div>';
        variable += '<div class="var-value">' + value + '</div>';
        variable += '</div>';
    
    $("#canvas").append(variable);
    
    //clean up form
    
    $("#varName").val('');
    $("#varValue").val('');
    
    $("#addVariable").modal('hide');
    
    initializeVariableIcon();
} //addVariable()

function initializeVariableIcon()
{
    /*
     * Show menu bar when hovering over variable icon
     */
    $('.var-icon').mouseover(function(){
       $('.icon-header').css('display', 'block');
    });
    
    /*
     * Hide menu bar when hovering over variable icon
     */
    $('.var-icon').mouseout(function(){
       $('.icon-header').css('display', 'none');
    });
    
    /*
     * Remove variable icon when clicked
     */
    $('.remove-icon').click(function(){
        $(this).closest('.var-icon').remove();
    });
} //initializeVariableIcon()


/*** for testing only! ***/
function clog(msg)
{
    console.log(msg);
} //clog()