console.log('Starting application');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const titleConfig = {
    describe: 'Title of note',
    demand: true,
    alias: 't'
};
const bodyConfig = {
    describe: 'Body of a note',
    demand: true,
    alias: 'b'
};

const args = yargs
    .command('add', 'Add a new note', {
        title: titleConfig,
        body: bodyConfig
    })
    .command('list', 'List all notes')
    .command('read', 'Aaa a new note', {
        title: titleConfig
    })
    .command('remove', 'Remove a note', {
        title: titleConfig
    })
    .help()
    .argv;
const command = args._[0];

if (command === 'add') {
    var note = notes.addNote(args.title, args.body);
    if (note) {
        console.log('Added note!');
        notes.logNote(note);
    } else {
        console.log('Note title is taken');
    }
} else if (command === 'list') {
    const allNotes = notes.getAll();
    console.log('Printing Notes: ');
    allNotes.forEach(eachNote => {
        notes.logNote(eachNote);
    })
} else if (command === 'read') {
    var note = notes.getNote(args.title);
    if (note) {
        console.log('Read note...');
        notes.logNote(note);
    } else {
        console.log("Couldn't find note");
    }
} else if (command === 'remove') {
    var noteRemoved = notes.removeNote(args.title);
    var message = noteRemoved ? "Note removed" : "Didn't find note";
    console.log(message);
} else {
    console.log('command not recognized');
}