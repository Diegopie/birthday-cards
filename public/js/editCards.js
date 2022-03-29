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
                        class="col-8 col-md-4 col-lg-2 note-card ${note.style[0]} parseText note-preview" data-id="${note._id}" data-text="${note.note}" data-local-id="${note.localID}"
                    >
                        <textarea class="note text-height">${note.note} </textarea>
                        <textarea class="signature">- ${note.signature}</textarea>
                        <img 
                            class="img" src="/img/card/${note.style[1]}"
                        >
                        <div class="col-sm-10 col-md-3">
                            <a class="button" id="submit-update"> Update</a>
                        </div>
                    </article>
                `
            $('#user-card-contain').prepend(newNote)

        });
    }
})
