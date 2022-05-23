
import { useState } from "react";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import {storage} from "./firebase";

function UploadImage() {
  const [images, setImages] = useState([]);
  const [urls, setUrls] = useState([]);
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      newImage["id"] = Math.random();
      setImages((prevState) => [...prevState, newImage]);
    }
    const promises = [];
    images.map((file) => {
      if (!file) return;
          const sotrageRef = ref(storage, `files/${file.name}`);
          const uploadTask = uploadBytesResumable(sotrageRef, file);
      
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const prog = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );
              setProgress(prog);
            },
            (error) => console.log(error),
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log("File available at", downloadURL);
              });
            }
          );
    });

    Promise.all(promises)
      .then(() => alert("All images uploaded"))
      .catch((err) => console.log(err));
  };

  const handleUpload = () => {
    
  };

  console.log("images: ", images);
  console.log("urls", urls);

  return (
    <div>
      <input type="file" multiple onChange={handleChange} />
  
    </div>
  );
  
}

export default UploadImage;   
// const [progress, setProgress] = useState(0);
 
//   // change when submited
//   const formHandler = (e) => {
//       e.preventDefault();
//       const file = e.target[0].files[0];
//       uploadFiles(file); 
//   };

//   // uploading images
//   const uploadFiles = (file) => {
//     //
//     if (!file) return;
//     const sotrageRef = ref(storage, `files/${file.name}`);
//     const uploadTask = uploadBytesResumable(sotrageRef, file);

//     uploadTask.on(
//       "state_changed",
//       (snapshot) => {
//         const prog = Math.round(
//           (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//         );
//         setProgress(prog);
//       },
//       (error) => console.log(error),
//       () => {
//         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//           console.log("File available at", downloadURL);
//         });
//       }
//     );
//   };

//   return (
//     <div className="App">
//       <form onSubmit={formHandler}>
//         <input type="file" multiple className="input" />
//         <button type="submit">Upload</button>
//       </form>
//       <hr />
//       <h2>Uploading done {progress}%</h2>
//     </div>
//   );