import Todo from "../model/todo.model.js";


// THIS IS THE FUNCTION OF THE CREATE TODO 
export const createTodo = async (req, res) => {

    // EXTRACTING THE DATA FROM THE REQUEST BODY
    const { text, completed } = req.body;

    try {

        // CREATING THE TODO AND SAVE INTO THE DATABASES
        const todo = await Todo.create({
            text,
            completed,
            user: req.user._id  // ASSOCIATE TODO WITH LOGGED IN USER
        });

        // IF EVERYTHING IS GOES CORRECTLY THE RESPONSE WILL BE GOES TO 200
        res.status(200).json({ 
            msg:"Todo created successfully",
            todo 
        });


    } catch (error) {

        // IF ANY ERROR WILL ENCOUNTER THEN THE RESPONSE WILL GET 500 STATUS CODE THAT MEANS THERE IS AN ERROR
        console.error(error); 
        return res.status(500).json({
            msg: "Error in the create todo controller"
        });
    }
};


// GETTING THE ALL THE TODOS FROM THE DATABASES
export const getTodo = async(req,res) =>{
    try {
        

        // EXTRACTING THE ALL TODO INSIDE THE DATABASES
        const todos =await Todo.find({user: req.user._id})

         // IF EVERYTHING IS GOES CORRECTLY THE RESPONSE WILL BE GOES TO 200
        res.status(200).json({ 
            msg: "Todos Fetched Successfully",
            todos });

    } catch (error) {
        // IF ANY ERROR WILL ENCOUNTER THEN THE RESPONSE WILL GET 500 STATUS CODE THAT MEANS THERE IS AN ERROR
        console.error(error); 
        return res.status(500).json({
            msg: "Error in the getting todo controller"
        });
    }
}

// UPDATE THE TODO, CONTROLLER
export const updateTodo = async(req,res) =>{
    try {
        
        const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
            new:true
        })

        // IF EVERYTHING IS GOES CORRECTLY THE RESPONSE WILL BE GOES TO 200
        res.status(200).json({ 
            msg: "Todos Updated Successfully",
            todo
        });

    } catch (error) {
        // IF ANY ERROR WILL ENCOUNTER THEN THE RESPONSE WILL GET 500 STATUS CODE THAT MEANS THERE IS AN ERROR
        console.error(error); 
        return res.status(500).json({
            msg: "Error in the Updating todo controller"
        });
    }
}


// DELETE TODO
export const deleteTodo = async(req,res) =>{
    try {

        const id = req.params.id
        const todo = await Todo.findByIdAndDelete(id)

        if(!todo){
            res.status(404).json({
                msg:"Todo is not found"
            })
        }

        // IF EVERYTHING IS GOES CORRECTLY THE RESPONSE WILL BE GOES TO 200
        res.status(200).json({ 
            msg: "Todos Deleted Successfully",
        });

        
    } catch (error) {
        // IF ANY ERROR WILL ENCOUNTER THEN THE RESPONSE WILL GET 500 STATUS CODE THAT MEANS THERE IS AN ERROR
        console.error(error); 
        return res.status(500).json({
            msg: "Error in the deleting todo controller"
        });
    }
}