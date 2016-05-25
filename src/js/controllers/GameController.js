angular.module('bingo.controllers').controller('GameController', ['$scope', '$animate', '$timeout', '$window', function ($scope, $animate, $timeout, $window) {
    $scope.ballSets = [];
    $scope.balls = null;
    $scope.showHistory = true;

    function createNumericBallSet(start, end) {
        var ballSet = "" + start;
        for (var i = start + 1; i <= end; i++)
            ballSet += "," + i;
        return ballSet;
    }

    function resetGame() {
        $scope.latestBall = null;
        $scope.balls = null;
    }

    function init() {
        ballSets = [];
        ballSets.push({ name: "Numbers 1 to 10", balls: createNumericBallSet(1, 10) });
        ballSets.push({ name: "Numbers 1 to 25", balls: createNumericBallSet(1, 25) });
        ballSets.push({ name: "Numbers 1 to 50", balls: createNumericBallSet(1, 50) });
        ballSets.push({ name: "Numbers 1 to 99", balls: createNumericBallSet(1, 99) });
        ballSets.push({ name: "Define your own set" });
        $scope.ballSets = ballSets;
        $scope.ballSet = ballSets[0].balls;
        $scope.customBalls = $scope.ballSet;
    }
    init();

    $scope.setBalls = function (ballSet) {
        var ballValues = ballSet.split(',');
        var balls = [];
        ballValues.forEach(function (ballValue) {
            balls.push({
                hit: false,
                value: ballValue
            });
        });
        $scope.balls = balls;
        $timeout(function () {
            $('.ball div').fitText(0.2);
        }, 10);
    };

    $scope.nextBall = function (balls) {
        var availableBalls = balls.filter(function (ball) {
            return !ball.hit;
        });

        if (availableBalls.length == 0) {
            resetGame();
            return;
        }

        var randomIndex = Math.floor(Math.random() * availableBalls.length);
        var ball = availableBalls[randomIndex];

        $animate.removeClass($('.latest-ball')[0], 'move-to-bottom').then(function () {
            $scope.latestBall = ball;
            $timeout(function () {
                $('.latest-ball .ball div').fitText(0.2);
            }, 10);
            $animate.addClass($('.latest-ball')[0], 'move-to-bottom').then(function() {
                ball.hit = true;
            });
        });
    }

    $scope.reset = function (confirmText) {
        if ($window.confirm(confirmText))
            resetGame();
    }
}]);