// * Stores Current Class Being Rendered to Correctly Target and Replace Styles
let currentClass = "note-fall"
//fall Default Styling to Send to DB, Listeners Will Update this Value
let dbStyle = ["note-fall", "fall-01.png"]
const imgPath = "/img/card/"


// * Update TextBox Size

const setLocal = () => {
    localStorage.setItem(
        'noteDraft', JSON.stringify({
            'note': $('.note').val(),
            'signature': $('.signature').val(),
            'style': currentClass,
        })
    );
    $('#draftMsg').text('Draft Saved!');
}

// * Event Listeners For Theme
// ** fall: Remove Current Styling and Apply fall Class and Image
const setFall = (e) => {
    // e.preventDefault();
    // Change Color
    $('#change').removeClass(currentClass);
    $('#change').addClass("note-fall");
    currentClass = "note-fall";
    // Change Image
    $('.img').attr('src', imgPath + 'fall-01.png');
    dbStyle = ["note-fall", "fall-01.png"];
    setLocal();
}
$('#fall').click(setFall);

// ** Succulents: Remove Current Styling and Apply Succulents Class and Image
const setSucculent = (e) => {
    // e.preventDefault();
    // Change Color
    $('#change').removeClass(currentClass);
    $('#change').addClass("note-succulents");
    currentClass = "note-succulents";
    // Change Image
    $('.img').attr('src', imgPath + 'succulents-01.png')
    dbStyle = ["note-succulents", "succulents-01.png"];
    setLocal();
}
$('#succulents').click(setSucculent);

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
        const noteRequest = await fetch('/api/boo-note/new', {
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


// * Check Local Storage for a Draft
// !! The fck, none of this works
function checkLocal() {
    const noteDraft = JSON.parse(localStorage.getItem('noteDraft'));
    console.log(noteDraft);
    if (noteDraft === null) {
        return;
    }
    $('.note').val(noteDraft.note);
    $('.signature').val(noteDraft.signature);
    console.log(noteDraft.style);
    switch (noteDraft.style) {
        case 'note-fall':
            setFall();
            break;
        case 'note-succulents':
            console.log('hits');
            setSucculent();
            break;
    }
    $('#draftMsg').text('Draft Found!');
}
checkLocal();


$('textarea').each(function () {
    this.setAttribute('style', 'min-height: ' + (this.scrollHeight) + "px; overflow-y: hidden;")
}).on('input', function () {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
    setLocal();
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