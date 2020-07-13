// script file for responsive3.html
// js.react
// babel > jsx

/* spining up your dev machine - from the project root directory in comandline
    - run babel 
        npx babel --watch js --out-dir . --presets react-app/prod
    - run browsersync
        browser-sync start  --server --files * --index pages/responsive3.html
    

/* Things TODO
    - add a back button
    - add sort by 
        position type
        primary position

    - add filter by
        position type
        primary position

    - at the player level it would be nice to be able to drill down into a stat group and see how they compare to 
        division
        league
        overall

        for that stat group

    - look into using these premade react components https://material-ui.com/components/badges/

*/

//typically new react apps have a single app component at the very top

class App extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            drillDown: 'searchYear',
            data: [], //player data
            seasonHittingData: [],
            seasonPitchingData: [],
            careerHittingData: [],
            careerPitchingData: [],
            projHittingData: [],
            projPitchingData: []
        }
        this.handleTeamClick = this.handleTeamClick.bind(this);
        this.handlePlayerClick = this.handlePlayerClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
        //states to move through the levels of drill down
            //searchYear
            //selectTeam
            //selectPlayer
            //viewPlayerStats
    }

    handleTeamClick(teamID){
        this.getPlayers(teamID)
    }

    handlePlayerClick(playerID){
        this.getPlayer(playerID);
    }

    handleSubmit(event){
        this.getTeams();
        event.preventDefault();
    }

    //TODO change these urls to const variables for clearing code
    getTeams(){
        let rosterYear = document.getElementById('RosterYear').value;                
        fetch(`https://lookup-service-prod.mlb.com/json/named.team_all_season.bam?sport_code=%27mlb%27&all_star_sw=%27N%27&sort_order=name_asc&season=%27${rosterYear}%27`)
            .then(prom =>prom.json())
            .then(data => {  
                this.setState({
                    drillDown: 'selectTeam',
                    data: data.team_all_season.queryResults.row
                });
            })
            .catch(err => console.log('Error: '+err));
    }

    getPlayers(teamID){
        let rosterYear = document.getElementById('RosterYear').value;
        fetch(`https://lookup-service-prod.mlb.com/json/named.roster_team_alltime.bam?start_season=%27${rosterYear-1}%27&end_season=%27${rosterYear}%27&team_id=%27${teamID}%27`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    drillDown: 'selectPlayer',
                    data: data.roster_team_alltime.queryResults.row
                })
            })
            .catch(err => console.log('Error: '+err));
    }

    getPlayer(playerID){
        let rosterYear = document.getElementById('RosterYear').value;
        //Sample PlayerID --> Madison Bumgarner: 518516

        //Define all of the URLS
            //player info          http://lookup-service-prod.mlb.com/json/named.player_info.bam?sport_code=%27mlb%27&player_id=%27493316%27
            const playerInfoAPI = `https://lookup-service-prod.mlb.com/json/named.player_info.bam?sport_code=%27mlb%27&player_id=%27${playerID}%27`
                /*
                    name_nick
                    primary_stat_type
                    status
                */
            
            //season hitting http://lookup-service-prod.mlb.com/json/named.sport_hitting_tm.bam?league_list_id=%27mlb%27&game_type=%27R%27&season=%272017%27&player_id=%27493316%27
            const seasonHittingAPI = `https://lookup-service-prod.mlb.com/json/named.sport_hitting_tm.bam?league_list_id=%27mlb%27&game_type=%27R%27&season=%27${rosterYear}%27&player_id=%27${playerID}%27`
            
            //season pitching 
            const seasonPitchingAPI = `https://lookup-service-prod.mlb.com/json/named.sport_pitching_tm.bam?league_list_id=%27mlb%27&game_type=%27R%27&season=%27${rosterYear}%27&player_id=%27${playerID}%27`
            //Sample PlayerID --> Madison Bumgarner: 518516
            /*
                
               g  - Games
               gs - Games Started
               qs -  Quality Starts
               bqs - Blown Quality Starts
               ip - Innings Pitched
                
                Total Batters
               so - Strike Outs
               bb - Base on Balls 
               np - Total Pitches
               hb - hit batters

               h   - Hits
               db  - Doubles
                Tripples
               hr   - Home Runs
               gs   - Grand Slams
               r    - Runs
               er   - Earned Runs
               gidp - GIDP (ground into douple play)


                bb9 - BB/9
                k9 - k/9 strikes ber inning 
                kbb - strike to walk ratio
                rs9 - rs/9
                h9  - H/9
                hr9 - HR/9
            */

            //career hitting 'http://lookup-service-prod.mlb.com/json/named.sport_career_hitting.bam?league_list_id=%27mlb%27&game_type=%27R%27&player_id=%'+playerID+'%27'
            const careerHittingAPI = `https://lookup-service-prod.mlb.com/json/named.sport_career_hitting.bam?league_list_id=%27mlb%27&game_type=%27R%27&player_id=%27${playerID}%27`
            
            //career pitching  http://lookup-service-prod.mlb.com/json/named.sport_career_pitching.bam?league_list_id='mlb'&game_type='R'&player_id='592789'
            const careerPitchingAPI =`https://lookup-service-prod.mlb.com/json/named.sport_career_pitching.bam?league_list_id=%27mlb%27&game_type=%27R%27&player_id=%27${playerID}%27`
            
            //projected hitting https://appac.github.io/mlb-data-api-docs/#stats-data-projected-hitting-stats-get
            const projectedHittingAPI =`https://lookup-service-prod.mlb.com/json/named.proj_pecota_batting.bam?season=%27${rosterYear}%27&player_id=%27${playerID}%27`
            
            //projected pitching https://appac.github.io/mlb-data-api-docs/#stats-data-projected-pitching-stats-get
            const projectedPitchingAPI = `https://lookup-service-prod.mlb.com/json/named.proj_pecota_pitching.bam?season=%27${rosterYear}%27&player_id=%27${playerID}%27`      

            //initialize and array as a collection of all of the urls
            let urls = [
                playerInfoAPI,
                seasonHittingAPI,
                seasonPitchingAPI,
                careerHittingAPI,
                careerPitchingAPI,
                projectedHittingAPI,
                projectedPitchingAPI
            ]

            //iterate over the array to fetch all of the URLs
            let requests = urls.map(url => fetch(url));

            //use promises.all to wait for a response from all of the fetch promises
           Promise.all(requests)
            .then(function (responses) {
                return Promise.all(responses.map(function (response) {
                    return response.json()
                }))
            })
            .then(data => {
               console.log(data)
                this.setState({
                    drillDown: 'playerStats',
                    data:               data[0].player_info.queryResults.row,
                    seasonHittingData:  data[1].sport_hitting_tm.queryResults.row,
                    seasonPitchingData: data[2].sport_pitching_tm.queryResults.row,
                    careerHittingData:  data[3].sport_career_hitting.queryResults.row,
                    careerPitchingData: data[4].sport_career_pitching.queryResults.row,
                    projHittingData:    data[5].proj_pecota_batting.queryResults.row,
                    projPitchingData:   data[6].proj_pecota_pitching.queryResults.row
                })
            })
            .catch(error => console.log(`error: ${error}`))        
    }
    
    render(){
        const drillDown= this.state.drillDown;
        const data = this.state.data;
        const seasonPitchingData = this.state.seasonPitchingData;
        let ribbon;
        let dataDisplay = [];

        //ribbon here is a React Component
        ribbon=
        <Ribbon
            //Search bar props
            onSubmit= {this.handleSubmit}

           // parentDivClassName='form-group'
            labelFor='MLB Roster Year'            
            label= 'MLB Year'
            searchBartype='number'
            searchBarClassName='form-control'
            searchBarID='RosterYear'
            //placeholder=
            defaultValue='2018'
            

            //Submit Button props
            buttonClassName='btn btn-primary mb-2'
            />

        switch(drillDown){
            //TODO here you need to reference teamCard as a component
            case 'searchYear':
                //TODO depricate this later
                dataDisplay.push(<div></div>)

            break;
            case 'selectTeam':
                dataDisplay = data.map((teamData)=>{
                    //add other parameters from the JSON here!
                    const{
                            name_display_full,
                            mlb_org_brief,
                            venue_name,
                            division_abbrev,
                            mlb_org_id
                        } = teamData;
                    
                    return(
                        //and then here!
                        <TeamCards 
                            name={mlb_org_brief}
                            teamName={name_display_full}
                            venueName={venue_name}
                            league={division_abbrev}
                            onClick={() => this.handleTeamClick(mlb_org_id)}
                            />
                    )
                })
            break;
            case 'selectPlayer':      
                dataDisplay = data.map((playerData)=>{
                    const{
                        name_first_last,
                        throws,
                        bats,
                        height_feet,
                        height_inches,
                        player_id,
                        position_desig,
                        primary_position,
                        birth_date,
                        jersey_number
                    }=playerData;
                    return(
                        <PlayerCards
                            playerName={name_first_last}
                            posDes={position_desig}
                            primPos={primary_position}
                            bats={bats}
                            throws={throws}
                            jerseyNumber={jersey_number}
                            onClick={() => this.handlePlayerClick(player_id)}
                        />
                    )
                })
                break;
                case 'playerStats':    
                const inches = data['height_in']           

                dataDisplay=                         
                    <PlayerStats
                        name= {data['name_display_first_last']}
                        age={data['age']}
                        ft={data['height_feet']}
                        in={inches}
                        weight={data['weight']}
                        jerseyNumber={data['jersey_number']}
  /* 7/13/20 ready to add the props in to display the data, just look it over to get the syntax right for eeach datapoint.                        
  //                      games={seasonPitchingData['g']}
  //                      gamesStarted={seasonPitchingData['gs']}
  //                      qualityStarts={seasonPitchingData['qs']}
  //                      blownQualityStarts={seasonPitchingData['bqs']}
  //                      inningsPitched={seasonPitchingData['ip']}
                                    
                    />
                        
                break;
        }

        return(
            <div>
                {ribbon}
                {dataDisplay}                
            </div>
           )
    }

}

class Ribbon extends React.Component{
    constructor(props){
        super(props);
        this.state={
            value: ''
        };
        this.handleChange= this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        console.log('change handled');

        this.setState({value: event.target.value});
    }

    handleSubmit = (event) => {
        console.log('A value was submitted: '+ this.state.value);
        event.preventDefault();
    }

    render(){
        return(
            <form onSubmit={this.props.onSubmit} id='ribbon'>
                <div id='ribbonContainer'>
                <div className='form-row'>
                    
                
                    <label htmlFor={this.props.labelFor}> {this.props.label} </label>
                </div>
                <div className='form-row'>
                    <div className='form-group col-10'>
                    <SearchBar
                        //Ribbon states and props
                        //  value= {this.state.value} //cannot havea value propand a default value prop specified.(ie controlled vs uncontrolled input)
                        onChange= {this.handleChange}
                        
                        //calling function props
                        searchBartype={this.props.searchBartype}                        
                        searchBarClassName={this.props.searchBarClassName}                      
                        id={this.props.searchBarID}
                        placeholder= {this.props.placeholder}
                        defaultValue={this.props.defaultValue}
                    
                    />
                    </div>
                    <div className='form-group col-2'>
                    <SubmitButton 
                        className={this.props.buttonClassName}
                        />
                    </div>

                
                </div>
           
                    
            </div>
              
               
            </form>
        )}
}


class TeamCards extends React.Component{
    constructor(props){
        super(props);     
    }
    render() {
        return(
            <div className="card mb-1 team-card" onClick={this.props.onClick}>    
                <div className="card-body">    
                    <div className="row">
                        <div className="col-4">
                            <p className="card-text text-body name">{this.props.name}</p>
                        </div>
                        <div className="col-8">
                            <p className="text-body cust-card-text-right">{this.props.teamName}</p>
                        </div>
                    </div>
                    <div className="row">                                
                        <div className = "col-9">
                            <p className="card-text text-body">{this.props.venueName}</p>
                        </div>
                        <div className = "col-3">
                            <p className="card-text text-body cust-card-text-right">{this.props.league}</p>
                        </div>
                    </div>
            
                </div>
            </div>   
        );
    }
}

class PlayerCards extends React.Component{
    constructor(props){
        super(props);     
    }

    render() {
        return(
            <div className="card" onClick={this.props.onClick}>    
                <div className="card-body">    
                    <div className="row">
                        <div className="col-5">
                            <p className="card-text text-body">{this.props.playerName}</p>
                        </div>
                        <div className="col-3">
                            <p className="card-text text-body cust-card-text-right">{this.props.posDes.toLowerCase()} </p>
                        </div>
                        <div className="col-2">
                            <p className="card-text text-body cust-card-text-right">{this.props.primPos}</p>
                        </div>
                        <div className="col-2">
                            <p className="card-text text-body cust-card-text-right">#{this.props.jerseyNumber}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-10">
                            <p className="card-text text-body">{}</p>
                        </div>
                        <div className="col-2">
                            <p className="card-text text-body cust-card-text-right">{}</p>
                        </div>
                    </div>
                </div>
            </div>  
        );
    }
}
class PlayerStats extends React.Component{
    constructor(props){
        super(props);     
    }
    render() {
        return(
            <div className="card bg-dark" onClick={this.props.onClick}>    
                <div className="card-body bg-light team-card">    
                    <div className="row">
                        <div className="col">
                            <p className="card-text text-body">{this.props.name}</p>
                        </div>
                    </div>
                    <div className="row cust-card-text-small">
                        <div className="col-3">
                            <p className="card-text text-body cust-card-text-right">age:</p>
                        </div>                        
                        <div className="col-3">
                            <p className="card-text text-body">{this.props.age}</p>
                        </div>
                        <div className="col-3">
                            <p className="card-text text-body cust-card-text-right">height:</p>
                        </div>                         
                        <div className="col-3">
                            <p className="card-text text-body">{this.props.ft}' {this.props.in}"</p>
                        </div>
                    </div>
                    <div className="row cust-card-text-small">
                    <div className="col-3">
                            <p className="card-text text-body cust-card-text-right">weight:</p>
                        </div>                     
                        <div className="col-3">
                            <p className="card-text text-body">{this.props.weight} lbs</p>
                        </div>
                        <div className="col-3">
                            <p className="card-text text-body cust-card-text-right">jersey:</p>
                        </div>                         
                        <div className="col-3">
                            <p className="card-text">#{this.props.jerseyNumber}</p>
                        </div>
                    </div>
                    <div className="row align-items-start">
                        <div className="col-3">
                            <p className="card-text text-body cust-card-text-small">Games</p>
                        </div>
                        <div className="col-3">
                            <p className="card-text text-body cust-card-text-small">{this.props.games}</p>
                        </div>                        
                        <div className="col-3">
                            <p className="card-text text-body cust-card-text-small">GamesStarted</p>
                        </div>
                        <div className="col-3">
                            <p className="card-text text-body cust-card-text-small">{this.props.gamesStarted}</p>
                        </div>                           
                    </div>
                    <div className="row align-items-start">
                        <div className="col-3">
                            <p className="card-text text-body cust-card-text-small">QualityStarts</p>
                        </div>
                        <div className="col-3">
                            <p className="card-text text-body cust-card-text-small">{this.props.qualityStarts}</p>
                        </div>                           
                        <div className="col-3">
                            <p className="card-text text-body cust-card-text-small">BlownQualityStarts</p>
                        </div>
                        <div className="col-3">
                            <p className="card-text text-body cust-card-text-small">{this.props.blownQualityStarts}         </p>
                        </div>                           
                    </div>
                    <div className="row align-items-start">
                        <div className="col-6">
                            <p className="card-text text-body cust-card-text-small"></p>
                        </div>
                        <div className="col-3">
                            <p className="card-text text-body cust-card-text-small"></p>
                        </div>                           
                        <div className="col-6">
                            <p className="card-text text-body  cust-card-text-small"></p>
                        </div>
                        <div className="col-3">
                            <p className="card-text text-body cust-card-text-small"></p>
                        </div>                           
                    </div>
                    <div className="row align-items-start">
                        <div className="col-6">
                            <p className="card-text text-body cust-card-text-small"></p>
                        </div>
                        <div className="col-3">
                            <p className="card-text text-body cust-card-text-small"></p>
                        </div>                           
                        <div className="col-6">
                            <p className="card-text text-body  cust-card-text-small"></p>
                        </div>
                        <div className="col-3">
                            <p className="card-text text-body cust-card-text-small"></p>
                        </div>                           
                    </div>
                    <div className="row align-items-start">
                        <div className="col-6">
                            <p className="card-text text-body cust-card-text-small"></p>
                        </div>
                        <div className="col-3">
                            <p className="card-text text-body cust-card-text-small"></p>
                        </div>                           
                        <div className="col-6">
                            <p className="card-text text-body  cust-card-text-small"></p>
                        </div>
                        <div className="col-3">
                            <p className="card-text text-body cust-card-text-small"></p>
                        </div>                           
                    </div>
                    <div className="row align-items-start">
                        <div className="col-6">
                            <p className="card-text text-body cust-card-text-small"></p>
                        </div>
                        <div className="col-3">
                            <p className="card-text text-body cust-card-text-small"></p>
                        </div>                           
                        <div className="col-6">
                            <p className="card-text text-body  cust-card-text-small"></p>
                        </div>
                        <div className="col-3">
                            <p className="card-text text-body cust-card-text-small"></p>
                        </div>                           
                    </div>                                                            

                    <div className="row">
                        <div className="col-2">
                            <p className="card-text text-body">{this.props.games}</p>
                        </div>
                        <div className="col-2">
                            <p className="card-text text-body">{this.props.gamesStarted}</p>
                        </div>
                        <div className="col-2">
                            <p className="card-text text-body cust-card-text-right">{this.props.qualityStarts}</p>
                        </div>
                        <div className="col-2">
                            <p className="card-text text-body cust-card-text-right">{this.props.blownQualityStarts}</p>
                        </div>
                        <div className="col-2">
                            <p className="card-text text-body cust-card-text-right">{this.props.inningsPitched}</p>
                        </div>
                        <div className="col-2">
                            <p className="card-text text-body cust-card-text-right">{}</p>
                        </div>
                    </div>
                </div>
            </div>  
        );
    }
}
function SearchBar(props){
    return(

                <input 
                    type={props.searchBartype} //"number"
                   // name={props.name}
                    value={props.value}
                    onChange={props.onChange} 
                    className= {props.searchBarClassName} //"form-control" 
                    id= {props.id} //"RosterYear" 
                    placeholder= {props.placeholder} //"Enter a Year" 
                    defaultValue= {props.defaultValue}         //"2020"
                    aria-describedby= {props.discribedBy}

                />
               
    )
}

function SubmitButton(props){
    return(
        //TODO - pass these down from ribbon and from app

       //<input type="submit" value="Submit" />
        <button 
                type='submit'
                className='btn btn-primary mb-2'
                id="btnOK"
                //value='OK'
            >OK
            </button>
    )
}

ReactDOM.render(
   <App />,
    document.getElementById('root')
)