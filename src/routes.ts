import { Router } from "express";
import { CreateUserController } from "./controllers/createUserController";
import { CreateProfileController } from "./controllers/createProfileController";
import { CreatePostController} from "./controllers/createPostController";

const router = Router();

const createUser = new CreateUserController();
const createProfile = new CreateProfileController();
const createPost = new CreatePostController();


router.post("/user", createUser.create);
router.post("/profile", createProfile.create);
router.post("/post", createPost.create);


export { router };