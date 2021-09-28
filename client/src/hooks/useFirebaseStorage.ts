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
import { ref, uploadBytes } from "firebase/storage";

const useFirebaseStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  const storageRef = ref(firebaseStorage, process.env.FIREBASE_IMAGE_BUCKET);
  
  type firebaseFileType = Blob | Uint8Array | ArrayBuffer;
  // Upload the file to firebase
  const uploadFile = async (f: firebaseFileType) => {
    await uploadBytes(storageRef, f).then((snapshot) => {
      console.log(snapshot);
    })
  }

  useEffect(() => {
    uploadFile(file);
  }, [file]);
}