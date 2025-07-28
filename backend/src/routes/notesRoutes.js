import express from "express"
import { createNote, deleteNote, getAllNotes, updateNote, getNoteByID } from "../src/controllers/notesController.js";

const router = express.Router();

router.get("/")

export default router;

router.get("/", getAllNotes);
router.get("/:id", getNoteByID);
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);