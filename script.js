// file for scripting fun times

//when you click the button the text in div 1 changes
var btn1 = document.getElementById("btn").addEventListener("click", getTeams);

function getTeams() {
    //set the html contents of index.html dynamically

    //function expression to assing data HTML div element to variable
    var data = document.getElementById("data");

    //function expression to assign RosterYear form input element to variable
    var inptRosterYr = document.getElementById("RosterYear");

    //function expression to assign user input year to RosterYear
    //TODO validate roster year input date and prompt the user to enter a date in the valid range for MLB Data
    // - probably need to use an event lister on the Go button too
    var rosterYear = inptRosterYr.value;
    //alert(RosterYear);

    //clear div
    data.innerHTML = "";
    //get mlb team data api
    return fetch('https://lookup-service-prod.mlb.com/json/named.team_all_season.bam?sport_code=%27mlb%27&all_star_sw=%27N%27&sort_order=name_asc&season=%27' + rosterYear + '%27').then(function (response) {
        return response.json();
    }).then(function (resp) {

        //get total array size
        var totalSize = resp.team_all_season.queryResults.totalSize;

        //loop through the array to populate your html
        for (var i = 0; i < totalSize; i++) {
            //mlb_org_brief
            var Name = resp.team_all_season.queryResults.row[i].mlb_org_brief;
            //assign team name to var
            var teamName = resp.team_all_season.queryResults.row[i].name_display_full;
            //venue_name:
            var venueName = resp.team_all_season.queryResults.row[i].venue_name;
            //league
            var league = resp.team_all_season.queryResults.row[i].league;
            //team_id
            var teamId = resp.team_all_season.queryResults.row[i].team_id;
            //generate the innerHTML 
            teamCard(Name, teamName, venueName, league, i);
            //add click event handler to team card
            clickTeam(i, teamId, rosterYear);
        }
    });
}

function teamCard(Name, teamName, venueName, league, i) {
    $("#data").append("<div class=\"card bg-dark\">    \n    <div class=\"card-body bg-light team-card" + i + "\">    \n        <div class=\"row\">\n            <div class=\"col-4\">\n                <p class=\"card-text text-body name\">" + Name + "</p>\n            </div>\n            <div class=\"col-8\">\n                <p class=\"text-body cust-card-text-right\">" + teamName + "</p>\n            </div>\n        </div>\n        <div class=\"row\">                                \n            <div class = \"col-10\">\n                <p class=\"card-text text-body\">" + venueName + "</p>\n            </div>\n            <div class = \"col-2\">\n                <p class=\"card-text text-body cust-card-text-right\">" + league + "</p>\n            </div>\n        </div>\n\n    </div>\n</div>\n</div>");
};

function clickTeam(i, teamId, rosterYear) {
    $(".team-card" + i).on("click", function () {

        $(this).removeClass("bg-light");
        $(this).addClass("bg-info");

        //temporary - sends team name to alert - modify this to pass data to next function to generate roster data
        alert($(this).find(".name").text());
        //clear div
        data.innerHTML = "";

        getRoster(teamId, rosterYear);
    });
}

function getRoster(teamID, rosterYear) {

    //call roster api    
    return fetch('http://lookup-service-prod.mlb.com/json/named.roster_team_alltime.bam?start_season=' + rosterYear + '&end_season=' + rosterYear + '&team_id=' + teamID).then(function (response) {
        return response.json();
    }).then(function (resp) {
        //get total array size
        var totalSize = resp.roster_team_alltime.queryResults.totalSize;

        for (var i = 0; i < totalSize; i++) {
            //player_id
            var playerName = resp.roster_team_alltime.queryResults.row[i].name_first_last;
            primary_position;
            throws;
            bats;
            jersey_number: playerCard(i, playerName);
        }
    });
}

function playerCard(i, playerName) {

    $("#data").append("<div class=\"card bg-dark\">    \n    <div class=\"card-body bg-light team-card" + i + "\">    \n        <div class=\"row\">\n            <div class=\"col-4\">\n                <p class=\"card-text text-body name\">" + playerName + "</p>\n            </div>\n            <div class=\"col-8\">\n                <p class=\"text-body cust-card-text-right\">" + "" + "</p>\n            </div>\n        </div>\n        <div class=\"row\">                                \n            <div class = \"col-10\">\n                <p class=\"card-text text-body\">" + "" + "</p>\n            </div>\n            <div class = \"col-2\">\n                <p class=\"card-text text-body cust-card-text-right\">" + "" + "</p>\n            </div>\n        </div>\n\n    </div>\n</div>\n</div>");
}