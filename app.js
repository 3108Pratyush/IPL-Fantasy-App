// app.js

angular.module('iplFantasyLeague', [
    'ui.router'
  ])
  
  .config(function($stateProvider, $urlRouterProvider) {
  
    // Set up the states for the app
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'views/home.html',
        controller: 'HomeController'
      })
      .state('myteam', {
        url: '/myteam',
        templateUrl: 'views/myteam.html',
        controller: 'MyTeamController'
      })
      .state('players', {
        url: '/players',
        templateUrl: 'views/players.html',
        controller: 'PlayersController'
      })
      .state('fixtures', {
        url: '/fixtures',
        templateUrl: 'views/fixtures.html',
        controller: 'FixturesController'
      })
      .state('leaderboard', {
        url: '/leaderboard',
        templateUrl: 'views/leaderboard.html',
        controller: 'LeaderboardController'
      })
      .state('rules', {
        url: '/rules',
        templateUrl: 'views/rules.html',
        controller: 'RulesController'
      });
  
    // Set the default state
    $urlRouterProvider.otherwise('/home');
  
  })
  
  // Define the navbar component
  .component('navbar', {
    templateUrl: 'views/navbar.html',
    controller: 'NavbarController'
  })
  
  // Define the team service
  .service('TeamService', function() {
    var team = [];
    return {
      getTeam: function() {
        return team;
      },
      addToTeam: function(player) {
        team.push(player);
      },
      removeFromTeam: function(player) {
        var index = team.indexOf(player);
        if (index !== -1) {
          team.splice(index, 1);
        }
      }
    };
  })
  
  // Define the players service
  .service('PlayersService', function($http) {
    return {
      getPlayers: function() {
        return $http.get('/api/players');
      }
    };
  })
  
  // Define the players controller
  .controller('PlayersController', function($scope, PlayersService, TeamService) {
    PlayersService.getPlayers().then(function(response) {
      $scope.players = response.data;
    });
    $scope.addToTeam = function(player) {
      TeamService.addToTeam(player);
    };
    $scope.removeFromTeam = function(player) {
      TeamService.removeFromTeam(player);
    };
  })
  
  // Define the home controller
  .controller('HomeController', function($scope) {
    $scope.message = 'Welcome to IPL Fantasy League';
  })
  
  // Define the myteam controller
  .controller('MyTeamController', function($scope, TeamService) {
    $scope.team = TeamService.getTeam();
  })
  
  // Define the navbar controller
  .controller('NavbarController', function($scope) {
    $scope.menu = [{
      state: 'home',
      title: 'Home'
    }, {
      state: 'myteam',
      title: 'My Team'
    }, {
      state: 'players',
      title: 'Players'
    }, {
      state: 'fixtures',
      title: 'Fixtures'
    }, {
      state: 'leaderboard',
      title: 'Leaderboard'
    }, {
      state: 'rules',
      title: 'Rules'
    }];
  })
  
// Define the fixtures controller
.controller('FixturesController', function($scope) {
    $scope.fixtures = [{
    date: '21 May 2023',
    teams: 'Mumbai Indians vs Chennai Super Kings',
    venue: 'Wankhede Stadium, Mumbai'
    }, {
    date: '22 May 2023',
    teams: 'Royal Challengers Bangalore vs Kolkata Knight Riders',
    venue: 'M. Chinnaswamy Stadium, Bangalore'
    }, {
    date: '23 May 2023',
    teams: 'Delhi Capitals vs Rajasthan Royals',
    venue: 'Arun Jaitley Stadium, Delhi'
    }, {
    date: '24 May 2023',
    teams: 'Sunrisers Hyderabad vs Punjab Kings',
    venue: 'Rajiv Gandhi International Stadium, Hyderabad'
    }];
    })
    
    // Define the leaderboard controller
    .controller('LeaderboardController', function($scope) {
    $scope.leaderboard = [{
    rank: 1,
    name: 'John',
    points: 500
    }, {
    rank: 2,
    name: 'Jane',
    points: 450
    }, {
    rank: 3,
    name: 'Bob',
    points: 400
    }];
    })
    
    // Define the rules controller
    .controller('RulesController', function($scope) {
    $scope.rules = [{
    title: 'Team Selection',
    content: 'Each team must have a total of 11 players, including a minimum of 3 bowlers, 2 all-rounders, and 1 wicket-keeper.'
    }, {
    title: 'Points System',
    content: 'Points will be awarded based on the performance of each player in the match. For example, a batsman scoring 1 run will get 1 point, while a bowler taking a wicket will get 25 points.'
    }, {
    title: 'Transfer Window',
    content: 'Each team owner will be allowed 2 transfer windows during the tournament to replace players in their team.'
    }];
    });
  