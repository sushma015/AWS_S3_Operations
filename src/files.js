import { useState, useEffect } from "react";
import {
  DeleteObjectCommand,
  S3Client,
  ListObjectsV2Command,
} from "@aws-sdk/client-s3";
function Files() {
  const client = new S3Client({
    region: "us-east-1",
    credentials: {
      accessKeyId: 'AKIA6HM2F4C6PSM3NZBC',//place access key
      secretAccessKey: '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',//place secret access key
    },
  });
  useEffect(() => {
    refresh();
  });
  const [objects, updateObj] = useState([]);
  async function deleteObj(name) {
    const command = new DeleteObjectCommand({
      Bucket: "s3-crud-operations",
      Key: name,
    });

    try {
      await client.send(command);
      refresh();
    } catch (err) {
      console.error(err);
    }
  }
  const refresh = async () => {
    const command = new ListObjectsV2Command({
      Bucket: "s3-crud-operations",
      MaxKeys: 1000,
    });
    try {
      const { Contents } = await client.send(command);
      updateObj(Contents);
    } catch (err) {
      console.error(err);
    }
  };
  const downloadObj = async (name) => {
    const AWS = require("aws-sdk");
    const s3 = new AWS.S3({
      region: "us-east-1",
      credentials: {
        accessKeyId: 'AKIA6HM2F4C6PSM3NZBC',//place access key
        secretAccessKey: '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',//place secret access key
      },
    });

    const params = {
      Bucket: "s3-crud-operations",
      Key: name,
    };
    try {
      const response = await s3.getObject(params).promise();
      const blob = new Blob([response.Body], {
        type: "application/octet-stream",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = name; 
      link.click();
    } catch (err) {
      console.error("Error downloading object:", err);
    }
  };
  return (
    <div id="part2">
      <img height={25} id="load" onClick={()=>refresh()} alt="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAABWklEQVR4nN2UO0sDQRSFv7hiQEU7f4RiunTWogiKgtik0kIrExGs0wZtrS1EJLU/wsrGVXwhamFpIfiID4yMnIUhmd3sumyTAwPD3nvPuXNn50C3Iw+UgDpwB3wCX8ApsAfMAz2Oumoc8iXgEWh2WJfATAu5+R4KD9i1CE6AVWAMGAEGgSKwAdwq50fEAXmkQED+BqwAuQ7NbAHfjpOFjiUgn4jqogUHcQTy1syXE5BXQ+6mDSVr5rmU5E1Xcl2BNTLClQRGsxJ4ksBwVgKvEuhPweEBx8CRK+hLoJBCoCCOa1fwUMFyCoF1cZh30YY5Bf0QA4sznnNxLLgSeoEHJVRIjrJq78XlxJSM6137uJgEPiRgO6sT20psqCtz9DB4Om1DNbW4HdWsJ+8Dm8A4MAQMaG+ILyy73klgMX+Ytvw+at0As/wTfSo2v90Z8Ay8yFb2gcWoC+0O/AKZeHn/6fR9hAAAAABJRU5ErkJggg=="></img>
      <table id="s3table" cellSpacing={0}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Size (Bytes)</th>
            <th>Delete</th>
            <th>Download</th>
          </tr>
        </thead>
        <tbody>
          {!objects && (
            <tr>
              <td colSpan={4} id="notfound">
                No files found
              </td>
            </tr>
          )}
          {objects &&
            objects.map((obj) => (
              <tr key={obj.Key}>
                <td>{obj.Key}</td>
                <td>{obj.Size}</td>
                <td>
                  <button id="delbtn" onClick={() => deleteObj(obj.Key)}>
                    <img
                      height={35}
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAABeklEQVR4nO2WvU6EQBSF73vYGgv3BSwYxVJLzRaa8AZKZ6Uka2GyT2CjjaUxvpTbauI2CxLgGEbRLMKwBIYZN/ckp2KK8839YYhYLBarEARNIAgNntI/Dg8jEPD3D+G7M/guBvIMZ7sHPQIMGh7S5+5LnwAwYWKAkloMaSeTLjGA4Ap0E7eQ4BbqprVvoczbRh9nyARAchcgjkKk16e1Z9KrY8ThAsnDjV0ASR4+jr9cA1GEL86pIGhIgMwbLQWTDhdIg/Fv+GBceSbzRuYBZMDLo78BvytRvvmfb5MTOyqghohk2DbhYXILVUK0DA/Tr1EJUb713B/RSuFhHCDv+ToAxYqFDQCVA1sx2FYCpJXbpmaIGyBoaADVqlStWNgAsB4/stuLxlVZrkR6H9hRgSWIhj1fQKjCg5/TCq2yw/sw6RIDCK5AN0HQXHsbOfSuD8Ch5wHm4EknwBYcetUY/g17tKkNQELs0AYceuy5neb5zWsPz2KxyDp9AneQb6NeRCEPAAAAAElFTkSuQmCC"
                      alt=""
                    />
                  </button>
                </td>
                <td>
                  <button id="dnldbtn" onClick={() => downloadObj(obj.Key)}>
                    <img
                      height={35}
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAABNklEQVR4nO3WsUoDQRAG4NFYikZvRsFCSOET2FjY+BCpLBSZXUHwGaJtbPMUVhZiYeFM0MJSUPAFBEGwFCWFJ4eNhcScOW53yXww/f47/y0HYIypFDnNhw3EjixAYMlvwISWfIXIAgSW/AZMaMlXiCxAYLaB0GwDoSWxAXTS++ugZQed9OpL0D5tEOt5hYe/hI7M1BcAABYPb+fQ6f3YAVgf53ekCSEsc7+FTl7+H0BecV/XICTysomsH+VvXgaZ1y2IAbHslu49q4eYIOvJ6B+tdiE6nXwanZ6NUJ2L4hWDGNGBzCLr3ZCbfyheL4hZtnezQqxPv3T+ecFfr0IKkK/WkeXtx82/L7FsQErIa5ucfBaTcX8bUkQsx+TkCNKVT32PmUBU8f/+uAMWwNkG8lorZMyE+ALBYbmRGmsCgQAAAABJRU5ErkJggg=="
                      alt="download"
                    />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
export default Files;
