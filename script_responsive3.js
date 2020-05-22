var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// script file for responsive2.html
// js.react
// babel > jsx

/* Things TODO
    - add a back button
    - add sort by 
        position type
        primary position

    - add filter by
        position type
        primary position

    - look into using these premade react components https://material-ui.com/components/badges/

*/

//typically new react apps have a single app component at the very top

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App(props) {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        _this.state = {
            drillDown: 'searchYear',
            data: [] };
        _this.handleTeamClick = _this.handleTeamClick.bind(_this);
        _this.handlePlayerClick = _this.handlePlayerClick.bind(_this);
        _this.handleSubmit = _this.handleSubmit.bind(_this);

        //states to move through the levels of drill down
        //searchYear
        //selectTeam
        //selectPlayer
        //viewPlayerStats
        return _this;
    }

    _createClass(App, [{
        key: 'handleTeamClick',
        value: function handleTeamClick(teamID) {
            //alert('You clicked on the '+team);
            this.getPlayers(teamID);
        }
    }, {
        key: 'handlePlayerClick',
        value: function handlePlayerClick(playerID) {
            this.getPlayer(playerID);
        }
    }, {
        key: 'handleSubmit',
        value: function handleSubmit(event) {
            console.log('Submit handled');
            this.getTeams();
            event.preventDefault();
        }
    }, {
        key: 'getTeams',
        value: function getTeams() {
            var _this2 = this;

            console.log('Submitteded!');
            var rosterYear = document.getElementById('RosterYear').value;
            fetch('https://lookup-service-prod.mlb.com/json/named.team_all_season.bam?sport_code=%27mlb%27&all_star_sw=%27N%27&sort_order=name_asc&season=%27' + rosterYear + '%27').then(function (prom) {
                return prom.json();
            }).then(function (data) {
                _this2.setState({
                    drillDown: 'selectTeam',
                    data: data.team_all_season.queryResults.row
                });
            }).catch(function (err) {
                return console.log('Error: ' + err);
            });
        }
    }, {
        key: 'getPlayers',
        value: function getPlayers(teamID) {
            var _this3 = this;

            var rosterYear = document.getElementById('RosterYear').value;
            console.log(rosterYear);
            fetch('https://lookup-service-prod.mlb.com/json/named.roster_team_alltime.bam?start_season=%27' + 2016 + '%27&end_season=%27' + 2016 + '%27&team_id=%27' + teamID + '%27').then(function (response) {
                return response.json();
            }).then(function (data) {
                _this3.setState({
                    drillDown: 'selectPlayer',
                    data: data.roster_team_alltime.queryResults.row
                });
            }).catch(function (err) {
                return console.log('Error: ' + err);
            });
        }
    }, {
        key: 'getPlayer',
        value: function getPlayer(playerID) {
            var _this4 = this;

            console.log('playerid: ' + playerID);

            var rosterYear = document.getElementById('RosterYear').value;

            //TODO - rewrite these as `https://${variable}`
            //fetches
            //player info          http://lookup-service-prod.mlb.com/json/named.player_info.bam?sport_code=%27mlb%27&player_id=%27493316%27
            var playerInfoAPI = 'https://lookup-service-prod.mlb.com/json/named.player_info.bam?sport_code=%27mlb%27&player_id=%27' + playerID + '%27';

            //season hitting http://lookup-service-prod.mlb.com/json/named.sport_hitting_tm.bam?league_list_id=%27mlb%27&game_type=%27R%27&season=%272017%27&player_id=%27493316%27
            var seasonHittingAPI = 'https://lookup-service-prod.mlb.com/json/named.sport_pitching_tm.bam?league_list_id=%27mlb%27&game_type=%27R%27&season=%27\'' + rosterYear + '%27&player_id=%' + playerID + '%27';

            //season pitching http://lookup-service-prod.mlb.com/json/named.sport_pitching_tm.bam?league_list_id=%27mlb%27&game_type=%27R%27&season=%272017%27&player_id=%27592789%27
            var seasonPitchingAPI = 'https://lookup-service-prod.mlb.com/json/named.sport_pitching_tm.bam?league_list_id=%27mlb%27&game_type=%27R%27&season=%27' + rosterYear + '%27&player_id=%' + playerID + '%27';

            //career hitting 'http://lookup-service-prod.mlb.com/json/named.sport_career_hitting.bam?league_list_id=%27mlb%27&game_type=%27R%27&player_id=%'+playerID+'%27'
            var careerHittingAPI = 'https://lookup-service-prod.mlb.com/json/named.sport_career_hitting.bam?league_list_id=%27mlb%27&game_type=%27R%27&player_id=%' + playerID + '%27';

            //career pitching  http://lookup-service-prod.mlb.com/json/named.sport_career_pitching.bam?league_list_id='mlb'&game_type='R'&player_id='592789'
            var careerPitchingAPI = 'https://lookup-service-prod.mlb.com/json/named.sport_career_pitching.bam?league_list_id=%27mlb%27&game_type=%27R%27&player_id=%' + playerID + '%27';

            //projected hitting https://appac.github.io/mlb-data-api-docs/#stats-data-projected-hitting-stats-get
            var projectedHittingAPI = 'https://appac.github.io/mlb-data-api-docs/#stats-data-projected-hitting-stats-get';

            //projected pitching https://appac.github.io/mlb-data-api-docs/#stats-data-projected-pitching-stats-get
            var projectedPitchingAPI = 'https://lookup-service-prod.mlb.com/json/named.proj_pecota_pitching.bam?season=%27' + rosterYear + '%27&player_id=%27\'' + playerID + '%27';

            fetch(playerInfoAPI).then(function (response) {
                return response.json();
            }).then(function (data) {
                _this4.setState({
                    drillDown: 'playerStats',
                    data: data.player_info.queryResults.row
                });
            }).catch(function (err) {
                return console.log(err);
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this5 = this;

            var drillDown = this.state.drillDown;
            var data = this.state.data;
            var ribbon = void 0;
            var dataDisplay = [];

            //ribbon here is a React Component
            ribbon = React.createElement(Ribbon, {
                onSubmit: this.handleSubmit,
                searchBarID: 'RosterYear',
                label: 'MLB Year'
            });

            switch (drillDown) {
                //TODO here you need to reference teamCard as a component
                case 'searchYear':
                    //TODO depricate this later
                    dataDisplay.push(React.createElement(TeamCards, { name: 'Please Hold' }));

                    break;
                case 'selectTeam':
                    dataDisplay = data.map(function (teamData) {
                        //add other parameters from the JSON here!
                        var name_display_full = teamData.name_display_full,
                            mlb_org_brief = teamData.mlb_org_brief,
                            venue_name = teamData.venue_name,
                            division_abbrev = teamData.division_abbrev,
                            mlb_org_id = teamData.mlb_org_id;


                        return (
                            //and then here!
                            React.createElement(TeamCards, {
                                name: mlb_org_brief,
                                teamName: name_display_full,
                                venueName: venue_name,
                                league: division_abbrev,
                                onClick: function onClick() {
                                    return _this5.handleTeamClick(mlb_org_id);
                                }
                            })
                        );
                    });
                    break;
                case 'selectPlayer':
                    dataDisplay = data.map(function (playerData) {
                        var name_first_last = playerData.name_first_last,
                            throws = playerData.throws,
                            bats = playerData.bats,
                            height_feet = playerData.height_feet,
                            height_inches = playerData.height_inches,
                            player_id = playerData.player_id,
                            position_desig = playerData.position_desig,
                            primary_position = playerData.primary_position,
                            birth_date = playerData.birth_date,
                            jersey_number = playerData.jersey_number;


                        return React.createElement(PlayerCards, {
                            playerName: name_first_last,
                            posDes: position_desig,
                            primPos: primary_position,
                            bats: bats,
                            throws: throws,
                            jerseyNumber: jersey_number,
                            onClick: function onClick() {
                                return _this5.handlePlayerClick(player_id);
                            }
                        });
                    });
                    break;
                case 'playerStats':

                    var inches = data['height_in'];

                    if (inches == null) {
                        console.log('null');
                    };

                    dataDisplay = React.createElement(PlayerStats, {
                        name: data['name_display_first_last'],
                        age: data['age'],
                        ft: data['height_feet'],
                        'in': data['height_inches'],
                        weight: data['weight'],
                        jerseyNumber: data['jersey_number']
                    });

                    break;
            }

            return React.createElement(
                'div',
                null,
                ribbon,
                dataDisplay
            );
        }
    }]);

    return App;
}(React.Component);
/*
class Ribbon extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
                <form className="bg-dark">            
                    <div className="form-row">  
                        <div className="col">
                            <SearchBar
                                label= 'MLB Season'
                                type="year" 
                                className= "form-control"
                                id="RosterYear"
                                placeholder= "Enter a Year" 
                                defaultValue= "2020" 
                            />                                                                          
                        </div>              
                        <div className="col">
                            <div className = "position-absolute mid-center">
                                <SubmitButton
                                    id ={this.props.id} //"btn" 
                                    type={this.props.type} //"button"
                                    className={this.props.className} //"btn btn-primary"
                                    caption={this.props.caption} //"Go"
                                    onClick={this.props.onClick} //DrillDownControl.handleSubmitButtonClick}    
                                />
                            </div>
                            
                        </div>                
                    </div>
                </form>
        )
    }
}
*/

var Ribbon = function (_React$Component2) {
    _inherits(Ribbon, _React$Component2);

    function Ribbon(props) {
        _classCallCheck(this, Ribbon);

        var _this6 = _possibleConstructorReturn(this, (Ribbon.__proto__ || Object.getPrototypeOf(Ribbon)).call(this, props));

        _this6.handleSubmit = function (event) {
            console.log('A value was submitted: ' + _this6.state.value);
            event.preventDefault();
        };

        _this6.state = {
            value: ''
        };
        _this6.handleChange = _this6.handleChange.bind(_this6);
        _this6.handleSubmit = _this6.handleSubmit.bind(_this6);
        return _this6;
    }

    _createClass(Ribbon, [{
        key: 'handleChange',
        value: function handleChange(event) {
            console.log('change handled');

            this.setState({ value: event.target.value });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'form',
                { onSubmit: this.props.onSubmit },
                React.createElement(SearchBar, {
                    label: this.props.label,
                    value: this.state.value,
                    onChange: this.handleChange,
                    id: this.props.searchBarID

                }),
                React.createElement(SubmitButton, null)
            );
        }
    }]);

    return Ribbon;
}(React.Component);

