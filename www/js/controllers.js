var app = angular.module('caffeinehit.controllers', []);

app.controller("YelpController", function ($scope, YelpService) {
	$scope.yelp = YelpService;
  $scope.doRefresh = function () {
    if (!$scope.yelp.isLoading) {
      $scope.yelp.refresh().then(function () {
        $scope.$broadcast('scroll.refreshComplete');
      });
    }
  };
  $scope.loadMore = function () {
    if (!$scope.yelp.isLoading && $scope.yelp.hasMore) {
      $scope.yelp.next().then(function () {
        $scope.$broadcast('scroll.infiniteScrollComplete');
      });
    }
  };
  $scope.getDirections = function (cafe) {
    var destination = [
      cafe.location.coordinate.latitude,
      cafe.location.coordinate.longitude
    ];
    var source = [
      $scope.yelp.lat,
      $scope.yelp.lon
    ];
    launchnavigator.isAppAvailable(launchnavigator.APP.GOOGLE_MAPS, function(isAvailable){
      var app;
      if(isAvailable){
        app = launchnavigator.APP.GOOGLE_MAPS;
      }else{
        console.warn("Google Maps not available - falling back to user selection");
        app = launchnavigator.APP.USER_SELECT;
      }
      launchnavigator.navigate(destination, source);
    });
  };
  $scope.openMap = function (cafe) {

  };
});
