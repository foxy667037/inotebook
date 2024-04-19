const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

// ROUTE 1: Get all notes: GET "/api/note/fetchnotes" . require authentication
router.get("/fetchnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error accured");
  }
});

// ROUTE 2: Add a new note: POST "/api/note/addnotes" . require authentication
router.post(
  "/addnotes",
  fetchuser,
  [
    body("title", "Enter valid title").notEmpty().isLength({ min: 3 }),
    body("description", "Enter discription minimum 5 characters")
      .notEmpty()
      .isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      // decrypt title, description, tag from body
      const { title, description, tag } = req.body;

      // If there are errors, Return bad request:
      const result = validationResult(req);
      if (!result.isEmpty()) {
        res.send({ errors: result.array() });
      }

      // Create Note
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });

      // Save Note
      const saveNote = await note.save();

      res.json(saveNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error accured");
    }
  }
);


// ROUTE 3: Update an existing note: POST "/api/note/updatenotes" . require authentication
router.put(
  "/updatenotes/:id",
  fetchuser,
  async (req, res) => {
    const {title, description, tag} = req.body;
    
    // Create new noteNote object:
    const newNote = {};
    if(title){newNote.title = title;}
    if(title){newNote.description = description;}
    if(title){newNote.tag = tag;}
    
    // Find the to be updated and update it:
    let note = await Note.findById(req.params.id);

    // If note does not exist:
    if(!note){return res.status(404).send("Not Found")}

    // If user input wrong password and username:
    if(note.user.toString() !== req.user.id){
      return res.status(401).send("Wrong Credentials");
    }

    // update notes:
    note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote} , {new:true})
    res.json({note});
  }
)


// ROUTE 3: Delete an existing note: Delete "/api/note/deletenotes" . require authentication
router.delete(
  "/deletenotes/:id",
  fetchuser,
  async (req, res) => {
    const {title, description, tag} = req.body;

    // Find the to be updated and update it:
    let note = await Note.findById(req.params.id);

    // If note does not exist:
    if(!note){return res.status(404).send("Not Found")}

    // If user input wrong password and username:
    if(note.user.toString() !== req.user.id){
      return res.status(401).send("Wrong Credentials");
    }

    // update notes:
    note = await Note.findByIdAndDelete(req.params.id)
    res.json("Successfully: Note has been deleted");
  }
)
module.exports = router;
