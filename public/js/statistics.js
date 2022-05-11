var message = new Array(9);
var socket = io();

socket.on('refreshData',refreshData);

function refreshData(){
  var start=$('#datepicker-1').val();
  var end=$('#datepicker-2').val();
  if(start=="" && end==""){
    getStatistics();
    setTimeout(function() {
        $('.dataTable tr:first-child td').addClass('add-new-row');
        setTimeout(function() {
            $('.dataTable tr:first-child td').removeClass('add-new-row');
        }, 1000);
    }, 1500);
  }
}



$(document).ready(function(){

$( "#datepicker-1" ).datepicker();
$( "#datepicker-2" ).datepicker();
$('input[type=text]').val('');
  getStatistics();

})


function getStatistics(start="",end=""){

          $('#data-listing').DataTable().destroy();

          var dataTable = $('#data-listing').DataTable( {
            "lengthMenu": [[1440,2000,5000], [1440,2000,5000]],
            "processing": true,
            "serverSide": true,
            "autoWidth": false,
            "searching": false,
            "aaSorting": [[0, "desc"]],
            scrollY:        "400px",
            scrollX:        true,
            scrollCollapse: true,
            dom: 'Blfrtip',
            columns: [
              {
                data: 'date',
                render: function(data){
                  date =  new Date(data);                  
                  return moment(date).format('DD-MMM-YYYY');
                }
              }, 
              {
                data: 'date',
                render: function(data){
                  date =  new Date(data);                  
                  return moment(date).format("HH:mm");
                }
              }, 
              {
                  data: 'rotary_psi'
              },
              {
                  data: 'carriage_psi'
              },
              {
                  data: 'mud_psi'
              },
              {
                  data: 'vice_psi'
              },
              {
                  data: 'carriage_position'
              },
              {
                  data: 'rotary_rpm'
              },
              {
                  data: 'battery_level'
              },
              {
                  data: 'fuel_level'
              }
              ],
              "ajax":{
                      url : '/api/reports', // json datasource
                      type: "post",  // method  , by default get
                      data:{start_date:start,end_date:end},
                      beforeSend : function(){
                        $('#load').show();
                      },                        
                      "dataSrc": function (json){
                          return json.data;
                      },
                      error: function(){  // error handling
                        $('#load').hide();
                      }
                    }
              }); 
             var buttons = new $.fn.dataTable.Buttons(dataTable, {
                 buttons: [
                   'copyHtml5',
                   'excelHtml5',
                   'csvHtml5',
                   'pdfHtml5',
                   'print'
                ]
            }).container().appendTo($('#download-buttons'));
}

$(function() {
    $( "#datepicker-1" ).datepicker({
        dateFormat: "dd/mm/yy",
        autoclose: true
    }
     );

    $( "#datepicker-2" ).datepicker({
        dateFormat: "dd/mm/yy",
        autoclose: true        
    });

    $('#datepicker-1').on('change',function(){   
        
    })
    $('#datepicker-1').on('click',function(){   
        $("#start_error").html("");
    })
    
    $('#datepicker-2').on('change',function(){   
        if($("#datepicker-1").val()!='')
        {
            var start=$('#datepicker-1').val();
            var start_date = start.split('/');
            start = start_date[2] + '-' + start_date[0] + '-' + start_date[1];
            start = start+'T00:00:00';

            var end=$('#datepicker-2').val();
            var end_date = end.split('/');
            end = end_date[2] + '-' + end_date[0] + '-' + end_date[1];
            end = end+'T23:59:59';
            getStatistics(start,end);
            $('#ttl_cls_count').html(''); 
            $('.progress-lst').removeClass('active');
        }
        else
        {
            $("#start_error").html("Please select start date");
        }
    })
});