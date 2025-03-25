const storageID = localStorage.getItem('id');
import { ref, deleteObject } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-storage.js";
import { storage } from '/js/firebase.js';

async function editDeletePhoto(path, photoWrapper, id, photos) {
    const photoRef = ref(storage, path);

    try {
        await deleteObject(photoRef);
        photoWrapper.remove();

        // console.log(id);
        // console.log({ editNote, editSig});
        const updateRequest = await fetch('/api/boo-note/deletePhoto', {
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                photos
            }),
            method: 'PUT'
        });
        const noteResponse = await updateRequest.json();
        if (noteResponse.message.msgError) {
            console.log('err');
            $('.note-msg').text("Your Photo Couldn't Be Deleted! Refresh and Try Again 😐");
            $('.note-msg').removeClass('poof');
        } else {
            // *** POST Success
            $('.note-msg').text("Your Photo Was Deleted!");
            $('.note-msg').removeClass('poof');
        }


    } catch (error) {
        console.error("Error deleting photo:", error);
        alert("Failed to delete photo. Please try again.");
    }
}

// I keep getting bad request response but the data comes threw in the error???
$.ajax({
    url: '/api/boo-note/all',
    type: "GET",
    dataType: "json",
    success: (data) => {
        console.log(data.responseJSON.notes);
    },
    error: (error) => {
        // console.log(error);
        // console.log(error.responseJSON.notes);
        const noteData = error.responseJSON.notes
        // console.log(noteData);
        // ** Render Each Note

        noteData.forEach(note => {
            if (storageID !== note.localID) return;

            const noteContainer = $('<div>');
            noteContainer.attr('style', 'width: 620px')

            const newNote = `
                <article 
                    class="col-8 col-md-4 col-lg-2 note-card-edit ${note.style[0]} parseText note-preview" data-id="${note._id}" data-localID="${note.localID}"
                >
                    <textarea class="note text-height">${note.note} </textarea>
                    <textarea class="signature">${note.signature}</textarea>
                    <img 
                        class="imgEdit" src="/img/card/${note.style[1]}"
                    >
                    <div class="center">
                        <a class="EditButton center" id="submit-update"> Update</a>
                    </div>
                </article>
            `;

            const photoContainer = $('<div>');
            photoContainer.addClass('edit-photo-container')
            note.photos.forEach(({ url, path }) => {
                const photoJSON = {
                    data: note.photos
                }
                const newPhoto = `
                    <div class="photo-wrapper">
                        <img src="${url}" />
                        <button 
                            class="edit-delete-btn"
                            data-id="${note._id}"
                            data-photos='${JSON.stringify(note.photos)}'
                            data-path="${path}"
                        >X</button>
                    </div>
                `;
                photoContainer.append(newPhoto);
            })

            noteContainer.append(newNote);
            noteContainer.append(photoContainer);
            $('#user-card-contain').prepend(noteContainer);
        });

        $('.edit-delete-btn').off('click').on('click', function () {
            const path = $(this).data('path');
            const id = $(this).data('id');
            const photos = $(this).data('photos');
            const index = photos.findIndex(photo => photo.path === path);
            if (index > -1) photos.splice(index, 1);
            const photoWrapper = $(this).closest('.photo-wrapper');
            editDeletePhoto(path, photoWrapper, id, photos);
        });

        // Click
        $('.EditButton').click(async (e) => {
            e.preventDefault();
            const target = e.target.parentElement.parentElement;
            const id = target.dataset.id;
            // console.log(id);
            const editNote = target.children[0].value;
            const editSig = target.children[1].value;
            // console.log({ editNote, editSig});
            const updateRequest = await fetch('/api/boo-note/edit', {
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: id,
                    note: editNote,
                    signature: editSig,
                }),
                method: 'PUT'
            });
            const noteResponse = await updateRequest.json();
            if (noteResponse.message.msgError) {
                console.log('err');
                $('.note-msg').text("Your Note Couldn't Be updated! Refresh and Try Again 😐");
                $('.note-msg').removeClass('poof');
            } else {
                // *** POST Success
                console.log($('.note-msg'));
                $('.note-msg').text("Your Note Was Updated!");
                $('.note-msg').removeClass('poof');
                $('.note-msg').append(redirect);
            }
        })
    }
})
