import { useState } from "react";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import folderpic from "./pngegg.png";
import cloud from "./clouds3.png";
import filepic from "./file.png";
import bucket from "./bucket.png";
function UploadFile() {
  const [file, updateFile] = useState(null);
  const client = new S3Client({
    region: "us-east-1",
    credentials: {
      accessKeyId:'AKIA6HM2F4C6B7OOU3K6',//place access key
      secretAccessKey: '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',//place secret access key
    },
  });
  const uploadFile = async () => {
    if (file == null) alert("choose file to upload");
    else {
      document.getElementById("upanime").style.display = "flex";
      let count = 0,
        total = file.target.files.length;
      for (let i = 0; i < file.target.files.length; i++) {
        const command = new PutObjectCommand({
          Bucket: "s3-crud-operations",
          Key: file.target.files[i].name,
          Body: file.target.files[i],
        });
        try {
          await client.send(command);
          count++;
        } catch (err) {
          console.error(err);
        }
      }
      updateFile(null);
      setTimeout(()=>alert(count + " out of " + total + " uploaded"),3500);
      setTimeout(()=>{
        document.getElementById("upanime").style.display = "none";
        document.getElementById("upfile").value = "";
      },3000);
    }
  };
  return (
    <div id="part1">
      <input type="file" id="upfile" multiple onChange={(e) => updateFile(e)} />
      <button id="upbtn" onClick={uploadFile}>
        <b>Upload</b>
      </button>
      <div id="upanime">
        <img src={folderpic} alt="" height={100} id="folder" />
        <img src={filepic} alt="" height={60} id="file" />
        <img src={cloud} alt="" height={100} id="cloud" />
        <img src={bucket} alt="" height={100} id="bucket" />
      </div>
    </div>
  );
}
export default UploadFile;
