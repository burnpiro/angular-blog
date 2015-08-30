angular.module('app.article').
    directive('articleDirective', ['FileService', articleDirective]);

function articleDirective() {
    return {
        restrict: 'E',
        templateUrl: 'components/article/article.directive.html',
        scope: {
            articleData: '=articleData'
        },
        controller: function($scope, FileService) {
            // disable/enable scroll (mousewheel and keys) from http://stackoverflow.com/a/4770179
            // left: 37, up: 38, right: 39, down: 40,
            // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
            var keys = [32, 37, 38, 39, 40], wheelIter = 0;

            $scope.getImageLink = FileService.getImageLink;

            $('#articleContent').html($scope.articleData.content);

            $scope.status = {
                notrans: false,
                modify: false
            };

            self.preventDefault = function(e) {
                e = e || window.event;
                if (e.preventDefault)
                    e.preventDefault();
                e.returnValue = false;
            };

            self.keydown = function(e) {
                for (var i = keys.length; i--;) {
                    if (e.keyCode === keys[i]) {
                        preventDefault(e);
                        return;
                    }
                }
            };

            self.touchmove = function(e) {
                //preventDefault(e);
            };

            self.disable_scroll = function() {
                document.onkeydown = self.keydown;
                document.body.ontouchmove = self.touchmove;
            };

            self.enable_scroll = function() {
                window.onmousewheel = document.onmousewheel = document.onkeydown = document.body.ontouchmove = null;
            };

            var docElem = window.document.documentElement,
                scrollVal,
                isRevealed,
                noscroll,
                isAnimating,
                container = document.getElementById( 'article-container');

            self.scrollY = function() {
                return window.pageYOffset || docElem.scrollTop;
            };

            self.scrollPage = function() {
                scrollVal = self.scrollY();

                if( noscroll ) {
                    if( scrollVal < 0 ) return false;
                    // keep it that way
                    window.scrollTo( 0, 0 );
                }

                if($scope.status.notrans) {
                    $scope.status.notrans = false;
                    return false;
                }

                if( isAnimating ) {
                    return false;
                }

                if( scrollVal <= 0 && isRevealed ) {
                    self.toggle(0);
                }
                else if( scrollVal > 0 && !isRevealed ){
                    self.toggle(1);
                }
                $scope.$apply();
            };

            $scope.toggle = self.toggle = function( reveal ) {
                isAnimating = true;

                if( reveal ) {
                    $scope.status.modify = true;
                }
                else {
                    noscroll = true;
                    self.disable_scroll();
                    $scope.status.modify = false;
                }

                // simulating the end of the transition:
                setTimeout( function() {
                    isRevealed = !isRevealed;
                    isAnimating = false;
                    if( reveal ) {
                        noscroll = false;
                        self.enable_scroll();
                    }
                }, 600 );
            };

            // refreshing the page...
            var pageScroll = self.scrollY();
            noscroll = pageScroll === 0;

            self.disable_scroll();

            if( pageScroll ) {
                isRevealed = true;
                $scope.status.notrans = true;
                $scope.status.modify = true;
            }

            $(document).scroll(self.scrollPage);
        }
    };
}