var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// script file for responsive2.html
// js.react
// babel > jsx

//typically new react apps have a single app component at the very top

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App(props) {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        _this.state = { drillDown: 'searchYear' };
        _this.handleSubmitButtonClick = _this.handleSubmitButtonClick.bind(_this);
        _this.handleTeamClick = _this.handleTeamClick.bind(_this);

        //states to move through the levels of drill down
        //searchYear
        //selectTeam
        //selectPlayer
        //viewPlayerStats
        return _this;
    }

    _createClass(App, [{
        key: 'handleSubmitButtonClick',
        value: function handleSubmitButtonClick() {
            this.setState({ drillDown: 'selectTeam' });
        }
    }, {
        key: 'handleTeamClick',
        value: function handleTeamClick() {
            alert('You clicked a team');
        }
    }, {
        key: 'render',
        value: function render() {
            var drillDown = this.state.drillDown;
            var ribbon = void 0;
            var page = void 0;

            ribbon = React.createElement(
                'div',
                null,
                React.createElement(Ribbon, {
                    id: 'btn',
                    type: 'button',
                    className: 'btn btn-primary',
                    caption: 'Go',
                    onClick: this.handleSubmitButtonClick
                })
            );

            switch (drillDown) {
                case 'searchYear':
                    page = React.createElement('div', null);

                    break;
                case 'selectTeam':
                    var rosterYear = document.getElementById('RosterYear').value;

                    var rawData = getTeams(rosterYear); //send the input year to the getTeams function
                    console.log('line 53 - log raw data response from getTeams()');
                    console.log('Roster Year:' + rosterYear);
                    console.log('App.selectTeam.rawData: ' + rawData.then(function (value) {
                        console.log(value);
                    }));

                    //let numbers = [1,2,3,4,5];
                    /*const listItems = datas.map((data)=>
                        <li>{data.mlb_org_brief}</li>
                    */

                    page = React.createElement(
                        'div',
                        null,
                        React.createElement(
                            'ul',
                            null,
                            'Please Hold'
                        )
                    );

                    /*    <div> 
                            <TeamTile
                                onClick={this.handleTeamClick} 
                                name = "Fuz Cats"
                                teamName = 'The Fuzzy Caterpillars'
                                venueName = 'Davis Dirt Ranch'
                                league = 'CF'
                            />
                        </div>
                    */

                    break;
            }

            return React.createElement(
                'div',
                null,
                ribbon,
                page
            );
        }
    }]);

    return App;
}(React.Component);

var Ribbon = function (_React$Component2) {
    _inherits(Ribbon, _React$Component2);

    function Ribbon(props) {
        _classCallCheck(this, Ribbon);

        return _possibleConstructorReturn(this, (Ribbon.__proto__ || Object.getPrototypeOf(Ribbon)).call(this, props));
    }

    _createClass(Ribbon, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'form',
                { className: 'bg-dark' },
                React.createElement(
                    'div',
                    { className: 'form-row' },
                    React.createElement(
                        'div',
                        { className: 'col' },
                        React.createElement(SearchBar, {
                            label: 'MLB Season',
                            type: 'year',
                            className: 'form-control',
                            id: 'RosterYear',
                            placeholder: 'Enter a Year'
                            //defaultValue= "2020" 
                        })
                    ),
                    React.createElement(
                        'div',
                        { className: 'col' },
                        React.createElement(
                            'div',
                            { className: 'position-absolute mid-center' },
                            React.createElement(SubmitButton, {
                                id: this.props.id //"btn" 
                                , type: this.props.type //"button"
                                , className: this.props.className //"btn btn-primary"
                                , caption: this.props.caption //"Go"
                                , onClick: this.props.onClick //DrillDownControl.handleSubmitButtonClick}    
                            })
                        )
                    )
                )
            );
        }
    }]);

    return Ribbon;
}(React.Component);

var TeamTile = function (_React$Component3) {
    _inherits(TeamTile, _React$Component3);

    function TeamTile(props) {
        _classCallCheck(this, TeamTile);

        return _possibleConstructorReturn(this, (TeamTile.__proto__ || Object.getPrototypeOf(TeamTile)).call(this, props));
    }

    _createClass(TeamTile, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { className: 'card bg-dark', onClick: this.props.onClick },
                React.createElement(
                    'div',
                    { className: 'card-body bg-light team-card`+i+`' },
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
                            { className: 'col-10' },
                            React.createElement(
                                'p',
                                { className: 'card-text text-body' },
                                this.props.venueName
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'col-2' },
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

    return TeamTile;
}(React.Component);

function SearchBar(props) {
    return React.createElement(
        'div',
        { className: 'form-group' },
        React.createElement(
            'label',
            null,
            props.label
        ),
        React.createElement('input', {
            type: props.type //"year" 
            , className: props.className //"form-control" 
            , id: props.id //"RosterYear" 
            , placeholder: props.placeholder //"Enter a Year" 
            , defaultValue: props.defaultValue //"2020" 
        })
    );
}

function SubmitButton(props) {
    return React.createElement(
        'button',
        {
            id: props.id //"btn" 
            , type: props.type //"button"
            , className: props.className //"btn btn-primary"
            , onClick: props.onClick
        },
        props.caption
    );
}

function teamGo() {
    alert("Go!");
}

function getTeams(rosterYear) {

    //get mlb team data api
    var teamData = fetch('https://lookup-service-prod.mlb.com/json/named.team_all_season.bam?sport_code=%27mlb%27&all_star_sw=%27N%27&sort_order=name_asc&season=%27' + rosterYear + '%27')
    //.then(response => response.json())
    .then(function (res) {
        return res.json();
    }).then(function (data) {
        return data.team_all_season.queryResults;
    });

    return teamData;
    //.then(teams => console.log(data.team_all_season)))
    //.then(data => console.log(data.team_all_season.queryResults.row))

}

// .then(function(teamData){
//     return teamData.value;

// })
/*.then(function(resp){
    return resp.team_all_season.queryResults.row
})
*/

/*
.then(function(resp){          
      //get total array size
    let totalSize = resp.team_all_season.queryResults.totalSize;
      //loop through the array to populate your html
    for(let i=0; i < totalSize; i++){
        //mlb_org_brief
        let Name=resp.team_all_season.queryResults.row[i].mlb_org_brief;                
        //assign team name to var
        let teamName = resp.team_all_season.queryResults.row[i].name_display_full;
        //venue_name:
        let venueName=resp.team_all_season.queryResults.row[i].venue_name;                
        //league
        let league = resp.team_all_season.queryResults.row[i].league;
        //team_id
        let teamId = resp.team_all_season.queryResults.row[i].team_id;
        //generate the innerHTML 
        teamCard(Name, teamName, venueName, league, i);
        //add click event handler to team card
        clickTeam(i, teamId, rosterYear);                             
    }
})
}
*/

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));