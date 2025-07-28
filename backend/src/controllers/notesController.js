import Note from "../models/Note.js"
export async function getAllNotes(req, res) {
    //send the notes
    //res.status(200).send("You just fetched the notes");
    try {
        const  notes = await Note.find(); //.sort({ createdAt: -1 }) for newest first
        res.status(200).json(notes);
    } catch (error) {
        console.error("Error in getAllNotes controller", error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export async function getNoteByID(req, res) {
    //send the notes
    //res.status(200).send("You just fetched the notes");
    try {
        const note = await Note.findById(req.params.id);
        if(!note) return res.status(404).json({message:"Note not found"});
        res.status(200).json(note);
        //res.status(200).json(notes);
    } catch (error) {
        console.error("Error in getNoteByID controller", error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export async function createNote(req, res) {
    //send the notes
    //res.status(201).json({message:"Note created successfully"});
    try {
        const {title, content} = req.body
        const note = new Note({title, content})
        const savedNote = await note.save()
        res.status(201).json({savedNote});
        // console.log(title,content)
    } catch (error) {
        console.error("Error in createNote controller", error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export async function updateNote(req, res) {
    //send the notes
    try {
        const {title, content} = req.body;
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id, 
            {title, content},
            {
                new: true
            });
        if(!updatedNote) return res.status(404).json({message:"Note not found"})
        res.status(200).json(updatedNote);
    } catch (error) {
        console.error("Error in updateNote controller", error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export async function deleteNote(req, res) {
    //send the notes
    //res.status(200).json({message:"Node deleted successfully"});
    try {
        const {title,content} = req.body;
        const deletedNote = await Note.findByIdAndDelete(
            req.params.id
        );
        if(!deletedNote) return res.status(404).json({message:"Note not found"});
        res.status(200).json(deletedNote);
    } catch (error) {
        console.log("Error in deleteNote controller", error);
        res.status(505).json({message:"Internal server error"});
    }
}