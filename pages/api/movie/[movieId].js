import { ObjectId } from "mongodb";
import clientPromise from "../../../lib/mongodb";

export default async (req, res) => {
    
   try {    
    const id = req.query.movieId;
    const client = await clientPromise;
    const db = client.db("sample_mflix");

    const movies = db.collection("movies");
    const movie = await movies.findOne({ _id:ObjectId(id)});
    if(movie){
        res.json(movie);
    }else{
        res.status(404).json({message: "Movies not found"})
    } 
      } catch (e) {
       console.error(e);
       res.status(500).json({ message: "Internal server error" });  
   }
};