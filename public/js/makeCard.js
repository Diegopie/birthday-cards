// * Stores Current Class Being Rendered to Correctly Target and Replace Styles
let currentClass = "note-fest"
// * Default Styling to Send to DB, Listeners Will Update this Value
let dbStyle = ["note-fest", "festival-01.png"]
const imgPath = "/img/card/"

// * Event Listeners For Theme
// ** Festival: Remove Current Styling and Apply Festival Class and Image
$('#fest').click((e) => {
    e.preventDefault();
    // Change Color
    $('#change').removeClass(currentClass);
    $('#change').addClass("note-fest");
    currentClass = "note-fest"; 
    // Change Image
    $('.img').attr('src', imgPath + 'festival-01.png')
    dbStyle = ["note-fest", "festival-01.png"]
});

// ** Horror: Remove Current Styling and Apply Horror Class and Image
$('#horror').click((e) => {
    e.preventDefault();
    // Change Color
    $('#change').removeClass(currentClass);
    $('#change').addClass("note-horror");
    currentClass = "note-horror"; 
    // Change Image
    $('.img').attr('src', imgPath + 'horror-01.png')
    dbStyle = ["note-horror", "horror-01.png"]
});

// ** Daemon: Remove Current Styling and Apply Daemon Class and Image
$('#daemon').click((e) => {
    e.preventDefault();
    // Change Color
    $('#change').removeClass(currentClass);
    $('#change').addClass("note-daemon");
    currentClass = "note-daemon"; 
    // Change Image
    $('.img').attr('src', imgPath + 'daemon-02.png');
    dbStyle = ["note-daemon", "daemon-02.png"];
});

// ** Age of Empire: Remove Current Styling and Apply Age of Empire Class and Image
$('#zodiac').click((e) => {
    e.preventDefault();
    // Change Color
    $('#change').removeClass(currentClass);
    $('#change').addClass("note-zodiac");
    currentClass = "note-zodiac"; 
    // Change Image
    $('.img').attr('src', imgPath + 'zodiac-01.png');
    dbStyle = ["note-zodiac", "zodiac-01.png"];
});

// * Submit Listener: Validate textareas; Make POST Req; Handle Success and Fail
$('#submit').click(async e => {
    e.preventDefault();
    // ** Remove Message Container
    $('.note-msg').addClass('poof');
    const userNote = document.querySelector('.note').value;
    const userSignature = document.querySelector('.signature').value;
    // ** Validation
    if (!userNote) {
       $('.note-msg').text('Your Note Cannot Be Empty!');
       $('.note-msg').removeClass('poof');
    } else if (!userSignature) {
        $('.note-msg').text('Your Signature Cannot Be Empty!');
        $('.note-msg').removeClass('poof');
    } else {
        // *** Pass Validation: MAke POST
        $('.note-msg').addClass('poof');
        const noteRequest = await fetch('/api/diana-note/new', {
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                note: userNote,
                signature: userSignature,
                style: dbStyle
            }),
            method: 'POST'
        });
        const noteResponse = await noteRequest.json();
        // *** POST Error
        console.log(noteResponse.message.msgError);
        if (noteResponse.message.msgError) {
            $('.note-msg').text("Your Note Couldn't Be Sent! Refresh and Try Again 😐");
            $('.note-msg').removeClass('poof');
        } else {
            // *** POST Success
            $('.note-msg').text("Your Note Was Sent!");
            $('.note-msg').removeClass('poof');
            $('#submit').addClass('poof');            
            const redirect = `<a class="col button" href="/"> Click To View Your Card!</a>`
            $('.note-msg').append(redirect);
        }
    }
});


// ** this can be used to make cards editable on the user's device. Save UUID to local storage and whatever they make will have that ID saved
// ** update DB doc to use a client generated ID
// ** Generate, save, and get id from local storage
// ** Attach ID to noteRequest
// ** Make a get request to find user's create note's
// ** create edit and delete routes in backend
// function createUUID() {
//     return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
//        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
//        return v.toString(16);
//     });
//  }

//  console.log(createUUID())
//  console.log(createUUID())
//  console.log(createUUID())