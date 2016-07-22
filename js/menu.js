/*
 * File: menu.js
 * Description: This file handles the interface functionality
 * needed for the interface
 */

var oldName;

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

    $('.datatype').each(function () {
        $(this).draggable({
            revert: true
        });
    });

    $('.datatype').mousedown(function () {
        //make a copy of the element
        //drag this copied element onto canvas while leaving the original behind
    });

    /*
     * Enable dropping for canvas element
     */
    $('#canvas').droppable({
        drop: function (event, ui) {
            //get type of variable from html
            var varType = $(ui.helper).html();

            //launch modal
            $("#addVariable").modal();

            //setup modal
            $("#varType").html(varType);
        }
    });

    /*
     * Add variable submit functionality
     */

    $('#addVariable .submit').click(function () {
        //validate data going into this variable
        var dataType = $("#varType").html();
        var varName = $("#varName").val().trim();
        var value = $("#varValue").val().trim();
        var isValid = validate(dataType, value);

        if (isValid)
        {
            addVariable(dataType, varName, value);
        }
    });

    /*
     * Edit variable submit functionality
     */

    $('#editVariable .submit').click(function () {
        //validate data going into this variable
        var dataType = $("#varType").html();
        var varName = $("#editVarName").val().trim();
        var value = $("#editVarValue").val().trim();
        var isValid = validate(dataType, value);

        if (isValid)
        {
            editVariable(varName, value);
        }
    });

}//init()

function addVariable(dataType, varName, value)
{
    drawIcon(dataType, varName, value);

    //clean up form
    $("#varName").val('');
    $("#varValue").val('');

    //hide modal
    $("#addVariable").modal('hide');

    //set up icon
    initializeVariableIcon();

} //addVariable()

function drawIcon(dataType, varName, value)
{
    var variable = '<div id="' + varName + '" class="var-icon">';
    variable += '<div class="btn-group icon-header">';
    variable += '<span class="glyphicon glyphicon-option-vertical btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></span>';
    variable += '<ul class="dropdown-menu">';
    variable += '<li><a href="#"><span class="editVar">Edit</span> <span class="glyphicon glyphicon-pencil editVar"></span></a></li>';
    variable += '<li role="separator" class="divider"></li>';
    variable += '<li><a href="#"><span class="remove-icon">Remove Variable</span>&nbsp;<span class="glyphicon glyphicon-remove remove-icon"></span></a></li>';
    variable += '</ul>';
    variable += '</div>';
    variable += '<div class="variable">';
    variable += '<span class="var-data-type">' + dataType + '</span> <span class="var-name">' + varName + '</span>';
    variable += '</div>';
    variable += '<div>Value: <span class="var-value">' + value + '</span></div>';
    variable += '</div>';

    $("#canvas").append(variable);
} //drawIcon()

function editVariable(varName, varValue)
{
    //close modal
    $('#editVariable').modal('hide');

    //update data
    $('#' + oldName + ' .var-name').html(varName);
    $('#' + oldName + ' .var-value').html(varValue);

    //update ID for this variable icon!
    $('#' + oldName).attr('id', varName);

    //update oldName to new current name!
    oldName = varName;

} //editVariable()

function validate(dataType, value)
{
    switch (dataType)
    {
        case "byte":
            //validate byte
            break;
        case "boolean":
            if (value !== "true" && value !== "false") {
                alert("Invalid value for this type!");
                return false;
            }
            break;
        case "char":
            if (value.length > 1) {
                alert("Value too long for char variable!");
                return false;
            }
            break;
        case "int":
            if (isNaN(value)) {
                alert("Not a number!");
                return false;
            }
            break;
        case "long":
            if (isNaN(value)) {
                alert("Not a number!");
                return false;
            }
            break;
        case "float":
            if (isNaN(value)) {
                alert("Not a number!");
                return false;
            }
            break;
        case "double":
            if (isNaN(value)) {
                alert("Not a number!");
                return false;
            }
            break;

    } //switch

    return true;
} //validate()

function initializeVariableIcon()
{
    /*
     * Show menu bar when hovering over variable icon
     */
    $('.var-icon').mouseover(function () {
        $(this).find('.icon-header').css('display', 'block');
    });

    /*
     * Hide menu bar when hovering over variable icon
     */
    $('.var-icon').mouseout(function () {
        $('.icon-header').css('display', 'none');
    });

    /*
     * Edit variable functionality
     */
    $('.editVar').click(function () {
        //store current name into 'oldName', just in case we need to use it for editing
        oldName = $(this).closest('.var-icon').find('.var-name').html();

        //show modal with this variable's information to edit
        var varName = $(this).closest('.var-icon').find('.var-name').html();
        var varValue = $(this).closest('.var-icon').find('.var-value').html();

        //launch modal
        $("#editVariable").modal();

        //pre-fill form with current data
        $('#editVarLabel').html(varName);
        $('#editVarName').val(varName);
        $('#editVarValue').val(varValue);
    });

    /*
     * Remove variable icon when clicked
     */
    $('.remove-icon').click(function () {
        $(this).closest('.var-icon').remove();
    });
} //initializeVariableIcon()


/*** for testing only! ***/
function clog(msg)
{
    console.log(msg);
} //clog()