var TeamCards = function (_React$Component3) {
    _inherits(TeamCards, _React$Component3);

    function TeamCards(props) {
        _classCallCheck(this, TeamCards);

        return _possibleConstructorReturn(this, (TeamCards.__proto__ || Object.getPrototypeOf(TeamCards)).call(this, props));
    }

    _createClass(TeamCards, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { className: 'card bg-dark', onClick: this.props.onClick },
                React.createElement(
                    'div',
                    { className: 'card-body bg-light team-card' },
                    React.createElement(
                        'div',
                        { className: 'row' },
                        React.createElement(
                            'div',
                            { className: 'col-4' },
                            React.createElement(
                                'p',
                                { className: 'card-text text-body name' },
                                this.props.name
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'col-8' },
                            React.createElement(
                                'p',
                                { className: 'text-body cust-card-text-right' },
                                this.props.teamName
                            )
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'row' },
                        React.createElement(
                            'div',
                            { className: 'col-9' },
                            React.createElement(
                                'p',
                                { className: 'card-text text-body' },
                                this.props.venueName
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'col-3' },
                            React.createElement(
                                'p',
                                { className: 'card-text text-body cust-card-text-right' },
                                this.props.league
                            )
                        )
                    )
                )
            );
        }
    }]);

    return TeamCards;
}(React.Component);

