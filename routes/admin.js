const express = require("express");
const auth = require("../middleware/auth");
const session = require("express-session");
const router = express.Router()

const csv=require("csvtojson");


// controlller

const admin_controller=require("../controller/admin_controller")
const forget=require("../controller/forgotpass")



// session Method
router.use(session({
    secret: 'tT^38dLsddsjc^scswcwscwscwsdcwqfwegrehtrhnaeCT?-Mvu',
    cookie: { maxAge: 1544594 }
}))

//Admin Login Routes

router.get('/adlogout', auth.login,admin_controller.logout);


router.get('/admin',auth.logout,admin_controller.admin_login);
router.get('/homes', auth.login,admin_controller.admin_dashboard);
router.get('/new_admin', auth.login,admin_controller.new_admin_get);
router.get('/personal_info', auth.login,admin_controller.personal_info_get);
router.get('/admin_list', auth.login, admin_controller.admin_list);
router.get('/admin_delete',auth.login,admin_controller.admin_delete);

router.post('/personal_info',auth.login,admin_controller.personal_info);

router.post('/new_admin',auth.login,admin_controller.admin_add);
router.post('/check_data',auth.logout,admin_controller.check_data);




router.get('/forgot',forget.Forgeturl);
router.post('/authe',forget.Forgot_pass);


module.exports = router; 