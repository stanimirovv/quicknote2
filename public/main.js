var editor;
var key;
function init(encryptedContent, noteExists, errorMessage) {
    if (errorMessage) {
        alert('Error loading note, please try again later');
        return;
    }

    if (noteExists) {
        loadEncryptionKeyIfNecessary();
        let userContent;
        try {
            userContent = sjcl.decrypt(key, encryptedContent);
        } catch(error) {
            alert('Decryption error.');
        }
        loadEditor(JSON.parse(userContent));
    } else {
        const defaultContent = [{type: "header", data: {text: "Quick Note", level: 1}}, {type : "paragraph", data : {text : "Looks like a note with this hash doesn\'t exist so it is up for grabs. Make sure to save it to make sure that it is encrypted!"}}];
        loadEditor(defaultContent);
    }
}


function loadEncryptionKeyIfNecessary() {
    if (key == null || key == "") {
        key = prompt("Please enter your key:");
    }
}

function loadEditor(data) {
    console.log('data : ', data);
    const editorData = {
        "time" : 1582807801650,
        "tools" : {
            header: {
                class: Header,
                inlineToolbar: ['link'],
                config: {
                    placeholder: 'Header'
                },
                shortcut: 'CMD+SHIFT+H'
            },

            image: {
                class: SimpleImage,
                inlineToolbar: ['link'],
            },

            list: {
                class: List,
                inlineToolbar: true,
                shortcut: 'CMD+SHIFT+L'
            },

            checklist: {
                class: Checklist,
                inlineToolbar: true,
            },

            quote: {
                class: Quote,
                inlineToolbar: true,
                config: {
                    quotePlaceholder: 'Enter a quote',
                    captionPlaceholder: 'Quote\'s author',
                },
                shortcut: 'CMD+SHIFT+O'
            },

            warning: Warning,

            marker: {
                class:  Marker,
                shortcut: 'CMD+SHIFT+M'
            },

            code: {
                class:  CodeTool,
                shortcut: 'CMD+SHIFT+C'
            },

            delimiter: Delimiter,

            inlineCode: {
                class: InlineCode,
                shortcut: 'CMD+SHIFT+C'
            },

            linkTool: LinkTool,

            embed: Embed,

            table: {
                class: Table,
                inlineToolbar: true,
                shortcut: 'CMD+ALT+T'
            },

        },
        data: { blocks: data },
        "version": "2.16.1",
    };
    console.log(editorData.data);
    editor = new EditorJS(editorData);
}

function saveNote() {
    editor.save().then( data => {
        console.log(data.blocks);
        loadEncryptionKeyIfNecessary();
        /* let dataToSave = { blocks : data.blocks }; */
        let dataToSave = data.blocks;
        const encryptedData = sjcl.encrypt(key, JSON.stringify(dataToSave));
        const url = window.location.href + '/save'; //TODO keyword should be const
        fetch(url, {method: 'POST', redirect: 'follow', body: encryptedData, headers: {'Content-Type': 'application/json'}})
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
            });
    });
}

