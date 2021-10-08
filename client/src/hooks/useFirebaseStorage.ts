/*
 * File: /src/hooks/useFirebaseStorage.ts
 * Project: cm-ecommerce/cm-ecommerce-client
 * Created Date: Monday September 27th 2021
 * Author: Myles Berueda
 * -----
 * Last Modified: Monday September 27th 2021 3:26:14 pm
 * -----
 * Copyright (c) 2021 MylesWritesCode
 * -----
 * HISTORY
 */
import { useState, useEffect } from "react";
import { firebaseStorage } from "@lib/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

type firebaseFileTypes = Blob | Uint8Array | ArrayBuffer;
const useFirebaseStorage = async (file: firebaseFileTypes) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  const storageRef = ref(
    firebaseStorage,
    `${process.env.NEXT_PUBLIC_FIREBASE_IMAGE_BUCKET}/${file}`
  );

  const uploadFile = async (f: firebaseFileTypes) => {
    const uploadTask = uploadBytesResumable(storageRef, f);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

        console.log(`Upload is ${progress}% done`);

        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log(error); // Idk what this looks like yet
      },
      async () => {
        // Upload resolved successfully. Do something.
        setUrl(
          await getDownloadURL(uploadTask.snapshot.ref).then((uri) => {
            console.log(`File available at ${uri}`);
          })
        );
      }
    );

    return { progress, url, error };
  };

  useEffect(() => {
    uploadFile(file);
  }, [file]);
};

export default useFirebaseStorage;