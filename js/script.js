// file for scripting fun times

//when you click the button the text in div 1 changes
var btn1 = document.getElementById("btn").addEventListener("click",getTeams);

function getTeams (){
//set the html contents of index.html dynamically
    
    //function expression to assing data HTML div element to variable
    var data = document.getElementById("data");

    //function expression to assign RosterYear form input element to variable
    var inptRosterYr = document.getElementById("RosterYear");

    //function expression to assign user input year to RosterYear
        //TODO validate roster year input date and prompt the user to enter a date in the valid range for MLB Data
            // - probably need to use an event lister on the Go button too
    let RosterYear = inptRosterYr.value;
    //alert(RosterYear);

    return fetch('http://lookup-service-prod.mlb.com/json/named.team_all_season.bam?sport_code=%27mlb%27&all_star_sw=%27N%27&sort_order=name_asc&season=%27'+RosterYear+'%27')
        .then(function(response){            
            return response.json();
        })

        .then(function(resp){
            console.log(resp.team_all_season.queryResults.row[0].name_display_full);

            //get total array size
            let totalSize = resp.team_all_season.queryResults.totalSize;

            //loop through the array to populate your html
            for(let i=0; i < totalSize; i++){
                
                //assign team name to var
                let teamName = resp.team_all_season.queryResults.row[i].name_display_full;
                
                //generate the innerHTML
                data.innerHTML += '<div class="col" id="data">'+teamName+'</div>';
            }
            
            //return response.data

        })
    }
