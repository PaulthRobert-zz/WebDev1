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

    //clear div
    data.innerHTML="";

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
                //league_full
                let league = resp.team_all_season.queryResults.row[i].league;
                //venue_name:
                let venueName=resp.team_all_season.queryResults.row[i].venue_name;
                //mlb_org_brief
                let Name=resp.team_all_season.queryResults.row[i].mlb_org_brief;
                //generate the innerHTML
                data.innerHTML += `
                    <div class="card bg-dark">    
                        <div class="card-body bg-light">    
                            <div class="row">
                                <div class="col-4">
                                    <p class="card-text text-body">`+Name+`</p>
                                </div>
                                <div class="col-8">
                                    <p class="text-body cust-card-text-right">`+teamName+`</p>
                                </div>
                            </div>
                            <div class="row">                                
                                <div class = "col-10">
                                    <p class="card-text text-body">`+venueName+`</p>
                                </div>
                                <div class = "col-2">
                                    <p class="card-text text-body cust-card-text-right">`+league+`</p>
                                </div>
                            </div>
        
                        </div>
                    </div>
                </div>`

            }
            
            //return response.data

        })
    }
