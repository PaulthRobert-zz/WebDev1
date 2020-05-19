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

        _this.state = {
            drillDown: 'searchYear',
            data: [] };
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
            this.getTeams();
        }
    }, {
        key: 'handleTeamClick',
        value: function handleTeamClick() {
            alert('You clicked a team');
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {}
    }, {
        key: 'getTeams',
        value: function getTeams() {
            var _this2 = this;

            console.log('you got the teams');
            var rosterYear = document.getElementById('RosterYear').value;

            fetch('https://lookup-service-prod.mlb.com/json/named.team_all_season.bam?sport_code=%27mlb%27&all_star_sw=%27N%27&sort_order=name_asc&season=%27' + rosterYear + '%27').then(function (prom) {
                return prom.json();
            }).then(function (data) {
                var teamData = data.team_all_season.queryResults.row;
                //console.log(teamData);
                //console.log(teamData.length);       
                //teamCards.push(<TeamCards name='Paul'/>); 

                //data is the array response from MLB
                //loop through data with a map function and built the team cards
                /*teamCards = teamData.map((data)=>{                                                        
                    console.log(data.name_display_full);
                    return <TeamCards name='paul' />;
                 */
                _this2.setState({
                    drillDown: 'selectTeam',
                    data: data.team_all_season.queryResults.row
                });
            }).catch(function (err) {
                return console.log('Error: ' + err);
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var drillDown = this.state.drillDown;
            var data = this.state.data;
            var ribbon = void 0;
            var teamCards = [];

            //ribbon here is a React Component
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
                //TODO here you need to reference teamCard as a component
                case 'searchYear':
                    //TODO depricate this later
                    teamCards.push(React.createElement(TeamCards, { name: 'Please Hold' }));

                    break;
                case 'selectTeam':

                    /*               let rosterYear = document.getElementById('RosterYear').value
                        
                        fetch('https://lookup-service-prod.mlb.com/json/named.team_all_season.bam?sport_code=%27mlb%27&all_star_sw=%27N%27&sort_order=name_asc&season=%27'+rosterYear+'%27')
                            .then(prom =>prom.json())
                            .then(data => {  
                               let teamData=data.team_all_season.queryResults.row;
                                //console.log(teamData);
                                //console.log(teamData.length);       
                                //teamCards.push(<TeamCards name='Paul'/>); 
                                  //data is the array response from MLB
                                //loop through data with a map function and built the team cards
                                teamCards = teamData.map((data)=>{                                                        
                                    console.log(data.name_display_full);
                                    return <TeamCards name='paul' />;                            
                            });
                                
                            })
                            .catch(err => console.log('Error: '+err));
                    */
                    /*
                        // learning lists w/ map in react
                        const numbers = [1,2,3,4,5]
                        const doubled = numbers.map((number)=>number*2);
                        console.log('doubled: '+doubled)
                        
                        //BE CAREFUL USING CURLY BRACES ON THE ARROW FUNCTION *** IF YOU DO YOU MUST RETURN!
                        listitems = doubled.map((number) =>{
                           return <li>{number}</li>
                    })
                    */
                    teamCards = data.map(function (teamData) {
                        var name_display_full = teamData.name_display_full;


                        return React.createElement(TeamCards, {
                            name: name_display_full
                        });
                    });
                    //teamCards=<h4>CATS</h4>
                    break;
            }

            //console.log(teamCards);

            return React.createElement(
                'div',
                null,
                ribbon,
                teamCards
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
                            placeholder: 'Enter a Year',
                            defaultValue: '2020'
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

    return TeamCards;
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

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));