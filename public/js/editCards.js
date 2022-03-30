const storageID = localStorage.getItem('id');

// I keep getting bad request response but the data comes threw in the error???
$.ajax({
    url: '/api/boo-note/all',
    type: "GET",
    dataType: "json",
    success: (data) => {
        console.log(data.responseJSON.notes);
    },
    error: (error) => {
        console.log(error);
        // console.log(error.responseJSON.notes);
        const noteData = error.responseJSON.notes
        console.log(noteData);
        // ** Render Each Note
        noteData.forEach(note => {
            if (storageID !== note.localID) return;

            const newNote = `
                    <article 
                        class="col-8 col-md-4 col-lg-2 note-card ${note.style[0]} parseText note-preview" data-id="${note._id}" data-text="${note.note}" data-localID="${note.localID}"
                    >
                        <textarea class="note text-height">${note.note} </textarea>
                        <textarea class="signature">${note.signature}</textarea>
                        <img 
                            class="imgEdit" src="/img/card/${note.style[1]}"
                        >
                        <div class="center" style="padding-left: 22%;">
                            <a class="EditButton center" id="submit-update"> Update</a>
                        </div>
                    </article>
                `
            $('#user-card-contain').prepend(newNote)

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
            console.log(noteResponse);
            if (noteResponse.message.msgError) {
                console.log('err');
                $('.note-msg').text("Your Note Couldn't Be Sent! Refresh and Try Again 😐");
                $('.note-msg').removeClass('poof');
            } else {
                // *** POST Success
                console.log($('.note-msg'));
                $('.note-msg').text("Your Note Was Sent!");
                $('.note-msg').removeClass('poof');
                $('#submit').addClass('poof');
                const redirect = `<a class="col button" href="/"> Click To View Your Card!</a>`
                $('.note-msg').append(redirect);
            }
        })
    }
})
