


$(document).ready(function () {

   /* function convertFormToJSON(form) {
        var array = $(form).serializeArray(); // Encodes the set of form elements as an array of names and values.
        var json = {};
        $.each(array, function () {
          json[this.name] = this.value || "";
        });
        return json;
      }

    $("#ner").on("submit", function (event) {

        event.preventDefault();
        $("#result table").html("");
        var formValues = $(this).serialize();
        var sentence = $('#sentence').val();

        var thead = "";
        var tbody = "";

        console.log(formValues);

        var form = $(event.target);

        var json = convertFormToJSON(form);
        //console.log(json);
        //console.log(typeof json);

        var myFormData = new FormData(event.target);

        var formDataObj = {};
        myFormData.forEach((value, key) => (formDataObj[key] = value));
        console.log(JSON.stringify(formDataObj))
        json_final = JSON.stringify(formDataObj)

        $("#result table").html(`<span class="spinner-border spinner-border-md" role="status" aria-hidden="true"></span> <h1>Loading...</h1>`);

        url = "http://localhost:2020/ner";
        $.ajax({
            type: "POST",
            url: url,
            dataType: "json",
            headers: {
                'Content-Type': 'application/json',
                

            },
            data: formValues,
            success: function (data) {
                //location.reload();
                console.log(data);
                console.log(typeof data);
                var data2 = JSON.parse(data);
                console.log(typeof data2);
                console.log(data2);

                if (!jQuery.isEmptyObject(data2.response_message)) {
                    var info = JSON.parse(data2.response_message);
                }

              
                console.log(info);
                


                $("#result table").html("");
                if (jQuery.isEmptyObject(info)) {
                    $("#result table").html("<tr><td span=\"7\">" + sentence + "</td></tr>");
                }
                else {
                    $("#result table").html("<thead class=\"thead-dark\"><tr> <td>Word</td> <td>NER</td> </tr></thead> <tbody>"


                        + "<tr>" +


                        "<td>" + sentence + "</td>" +
                        "<td>" + info + "</td>" +
    


                        "</tr>" +
                        "</tbody>");
                }
            },
            error: function (jqXhr, textStatus, errorMessage) {
                console.log('Error: ' + jqXhr, textStatus, errorMessage);
                $("#result table").html("");
                $("#result table").html(jqXhr.response_message, textStatus.response_message, errorMessage);
            }

        });

    });*/

    $("#ner").on("submit", function (event) {

    event.preventDefault();

    var sentence = $('#sentence').val();


    var myFormData = new FormData(event.target);

        var formDataObj = {};
        myFormData.forEach((value, key) => (formDataObj[key] = value));
        console.log(JSON.stringify(formDataObj))
        json_final = JSON.stringify(formDataObj)

    var settings = {
        "url": "https://mak-dataviz-ner-model.herokuapp.com/ner",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/json"
        },
        "data": json_final,
      };

      $("#result table").html("");
      $("#result table").html(`<span class="spinner-border spinner-border-md" role="status" aria-hidden="true"></span> <h1>Loading...</h1>`);
      
      $.ajax(settings).done(function (response) {
        console.log(response);

                if (!jQuery.isEmptyObject(response.response_message)) {
                    var info = JSON.parse(response.response_message);
                }

              
                console.log(info);
                
                console.log(typeof info);


                //$("#result table").html("");
                if (jQuery.isEmptyObject(info)) {
                    $("#result table").html("<tr><td span=\"7\">" + sentence + "</td></tr>");
                }
                else {
                
                    
                    
                    
                    Object.entries(info).forEach((item) =>{
                        const [key, value] = item;
                        console.log(key);
                        console.log(`${value.sentence}: ${value.entity}`);
                        $("#result table").html("<thead class=\"thead-dark\"><tr> <td>#</td><td>Word</td> <td>NER</td> </tr></thead> <tbody>"

                         +"<tr>" +

                        "<td>" + key + "</td>" +
                        "<td>" + `${value.sentence}` + "</td>" +
                        "<td>" + `${value.entity}` + "</td>" +
    


                        "</tr>" +
                        "</tbody>");
                    });
                        
                }
      });
    });
});