const express = require('express');
const app = express();
const dotenv = require('dotenv');
const DbConnection = require("./config/Database");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')

// Importing routes
const router = require("./routes/UserRoutes");
const OutlateMasterRoute = require("./routes/OutlateMasterRoute");
const restorantMasterRouter = require("./routes/RestorantMasterRoutes");
const CallsMasterRouter = require("./routes/CallMasterRouter");
const RoleMasterRouter = require("./routes/RoleMasterRoute");
const NewCallCategory = require("./routes/NewCallCreateRouter");
const NewCallSubCategory = require("./routes/NewCallCreateSubRouter");
const NewCallSubSubCategory = require("./routes/NewCallCreateSubSubRouter");
const UserWiseRestAndOutlet = require("./routes/UserWiseRestAndOutletRouter");
const AdminToSupportEngg = require("./routes/AdminToSupportEnggRouter");
const SupportEnggmessage = require("./routes/SupportEnggCallMessageRouter");
const CallCloseStatus = require("./routes/CallCloseStatusRouter")
const HelpVideo = require("./routes/HelpCenterRoute")

// Middleware
app.use(cookieParser());
app.use(cors());
dotenv.config();

// Database Connection
DbConnection();

app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.json());

app.get("/", function(req, res) {
    res.render("index.ejs"); // Assuming you have a view engine configured
});

// Routes
app.use("/api", router);
app.use("/api/restorantMaster", restorantMasterRouter);
app.use("/api/outlateMaster", OutlateMasterRoute);
app.use("/api/callsMaster", CallsMasterRouter); 
app.use("/api/RoleMaster", RoleMasterRouter); 
app.use("/api/NewCallCategery", NewCallCategory); 
app.use("/api/NewCallSubCategery", NewCallSubCategory); 
app.use("/api/NewCallSubSubCategery", NewCallSubSubCategory); 
app.use("/api/UserWiseRestAndOutlet", UserWiseRestAndOutlet); 
app.use("/api/AdminToSupportEngg", AdminToSupportEngg); 
app.use("/api", SupportEnggmessage); 
app.use("/api", CallCloseStatus);
app.use("/api", HelpVideo); 

app.listen(process.env.PORT, () => {
    console.log(`Server is Running on port ${process.env.PORT}`);
});
