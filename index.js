let obj={};
let busyHoursMWF=[];
let busyHoursTR=[]
$(document).ready(function(){
  $('#search').click(function(){
      let isValid = validateTexts();
      if(isValid){
        obj.department = "";
        obj.title = $('#title').val();
        obj.instructor = $('#instructor').val();
        obj.busyTimeMWF = busyHoursMWF;
        obj.busyTimeTR = busyHoursTR;
        obj.clusters = $('#clusterNumber option:selected').val();
        obj.weekDays = $('#dayNumber option:selected').val();
        //obj.building = $('#buildingName option:selected').val();
        obj.begin = $('#startTime').val();
        obj.finish = $('#endTime').val();
        //obj.spaces = $('#availablePlaces').val();
        doAjax(obj);
        //console.log(obj);
      }
  });

  validateTexts = function(){
      let start = $('#startTime').val();
      let end = $('#endTime').val();
      let startValid = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(start);
      let endValid = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(end);
      if(!startValid){
        $('#startTime').css('background-color', 'red');
      }
      else{
          $('#startTime').css('background-color', 'white');
      }

      if(!endValid){
        $('#endTime').css('background-color', 'red');
      }
      else {
          $('#endTime').css('background-color', 'white');
      }
      return(startValid && endValid)

  }

  doAjax = function(body){
    url_ = 'http://10.5.2.53:8090/test';
    $.ajax({
      url: url_,
      type: 'POST',
      data: JSON.stringify(body),
      contentType:"application/json; charset=utf-8",
      headers: {
                    'Access-Control-Allow-Origin': '*',
                },
      success: function(response, error){
                  $('#timetable').empty()
                  handleResponse(response)
                }

      });
  }

  function handleResponse(data) {
      console.log(data)
      tmt = $('#timetable')
      for (d in data) {
          rec = document.createElement("div");
          rec.className = "course"
          s1 = document.createElement("span")
          s1.append(data[d]['subject_code'] + data[d]['course_code'])
          s1.append(' ' + data[d]['title'])
          s1.append(document.createElement("br"))
          s1.append("Instructor: " + data[d]['instructor_name'])
          rec.append(s1)
          rec.append(document.createElement("br"))
          s2 = document.createElement("span")
          s2.append("Clusters: " + data[d]['cluster'])
          rec.append(s2)
          rec.append(document.createElement("br"))
          s3 = document.createElement("span")
          s3.append(data[d]['week_days'] + ' ' + data[d]['start_time'] + ' ' +
                data[d]['end_time'])
          rec.append(s3)
          rec.append(document.createElement("br"))
          s4 = document.createElement("span")
          s4.append(data[d]['building'] + ' ' + data[d]['room'])
          rec.append(s4)
          addButton = document.createElement("input")
          addButton.setAttribute('type', 'button')
          addButton.value = 'Add To Cart'
          addButton.style.float = "right"
          addButton.id = 'addButton_' + d
          addButton.onclick = function () {
              id = this.id
              id = parseInt(id.split('_')[1])
              if(data[id]['week_days'] === 'M W F')
                busyHoursMWF.push(data[id]['start_time'])
              else
                busyHoursTR.push(data[id]['start_time'])
              alert(data[id]['title'] + ' ' + data[id]['section'] + ' selected')
              $('#timetable').empty()
          }
          rec.append(addButton)
          tmt.append(rec)
      }
  }

});
