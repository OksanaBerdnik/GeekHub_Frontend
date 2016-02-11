images = ['images/1.jpg', 'images/2.jpg', 'images/3.jpg', 'images/4.jpg', 'images/5.jpg', 'images/6.jpg', 'images/7.jpg', 'images/8.jpg'];

descriptions = ['Image 1', 'Image 2', 'Image 3', 'Image 4', 'Image 5', 'Image 6', 'Image 7', 'Image 8'];

links = ['#', '#', '#', '#', '#', '#', '#', '#'];

ThumbnailNum = 6; //number of thumbnails showing

$(document).ready(function() {

    //adding images to the thumbnails
    $.each(images, function(index, value) {
        $('#imageHolder').append('<img src="' + value + '" />');
    });
    
    //set the margin right on the thumbnail images
    $('#imageHolder img').css('margin-right', ($('#window').width() - ($('#imageHolder img').width()*ThumbnailNum))/ThumbnailNum);
    
     //setting the width of the imageHolder
    $('#imageHolder').css('width', images.length * ($('#imageHolder img').width()+parseInt($('#imageHolder img').css('margin-right'))+1));

    beginNow = setInterval(forwardImage, 4000);
    //adding first description
    $('#description').html(descriptions[0]);
    $('#slideshowA').attr('href', links[0]);    


    //Hovering Over Thumbnail Navigation
    $('.thumbnailArrows').click(function() {
        var whiches = $(this).children('img').attr('id');
        var windowWid = $('#window').width();
        //get left position
        var pos = $('#imageHolder').position();
        var posi = pos.left;
        //if clicked left arrow
        if (whiches == 'Tleft'){
            if (posi == 0){
                //do nothing
            } else {
                $('#imageHolder').animate({
                    left: posi+windowWid,
                });
                //$('#imageHolder').css('left', posi+windowWid);
            }
        }
        else {
            if ($('#imageHolder').width() <= windowWid+Math.abs(posi)){
                //do nothing;
            } else {
                 $('#imageHolder').animate({
                    left: posi-windowWid,
                });
                //$('#imageHolder').css('left', posi-windowWid);
            }
        }
    });


    //Clicking Thumbnail functionality
    $('#imageHolder img').click(function() {
        var newImage = $(this).attr('src');
        $.each(images, function(index, value) {
            if (value == newImage) {
                descriptionChange(index);
                changeImage(index);
            }
        });
        // comment out line below to keep slideshow moving
        clearInterval(beginNow);
    });


    //function for sliding Description in
    $('#holder').hover(function() {
        $('#description, #descriptionBack').animate({
            bottom: 0,
        }, {
            duration: 400,
            queue: false
        });
    }, function() {
        $('#description, #descriptionBack').animate({
            bottom: -40,
        }, {
            duration: 400,
            queue: false
        });
    });


    //function for changing the description

    function descriptionChange(newDescript) {
        $('#description').stop().animate({
            opacity: 0,
        }, 200, function() {
            $('#description').html(descriptions[newDescript]);
            $('#description').animate({
                opacity: 1,
            }, 200)
        })
    }


    $('#leftArrow').click(function() {
        clearInterval(beginNow);
        backwardsImage();
    });

    $('#rightArrow').click(function() {
        clearInterval(beginNow);
        forwardImage();
    });

    //function for fading in and out the arrows
    $('#leftArrowD, #rightArrowD').hover(function() {
        $(this).stop().animate({
            opacity: 1,
        })
    }, function() {
        $(this).stop().animate({
            opacity: 0,
        })
    })


    //This function will find the key for the current Image

    function currentImageKey() {
        i = jQuery.inArray($('#slideshow').attr('src'), images);
        return i;
    }


    //This function will move the slideshow backwards one

    function backwardsImage() {
        currentImageKey();
        if (i == 0) {
            changeImage(images.length - 1);
        } else {
            changeImage(i - 1);
        }
        descriptionChange(i - 1);
        checkArrows(i - 1);
    }


    //This function will move the slideshow forward one

    function forwardImage() {
        currentImageKey();
        if (i < images.length - 1) {
            changeImage(i + 1);
            descriptionChange(i + 1);
        } else {
            changeImage(0);
        }
        checkArrows(i + 1);
    }

    //this function checks the arrows                  

  


    //This function will change to image to whatever the variable i passes to it

    function changeImage(i) {
        $('#slideshow').stop().animate({
            opacity: 0,
        }, 200, function() {
            $('#slideshow').attr('src', images[i]);
            $('#slideshowA').attr('href', links[i]);
            $('#holder img').load(function() {
                $('#slideshow').stop().animate({
                    opacity: 1,
                }, 200)
            })
        })
    }

});