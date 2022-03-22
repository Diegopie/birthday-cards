const siteURL = window.location.origin;
let currentClass = "note-fest"

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
            // console.log(note.note.length);
            if (note.note.length > 150) {
                const newNoteLong = `
                    <article 
                        class="col-8 col-md-4 col-lg-2 note-card ${note.style[0]} parseText" data-id="${note._id}" data-text="${note.note}"
                    >
                        <h2 class="note">${note.note.substring(0, 150)} —</h2>
                        <h6> Click Photo For Full Note </h6>
                        <h4 class="signature">- ${note.signature}</h4>
                        <img 
                            class="img" src="/img/card/${note.style[1]}"
                        >
                    </article>
                `
                $('#card-contain').prepend(newNoteLong)
            } else {
                const newNote = `
                    <article 
                        class="col-8 col-md-4 col-lg-2 note-card ${note.style[0]} parseText" data-id="${note._id}" data-text="${note.note}"
                    >
                        <h2 class="note">${note.note} </h2>
                        <h4 class="signature">- ${note.signature}</h4>
                        <img 
                            class="img" src="/img/card/${note.style[1]}"
                        >
                    </article>
                `
                $('#card-contain').prepend(newNote)
            }
            // * With All Cards Appended, Change CSS Var for Flowers to Fall Through Entire Page
            document.body.style.setProperty('--flower-height', (document.body.scrollHeight) + 'px');
        });
        // ** Modal
        const solid = '-solid'
        $(".img").click((e) => {
            e.preventDefault();
            // *** Update Styling
            const curStyle = e.target.parentElement.classList[4];
            const modalStyle = curStyle + solid;
            $('#modal-contain').removeClass(currentClass);
            $('#modal-contain').addClass(modalStyle);
            // **** Update currentClass So It Can Be Targeted and Removed In the Future
            currentClass = modalStyle;
            // *** Update Text
            const text = e.target.parentElement.dataset.text;
            // console.log(text);
            $('#modal-note').text(text);
            // *** Update Signature
            const signature = e.target.previousElementSibling.innerText;
            // console.log(signature);
            $('#modal-signature').text(signature)
            // *** Update Image
            const img = e.target.attributes[1].value;
            // console.log(img);
            $('#img-target').attr('src', img);
            $("#validateModal").modal();
        });
    }
})
