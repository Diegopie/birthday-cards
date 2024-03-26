const siteURL = window.location.pathname;
let currentClass = "note-fest"
const isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;

// I keep getting bad request response but the data comes threw in the error???
$.ajax({
    url: '/api/boo-note/all',
    headers: { 'year': siteURL },
    type: "GET",
    dataType: "json",
    success: (data) => {
        console.log(data.responseJSON.notes);
    },
    error: (error) => {
        console.log(error);
        // console.log(error.responseJSON.notes);
        const noteData = error.responseJSON.notes
        // ** Render Each Note
        noteData.forEach(note => {
            // console.log(note.note.length);
            if (note.note.length > 150) {
                const noteMessage = note.photos.length > 0 ? 'Click Icon For Full Note and Photos!' : 'Click Icon For Full Note!';
                const newNoteLong = `
                    <article 
                        class="col-8 col-md-4 col-lg-2 note-card ${note.style[0]} parseText" data-id="${note._id}" data-text="${note.note}" data-photos="${note.photos} data-local-id="${note.localID}"
                    >
                        <h2 class="note">${note.note.substring(0, 110)} —</h2>
                        <h6>${noteMessage}</h6>
                        <h4 class="signature"> ${note.signature}</h4>
                        <img 
                            class="img" src="/img/card/${note.style[1]}"
                        >
                    </article>
                `
                $('#card-contain').prepend(newNoteLong)
            } else {
                const noteMessage = note.photos.length > 0 ? 'Click Icon For Photos!' : '';
                const newNote = `
                    <article 
                        class="col-8 col-md-4 col-lg-2 note-card ${note.style[0]} parseText" data-id="${note._id}" data-text="${note.note}" data-photos="${note.photos}" data-local-id="${note.localID}"
                    >
                        <h2 class="note">${note.note} </h2>
                        <h6>${noteMessage}</h6>
                        <h4 class="signature"> ${note.signature}</h4>
                        <img 
                            class="img" src="/img/card/${note.style[1]}"
                        >
                    </article>
                `
                $('#card-contain').prepend(newNote)
            }
        });

        // * With All Cards Appended, Change CSS Var for Flowers to Fall Through Entire Page

        const flowerPetals = [
            { flowerName: '--flower-1-speed', flowerSpeed: 7, },
            { flowerName: '--flower-2-speed', flowerSpeed: 4, },
            { flowerName: '--flower-3-speed', flowerSpeed: 10, },
            { flowerName: '--flower-4-speed', flowerSpeed: 4, },
            { flowerName: '--flower-5-speed', flowerSpeed: 10, },
            { flowerName: '--flower-6-speed', flowerSpeed: 4.5, },
        ]

        const viewHt = window.innerHeight;
        const scrollHt = document.body.scrollHeight;
        const calc = scrollHt / viewHt;

        const setFlowerSpeed = (calc) => {
            flowerPetals.forEach((petal, index) => {
                petal.flowerSpeed = petal.flowerSpeed * calc
                document.body.style.setProperty(petal.flowerName, `${petal.flowerSpeed}s`);

            });
        }


        // * Check if this is a mobile device
        if (isMobile) {
            // Set CSS var of how far in dom flowers will fall if view port is larger than content scroll height (not enough notes to scroll)
            if (viewHt > scrollHt) {
                document.body.style.setProperty('--flower-height', (viewHt) + 'px');
                return;
            }
            // Else, set CSS var to scroll height and adjust the speed of flower petal animation
            document.body.style.setProperty('--flower-height', (scrollHt) + 'px');
            setFlowerSpeed(calc);

        } else {
            // Apply same updates if not mobile (I don't know why I did this. It seems to subtrack the height for some reason 🤷‍♂️)
            if (viewHt > scrollHt) {
                document.body.style.setProperty('--flower-height', (viewHt - 28) + 'px');
                return;

            }
            document.body.style.setProperty('--flower-height', (scrollHt - 28) + 'px');
            setFlowerSpeed(calc);

        }


        // ** Modal {This does not work in bs5!}
        const solid = '-solid'
        $(".img").click((e) => {
            e.preventDefault();
            $("#photos-target").empty()
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
            const photos = $(e.target.parentElement).data('photos').split(",");
            if (photos[0] !== '') {
                photos.forEach((photo) => {
                    const img = `<img src=${photo} class=modal-photo />`;
                    $('#photos-target').append(img)
                })
                $('#img-target').attr('src', img);
            }
            $("#validateModal").modal();
        });
    }
})
