console.log("Starting notes.js");

const fs = require('fs');

var fetchNotes = () => {
    try {
        const notesString = fs.readFileSync('notes-data.json');
        return notes = JSON.parse(notesString);
    } catch (error) {
        return [];
    }
};

var saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

var addNote = (title, body) => {
    var notes = fetchNotes();
    const note = {
        title,
        body
    };

    var duplicateNotes = notes.filter(note => note.title === title);

    if (duplicateNotes.length === 0) {
        notes.push(note);
        saveNotes(notes);
        return note;
    }
};

var removeNote = (title) => {
    const notes = fetchNotes();
    const notesToLeave = notes.filter(note => note.title !== title);
    saveNotes(notesToLeave);

    return notes.length !== notesToLeave.length;
};

var getNote = (title) => {
    const notes = fetchNotes();
    const note = notes.filter(note => note.title === title);
    return note[0];
};

var getAll = () => {
    return fetchNotes();
};

const logNote = (note) => {
    console.log('-----------');
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
};

module.exports = {
    addNote,
    removeNote,
    getNote,
    getAll,
    logNote
};