var PlayerCards = function (_React$Component4) {
    _inherits(PlayerCards, _React$Component4);

    function PlayerCards(props) {
        _classCallCheck(this, PlayerCards);

        return _possibleConstructorReturn(this, (PlayerCards.__proto__ || Object.getPrototypeOf(PlayerCards)).call(this, props));
    }

    _createClass(PlayerCards, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { className: 'card bg-dark', onClick: this.props.onClick },
                React.createElement(
                    'div',
                    { className: 'card-body bg-light team-card' },
                    React.createElement(
                        'div',
                        { className: 'row' },
                        React.createElement(
                            'div',
                            { className: 'col-5' },
                            React.createElement(
                                'p',
                                { className: 'card-text text-body' },
                                this.props.playerName
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'col-3' },
                            React.createElement(
                                'p',
                                { className: 'card-text text-body cust-card-text-right' },
                                this.props.posDes.toLowerCase(),
                                ' '
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'col-2' },
                            React.createElement(
                                'p',
                                { className: 'card-text text-body cust-card-text-right' },
                                this.props.primPos
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'col-2' },
                            React.createElement(
                                'p',
                                { className: 'card-text text-body cust-card-text-right' },
                                '#',
                                this.props.jerseyNumber
                            )
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'row' },
                        React.createElement(
                            'div',
                            { className: 'col-10' },
                            React.createElement('p', { className: 'card-text text-body' })
                        ),
                        React.createElement(
                            'div',
                            { className: 'col-2' },
                            React.createElement('p', { className: 'card-text text-body cust-card-text-right' })
                        )
                    )
                )
            );
        }
    }]);

    return PlayerCards;
}(React.Component);

