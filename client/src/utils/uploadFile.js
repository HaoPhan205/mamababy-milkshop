
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../config/firebase";

// const storage = getStorage();
const uploadFile = async (file, type) => {
  console.log("config", file);
  const storageRef = ref(storage, `${type}/file.name`);
  const response = await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(response.ref);
  return downloadURL;
};

export default uploadFile;
