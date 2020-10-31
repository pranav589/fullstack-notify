const router=require("express").Router()
const auth=require('../middleware/auth')
const noteController=require("../controllers/noteController")
                               

//getting all the notes
router.get("/",auth,noteController.getNotes)

router.post("/",auth,noteController.createNote)

router.get("/:id",auth,noteController.getNote)

router.put("/:id",auth,noteController.updateNote)

router.delete("/:id",auth,noteController.deleteNote)

module.exports=router