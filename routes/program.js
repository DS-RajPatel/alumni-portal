const express = require("express");
const router = express.Router()
const program_controller=require('../controller/program_controller');
const auth = require("../middleware/auth");


router.get('/programs',auth.login, program_controller.program);
router.post('/program',program_controller.add_program);
router.get('/program_list',auth.login,program_controller.program_list);
router.get('/program_delete',auth.login,program_controller.program_delete);



module.exports = router;
