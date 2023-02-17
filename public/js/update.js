var pageInputs = 6;

const loadData = async () => {
    for (let i = 1; i <= pageInputs; i++) {
        let input = document.getElementById(`input${i}`);
        input.setAttribute("data-existing", false)
    };

    await fetch('/api/links', {
        method: 'GET',
        header: { 'Content-type': 'application/json' },
    })
        .then((data) => {
            return data.json();
        })
        .then((data) => {
            for (let i = 0; i < data.length; i++) {
                let input = $(`*[data-type="${data[i].type}"]`);
                input.val(data[i].url);
                let inputID = input.attr('id')
                let targetInput = document.getElementById(inputID);
                targetInput.setAttribute("data-existing", true);
            }
        });
};

loadData();

var newLinkData = [];
var updateLinkData = [];

$('#save-data').click(async (event) => {
    for (let i=1; i <= pageInputs; i++) {
        let input = document.getElementById(`input${i}`);

        if (input.value === ""){
            continue;
        } 
        if (input.getAttribute("data-existing") === "true") {
            let linkObject = {
                type: input.getAttribute("data-type"),
                url: input.value,
            };
            updateLinkData.push(linkObject);
        } 
        if (input.getAttribute("data-existing") === "false") {
            let linkObject = {
                type: input.getAttribute("data-type"),
                url: input.value,
            };
            newLinkData.push(linkObject)
        };
    };

    const createNewData = await fetch('/api/links/createlink', {
        method: 'POST',
        body: JSON.stringify(newLinkData),
        headers: { 'Content-Type': 'application/json' },
    });

    const updateData = await fetch('/api/links/updatelink', {
        method: 'PUT',
        body: JSON.stringify(updateLinkData),
        headers: { 'Content-Type': 'application/json' },
    });
})



