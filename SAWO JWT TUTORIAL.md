# Using JWT Authentication with SAWO SDK

This tutorial will guide you to implement JWT Auth with sawo in MEAN stack don't worry the concept will be same in all other languages/frameworks.

# First of all?

Make your account on [SAWO](https://sawolabs.com). Make a project on it and get your API keys. (No credit card required)

# Start an Angular Project

```sh
ng new <project-name>
```
Create a new module or component inside your project.
Then install sawo

```sh
npm install sawo
```
Inside your component's ts file

```sh
import Sawo from "sawo";
Sawo: any;
userPayload: any = {};
```
```sh
const sawoConfig = {
      containerID: "sawo-container",
      // can be one of 'email' or 'phone_number_sms'
      identifierType: "email",
      apiKey: environment.sawoApiKey,
      onSuccess: (payload: any) => {
        this.userPayload = payload;
        const userData = {
          provider_id: this.userPayload.user_id,
          provider_type: "SAWO",
          email: this.userPayload.identifier
        }
        this.dataService.sawoLogin(userData).subscribe(res => {
          if (res.statusCode === 200) {
            this.jwtservice.saveToken(res.data.token);
            this.alertService.success('Success!!', { autoClose: true, keepAfterRouteChange: false })

          }
        });
      }
    };
    this.Sawo = new Sawo(sawoConfig);
    this.Sawo.showForm();
```
# Explaination

Don't worry about the above code. This is just for giving configuration to sawo sdk and initialize it.
You can put your API keys in environment file of angular so you don't have to change for development and production build.

I hope you already know all other config parameters in the above configuration other than extra API call in onSuccess.
So let me explain, Sawo gives you a callback success function in which you can write that code which should execute when sawo successfully authenticates a user. So in that case what I am doing is get the user payload and some additional information about the user and make an API call to our server which we are going to setup next.



---------------------------------------

# Let's setup the node.js now:

Create a new project or use an existing depends on you.
Setup your moongoose schema as below:

```sh
  var UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, lowercase: true, unique: true, required: [true, "Email is required!"], index: true },
    provider_type: { type: String, enum: ['EMAIL', 'SAWO'], default: 'SAWO' },
    provider_id: { type: String, default: null },
    status: { type: Boolean, default: true },
}, { timestamps: true });
```
Some fields are extra here, you can ignore them. Now create one post request route .

```sh
  const app = express();
  app.post('/sawoLogin', async(req,res)=>{
    try {
        const { email, provider_type, provider_id, name } = req.body;
        const user = await User.findOne({ provider_id, provider_type });
        if (user) {
            await User.updateOne({ _id: user._id }, { name });
            const token = jwt.sign({ _id: nuser._id }, <your server secret key here>);
            res.send(httpStatus.OK, 'Logged In successfully', { token })
        } else {
            const uuser = await User.findOne({ email });
            if (uuser) {
                res.send(httpStatus.BAD_REQUEST, 'Email Already exist');
            } else {
                const nuser = await User.create({ provider_type, provider_id, email, name });
                const token = jwt.sign({ _id: nuser._id }, <your server secret key here>);

                res.send( httpStatus.OK, 'Logged in successfully', { token: token, user_data: { name, email } })
            }
        }
    } catch (error) {
        console.log(error)
        responseManagement.sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, global.internal_server_error);
    }
  })
```

So let me explain the above code:

### 1: Store the required data from client side to server side into some variables from req.body.

### 2: Check if the unique provider_id and with its provider_type is already present in the database or not, if yes then update the user's name with the latest name , generate the jwt from jwt.sign() method and return the response to the client side.

### 3: If the user with that provider_id and it's type not present then we have to create that user , but before that we have to check that user's email is already exist or not. If yes then when we can throw an error message in the response.

### 4: Now if the user doesn't exist then we can create the with details we have taken from req.body. Create the jwt token with it's _id and return that token into the response.

