const app = angular.module('WikiApp', ['ngAnimate']);
app.controller('MainCtrl', function($scope, $http) {
 
  var search = $("#search");
  var help = $("#help");
  
  $scope.search = function() {
    $scope.results = [];
    help.addClass('hide');
    search.removeClass('fullHeight');
    var title = $scope.searchTxt;
    var api = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
    var cb = '&callback=JSON_CALLBACK';
    var page = 'https://en.wikipedia.org/?curid=';
    
    $http.jsonp(api + title + cb)
    .success(function(data) {
      var results = data.query.pages;
      angular.forEach(results, function(v,k)  {
        $scope.results.push({title: v.title, body: v.extract, page: page + v.pageid})
      })
    });
  }
});