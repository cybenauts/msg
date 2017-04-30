//#####################-- pull to refresh --##########################
var myScroll,
    pullDownEl, pullDownOffset,
    pullUpEl, pullUpOffset,
    generatedCount = 0;

function pullDownAction() {
    // setTimeout(function () { // <-- Simulate network congestion, remove setTimeout from production!
    //     var el, li, i;
    //     el = document.getElementById('dataFeed');

    //     for (i = 0; i < 3; i++) {
    //         li = document.createElement('li');
    //         li.innerText = 'Generated row ' + (++generatedCount);
    //         el.insertBefore(li, el.childNodes[0]);
    //     }

    //     myScroll.refresh();      // Remember to refresh when contents are loaded (ie: on ajax completion)
    // }, 1000);    // <-- Simulate network congestion, remove setTimeout from production!
    if (currentPage === 0) {
        dataFeedRefreshPrevious();
    } else {
        fetchGroupHomePostPrevious();
    }

}

function pullUpAction() {
    // setTimeout(function () { // <-- Simulate network congestion, remove setTimeout from production!
    //     var el, li, i;
    //     el = document.getElementById('dataFeed');

    //     for (i = 0; i < 3; i++) {
    //         li = document.createElement('li');
    //         li.innerText = 'Generated row ' + (++generatedCount);
    //         el.appendChild(li, el.childNodes[0]);
    //     }

    //     myScroll.refresh();      // Remember to refresh when contents are loaded (ie: on ajax completion)
    // }, 1000);    // <-- Simulate network congestion, remove setTimeout from production!

    if (currentPage === 0) {
        offsetHome += 10;
        dataFeedRefreshNext(offsetHome);
    } else {
        offsetGroupHome += 10;
        fetchGroupHomePostNext(offsetGroupHome);
    }

}

function loaded() {
    pullDownEl = document.getElementById('pullDown');
    pullDownOffset = pullDownEl.offsetHeight;
    pullUpEl = document.getElementById('pullUp');
    pullUpOffset = pullUpEl.offsetHeight;

    myScroll = new iScroll('wrapper', {
        useTransition: true,
        topOffset: pullDownOffset,
        onRefresh: function() {
            if (pullDownEl.className.match('loading')) {
                pullDownEl.className = '';
                pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Pull down to refresh...';
                document.getElementById("preLoader").style.display = 'none';
            } else if (pullUpEl.className.match('loading')) {
                pullUpEl.className = '';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Pull up to load more...';
                document.getElementById("postLoader").style.display = 'none';
            }
        },
        onScrollMove: function() {
            if (this.y > 5 && !pullDownEl.className.match('flip')) {
                pullDownEl.className = 'flip';
                pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Release to refresh...';
                document.getElementById("preLoader").style.display = 'block';
                this.minScrollY = 0;
            } else if (this.y < 5 && pullDownEl.className.match('flip')) {
                pullDownEl.className = '';
                pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Pull down to refresh...';
                document.getElementById("preLoader").style.display = 'none';
                this.minScrollY = -pullDownOffset;
            } else if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
                pullUpEl.className = 'flip';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Release to refresh...';
                document.getElementById("postLoader").style.display = 'block';
                this.maxScrollY = this.maxScrollY;
            } else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
                pullUpEl.className = '';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Pull up to load more...';
                document.getElementById("postLoader").style.display = 'none';
                this.maxScrollY = pullUpOffset;
            }
        },
        onScrollEnd: function() {
            if (pullDownEl.className.match('flip')) {
                pullDownEl.className = 'loading';
                pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Loading...';
                document.getElementById("preLoader").style.display = 'block';
                pullDownAction(); // Execute custom function (ajax call?)
            } else if (pullUpEl.className.match('flip')) {
                pullUpEl.className = 'loading';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Loading...';
                document.getElementById("postLoader").style.display = 'block';
                pullUpAction(); // Execute custom function (ajax call?)
            }
        }
    });

    setTimeout(function() { document.getElementById('wrapper').style.left = '0'; }, 800);
}
var eventSet=false;
document.addEventListener('touchmove', function(e) { e.preventDefault(); }, false);

document.addEventListener('DOMContentLoaded', function() { setTimeout(loaded, 200); }, false);

document.getElementById('groupList').addEventListener('touchmove', function(e){e.stopPropagation();}, false);
document.getElementById('shareList').addEventListener('touchmove', function(e){e.stopPropagation();}, false);
document.getElementById('listingContact').addEventListener('touchmove', function(e){e.stopPropagation();}, false);

// $(document).on('touchmove',function(e){
//     if(!$('#groupList').has($(e.target)).length)
//         e.preventDefault();
//     if(!$('#shareList').has($(e.target)).length)
//         e.preventDefault();
// });