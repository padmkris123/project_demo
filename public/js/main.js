/*$(document).ready(function(){
    console.log('its working !');
})*/

/*********** jsTree ************/
$(function () {
  $('#jstree').jstree({ 'core' : {
    "themes" : {
      "responsive" : "true"
    },
    'data' : {
      'url' : '../data/treeData.json',
      'data' : function (node) {
        return { 'id' : node.id };
      }
    }
   },
  "plugins" : [ "wholerow", "checkbox" ]
  });

  $('#jstree').on("changed.jstree", function (e, data) {
    console.log(data.selected);
  });

  $('#getResults').on('click', function () {
    /*$('#jstree').jstree(true).select_node('child_node_1');
    $('#jstree').jstree('select_node', 'child_node_1');
    $.jstree.reference('#jstree').select_node('child_node_1');*/
    $("#jsGrid").jsGrid({
        height: "70%",
        width: "100%",
        filtering: true,
        editing: true,
        autoload: true,
        paging: true,
        deleteConfirm: function(item) {
            return "The client \"" + item.Name + "\" will be removed. Are you sure?";
        },
        rowClick: function(args) {
            showDetailsDialog("Edit", args.item);
        },
        controller: db,
        fields: [
            { name: "Name", type: "text", width: 150 },
            { name: "Age", type: "number", width: 50 },
            { name: "Address", type: "text", width: 200 },
            { name: "Married", type: "checkbox", title: "Is Married", sorting: false },
            {
                type: "control",
                modeSwitchButton: false,
                editButton: false,
                headerTemplate: function() {
                    return $("<button>").attr("type", "button").text("Add")
                        .on("click", function () {
                            showDetailsDialog("Add", {});
                        });
                }
            }
        ]
    });

  });

  /*********** grid ************/
  var flag = false;
   var clients = {};
      var db = {

          loadData: function(filter) {
            var d = $.Deferred();
            if(!flag){
              $.ajax({
                  url: "../data/gridData.json",
                  dataType: "json"
              }).done(function(response) {
                  clients = response;
                  d.resolve(clients );
                  flag = true;
                  $('.jsgrid-grid-body').css('height','auto');
              });

              return d.promise();
            }else{
              return $.grep(clients, function(client) {
                  return (!filter.Name || client.Name.indexOf(filter.Name) > -1)
                      && (!filter.Age || client.Age === filter.Age)
                      && (!filter.Address || client.Address.indexOf(filter.Address) > -1)
                      && (filter.Married === undefined || client.Married === filter.Married);
              });
            }
            /**/

          },

          insertItem: function(insertingClient) {
              clients.push(insertingClient);
          },

          updateItem: function(updatingClient) { },

          deleteItem: function(deletingClient) {
              var clientIndex = $.inArray(deletingClient, clients);
              clients.splice(clientIndex, 1);
          }

      };

      window.db = db;
/*
      $("#jsGrid").jsGrid({
          height: "70%",
          width: "100%",
          filtering: true,
          editing: true,
          autoload: true,
          paging: true,
          deleteConfirm: function(item) {
              return "The client \"" + item.Name + "\" will be removed. Are you sure?";
          },
          rowClick: function(args) {
              showDetailsDialog("Edit", args.item);
          },
          controller: db,
          fields: [
              { name: "Name", type: "text", width: 150 },
              { name: "Age", type: "number", width: 50 },
              { name: "Address", type: "text", width: 200 },
              { name: "Married", type: "checkbox", title: "Is Married", sorting: false },
              {
                  type: "control",
                  modeSwitchButton: false,
                  editButton: false,
                  headerTemplate: function() {
                      return $("<button>").attr("type", "button").text("Add")
                          .on("click", function () {
                              showDetailsDialog("Add", {});
                          });
                  }
              }
          ]
      });*/





    $("#detailsDialog").dialog({
        autoOpen: false,
        width: 400,
        close: function() {
            $("#detailsForm").validate().resetForm();
            $("#detailsForm").find(".error").removeClass("error");
        }
    });

    $("#detailsForm").validate({
        rules: {
            name: "required",
            age: { required: true, range: [18, 150] },
            address: { required: true, minlength: 10 },
            country: "required"
        },
        messages: {
            name: "Please enter name",
            age: "Please enter valid age",
            address: "Please enter address (more than 10 chars)"
        },
        submitHandler: function() {
            formSubmitHandler();
        }
    });

    var formSubmitHandler = $.noop;

    var showDetailsDialog = function(dialogType, client) {
        $("#name").val(client.Name);
        $("#age").val(client.Age);
        $("#address").val(client.Address);
        $("#married").prop("checked", client.Married);

        formSubmitHandler = function() {
            saveClient(client, dialogType === "Add");
        };

        $("#detailsDialog").dialog("option", "title", dialogType + " Client")
                .dialog("open");
    };

    var saveClient = function(client, isNew) {
        $.extend(client, {
            Name: $("#name").val(),
            Age: parseInt($("#age").val(), 10),
            Address: $("#address").val(),
            Married: $("#married").is(":checked")
        });

        $("#jsGrid").jsGrid(isNew ? "insertItem" : "updateItem", client);

        $("#detailsDialog").dialog("close");
    };


});
