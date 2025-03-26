import { getDownloadURL, ref, uploadBytes, deleteObject } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-storage.js";

import { storage } from '/js/firebase.js';

// * Stores Current Class Being Rendered to Correctly Target and Replace Styles
let currentClass = "note-fall"
//fall Default Styling to Send to DB, Listeners Will Update this Value
let dbStyle = ["note-fall", "fall-01.png"]
const imgPath = "/img/card/";
const dbID = checkLocalID();
let dbURLs = [];
const currentBirthday = 26

// * Update TextBox Size

function createUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function createSmolUUID() {
    return 'xxxxxx'.replace(/x/g, function (c) {
        var r = Math.random() * 16 | 0;
        return r.toString(16);
    });
}


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

// ** Dream Builder: Remove Current Styling and Apply Dream Builder Class and Image
const setDreamBuilder = (e) => {
    // e.preventDefault();
    // Change Color
    $('#change').removeClass(currentClass);
    $('#change').addClass("note-dreamBuilder");
    currentClass = "note-dreamBuilder";
    // Change Image
    $('.img').attr('src', imgPath + 'dreamBuilder-01.png');
    dbStyle = ["note-dreamBuilder", "dreamBuilder-01.png"];
    setLocal();
}
$('#dreamBuilder').click(setDreamBuilder);

// ** FieryAries: Remove Current Styling and Apply FieryAries Class and Image
const setFieryAries = (e) => {
    // e.preventDefault();
    // Change Color
    $('#change').removeClass(currentClass);
    $('#change').addClass("note-fieryAries");
    currentClass = "note-fieryAries";
    // Change Image
    $('.img').attr('src', imgPath + 'fieryAries-01.png');
    dbStyle = ["note-fieryAries", "fieryAries-01.png"];
    setLocal();
}
$('#fieryAries').click(setFieryAries);

// ** FieryAries: Remove Current Styling and Apply FieryAries Class and Image
const setEarthyFriends = (e) => {
    // e.preventDefault();
    // Change Color
    $('#change').removeClass(currentClass);
    $('#change').addClass("note-earthyFriends");
    currentClass = "note-earthyFriends";
    // Change Image
    $('.img').attr('src', imgPath + 'earthyFriends-01.png');
    dbStyle = ["note-earthyFriends", "earthyFriends-01.png"];
    setLocal();
}
$('#earthyFriends').click(setEarthyFriends);

const setGymGals = (e) => {
    // e.preventDefault();
    // Change Color
    $('#change').removeClass(currentClass);
    $('#change').addClass("note-gymGals");
    currentClass = "note-gymGals";
    // Change Image
    $('.img').attr('src', imgPath + 'gymGals.jpg');
    dbStyle = ["note-gymGals", "gymGals.jpg"];
    setLocal();
}
$('#gymGals').click(setGymGals);

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
                bday: currentBirthday,
                signature: userSignature,
                style: dbStyle,
                photos: dbURLs,
                localID: dbID
            }),
            method: 'POST'
        });
        const noteResponse = await noteRequest.json();
        // *** POST Error
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
            localStorage.removeItem('noteDraft');
            localStorage.removeItem('photos');
        }
    }
});

// * Delete Photos
async function deletePhoto(path, photoWrapper) {
    const photoRef = ref(storage, path);

    try {
        await deleteObject(photoRef);
        photoWrapper.remove();

        // Remove from dbURLs array
        const index = dbURLs.findIndex(photo => photo.path === path);
        if (index > -1) dbURLs.splice(index, 1);
        if (dbURLs.length === 0) {
            localStorage.removeItem('photos')
        } else {
            localStorage.setItem('photos', JSON.stringify(dbURLs));
        }
        console.log(`Photo deleted: ${path}`);
    } catch (error) {
        console.error("Error deleting photo:", error);
        alert("Failed to delete photo. Please try again.");
    }
}


// * Build Uploaded Photos
function buildPhotos(newUpload) {

    if (newUpload) {
        const newPhoto = `
            <div class="photo-wrapper">
                <img src="${newUpload.url}" />
                <button class="delete-btn" data-path="${newUpload.path}">X</button>
            </div>
        `;
        $('#show-uploaded-photos').append(newPhoto);
    } else {
        dbURLs.forEach(({ url, path }) => {
            const newPhoto = `
                <div class="photo-wrapper">
                    <img src="${url}" />
                    <button class="delete-btn" data-path="${path}">X</button>
                </div>
            `;
            $('#show-uploaded-photos').append(newPhoto);
        })
    }



    $('.delete-btn').off('click').on('click', function () {
        const path = $(this).data('path');
        const photoWrapper = $(this).closest('.photo-wrapper');
        deletePhoto(path, photoWrapper);
    });
}

// * Check Local Storage for a Draft
function checkLocal() {
    const noteDraft = JSON.parse(localStorage.getItem('noteDraft'));
    const photos = JSON.parse(localStorage.getItem('photos'));
    if (photos !== null) {
        dbURLs = photos;
        $('#photoValidate').text('Found Previously Added Photos!');
        buildPhotos();
    }
    if (noteDraft === null) {
        return;
    }
    // Place Local Text in textarea 
    $('#MakeNoteText').val(noteDraft.note);
    $('#MakeCardSignature').val(noteDraft.signature);
    switch (noteDraft.style) {
        case 'note-fall':
            setFall();
            break;
        case 'note-succulents':
            setSucculent();
            break;
        case 'note-dreamBuilder':
            setDreamBuilder();
            break;
        case 'note-fieryAries':
            setFieryAries();
            break;
        case 'note-earthyFriends':
            setEarthyFriends();
            break;
        case 'note-gymGals':
            setGymGals();
            break;
    }
    $('#draftMsg').text('Draft Found!');
}

checkLocal();

// Check Local For UUID
function checkLocalID() {
    const localID = localStorage.getItem('id');
    if (localID === null) {
        const newID = createSmolUUID()
        localStorage.setItem('id', newID);
        return newID;
    }
    return localID;
}


$('textarea').on('input', function () {
    const containerHeight = this.scrollHeight > 900 ? 900 : this.scrollHeight;
    console.log(containerHeight);
    this.style.height = (containerHeight) + 'px';
    setLocal();
});

$('#photoUpload').on('change', async (e) => {
    const photos = e.target.files;

    $('#photoValidate').text('Adding...')

    for (let photosIndex = 0; photosIndex < photos.length; photosIndex++) {
        const photo = photos[photosIndex];

        const path = `${currentBirthday}/${dbID}_${createSmolUUID()}_${photo.name}`;
        const photoRef = ref(storage, path);

        try {
            const photoSnapshot = await uploadBytes(photoRef, photo);
            const url = await getDownloadURL(photoRef);
            dbURLs.push({ url, path });
            buildPhotos({ url, path })

        } catch (error) {
            console.log(error);
            $('#photoValidate').text('Something went wrong! Refresh and try again')
        }
    }
    $('#photoValidate').text('Photo(s) Added!');
    setTimeout(() => {
        $('#photoValidate').text('')
    }, 2500)
    localStorage.setItem('photos', JSON.stringify(dbURLs));
})