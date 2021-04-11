var cards = ["card1.png", "card2.png", "card3.png", "card4.png", "card5.png", "card6.png", "card7.png", "card8.png", "card9.png"];
var current = null;
var count = 0;
var run = null;

function shuffle(array) {
    var currentIndex = array.length,
        temp, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        temp = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temp;
    }
}

$(function() {
    cards = cards.concat(cards);
    shuffle(cards);
    var html = '';
    for (var i = 0; i < cards.length; i++) {
        html += '<div class="cards" data-name="' + cards[i] + '" onclick="flip(this)"><div class="back"><img src="img/' + cards[i] + '"/></div><div class="front"><img src="img/back.png"/></div></div>';
    }
    $('#grid').html(html);
});

function start() {
    var bar = document.getElementById("progressBar");
    var width = 100;
    run = setInterval(frame, 1000);
    $('.play-btn').css('display', 'none');
    $('#cover').css('display', 'none');
    $('#timeFrame').css('opacity', 1);

    function frame() {
        //lose
        if (width == 0) {
            clearInterval(run);
            $('#cover').css('display', '');
            $('.lose').css('top', '80px');
            $('.win').css('opacity', 0);
            $('.continue-btn').css('display', 'flex');
            document.getElementById('defeat').play();
        }
        //change bar color as time goes
        else if (width > 0) {
            width -= 2;
            bar.style.width = width + '%';
            if (width >= 67) {
                $('#progressBar').css('background-color', '#2c9e20');
            } else if (width >= 33) {
                $('#progressBar').css('background-color', '#dbc623');
            } else {
                $('#progressBar').css('background-color', '#db0400');
            }
        }
    }
}

function flip(card) {
    $(card).toggleClass('flip');
    $(card).css('pointer-events', 'none');
    if (current == null)
        current = $(card);
    else {
        $('.cards').css('pointer-events', 'none');
        setTimeout(function() {
            //wrong 
            if (current.attr('data-name') != $(card).attr('data-name')) {
                current.toggleClass('flip');
                $(card).toggleClass('flip');
                document.getElementById('wrong').play();
            }
            // correct
            else {
                current.addClass('hidden')
                $(card).addClass('hidden')
                document.getElementById('correct').play();
                count++;
                // win
                if (count == 9) {
                    clearInterval(run);
                    $('#cover').css('display', '');
                    $('.win').css('top', 0);
                    $('.lose').css('opacity', 0);
                    $('.continue-btn').css('display', 'flex');
                    document.getElementById('victory').play();
                }
            }
            current = null;
            $('.cards:not(.hidden)').css('pointer-events', 'auto');
        }, 700);
    }
}

function replay() {
    location.reload();
}