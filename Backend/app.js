const express = require("express");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const session = require("express-session");

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const SwaggerOptions = require("./swagger.json");
const swaggerDocument = swaggerJsDoc(SwaggerOptions);

const errorMiddleware = require("./app/middlewares/errorMiddleware");
const index = require("./app/routes/index");

const app = express();


// =====================
// SECURITY
// =====================

app.use(
    helmet({
        crossOriginResourcePolicy: {
            policy: "cross-origin"
        }
    })
);


// =====================
// BODY PARSER
// MUST BE BEFORE ROUTES
// =====================

app.use(express.json());

app.use(express.urlencoded({
    extended:true
}));


// =====================
// OTHER MIDDLEWARE
// =====================

// CORS
// IMPORTANT FOR NEXT.JS + COOKIES
// ==========================================

app.use(
    cors({
        origin:
        "http://localhost:3000",

        credentials: true,

        methods: [
            "GET",
            "POST",
            "PUT",
            "PATCH",
            "DELETE",
            "OPTIONS"
        ],

        allowedHeaders: [
            "Content-Type",
            "Authorization"
        ]
    })
);

app.use(morgan("dev"));

app.use(cookieParser());


app.use(session({

    secret:process.env.SESSION_SECRET,

    resave:false,

    saveUninitialized:false,

    cookie:{

        maxAge:1000*60*60*24

    }

}));



// static files

app.use(
    "/uploads",
    express.static(
        path.join(__dirname,"uploads")
    )
);

// Supports users uploaded before user images were moved into uploads/users.
app.use(
    "/uploads/users",
    express.static(
        path.join(__dirname,"uploads")
    )
);




// swagger

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);



// test route

app.get("/test",(req,res)=>{

    res.json({

        message:"Server working"

    });

});



// =====================
// ROUTES ALWAYS LAST
// =====================


app.use(
    "/api/v1",
    index
);



// error handler very last

app.use(errorMiddleware);



module.exports = app;