var PlayerStats = function (_React$Component5) {
    _inherits(PlayerStats, _React$Component5);

    function PlayerStats(props) {
        _classCallCheck(this, PlayerStats);

        return _possibleConstructorReturn(this, (PlayerStats.__proto__ || Object.getPrototypeOf(PlayerStats)).call(this, props));
    }

    _createClass(PlayerStats, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { className: 'card bg-dark', onClick: this.props.onClick },
                React.createElement(
                    'div',
                    { className: 'card-body bg-light team-card' },
                    React.createElement(
                        'div',
                        { className: 'row' },
                        React.createElement(
                            'div',
                            { className: 'col-4' },
                            React.createElement(
                                'p',
                                { className: 'card-text text-body' },
                                this.props.name
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'col-2' },
                            React.createElement(
                                'p',
                                { className: 'card-text text-body cust-card-text-right' },
                                this.props.age,
                                '"'
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'col-2' },
                            React.createElement(
                                'p',
                                { className: 'card-text text-body cust-card-text-right' },
                                this.props.ft,
                                '\' ',
                                this.props.in,
                                '"'
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'col-2' },
                            React.createElement(
                                'p',
                                { className: 'card-text text-body cust-card-text-right' },
                                this.props.weight,
                                ' lbs'
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'col-2' },
                            React.createElement(
                                'p',
                                { className: 'card-text text-body cust-card-text-right' },
                                '#',
                                this.props.jerseyNumber
                            )
                        )
                    )
                )
            );
        }
    }]);

    return PlayerStats;
}(React.Component);

function SearchBar(props) {
    return React.createElement(
        'label',
        null,
        props.label,
        React.createElement('input', {
            type: props.type //"number"
            // name={props.name}
            , value: props.value,
            onChange: props.onChange,
            className: props.className //"form-control" 
            , id: props.id //"RosterYear" 
            , placeholder: props.placeholder //"Enter a Year" 
            , defaultValue: props.defaultValue //"2020" 
        })
    );
}

function SubmitButton(props) {
    return (
        /* <input
             id ={props.id} //"btn" 
             type={props.type} //"
             className={props.className} //"btn btn-primary"
             onClick={props.onClick}
         > 
             {props.caption} 
         </input>
         */
        React.createElement('input', { type: 'submit', value: 'Submit' })
    );
}

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));