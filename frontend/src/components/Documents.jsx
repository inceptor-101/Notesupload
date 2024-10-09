import React, { useEffect, useState } from 'react';

const Documents = ({ data }) => {
  const [documents, setDocuments] = useState(null);
  const [metadatas, setMetadatas] = useState(null);

  useEffect(() => {
    const { documents, metadatas } = data;
    setDocuments(documents[0]);
    setMetadatas(metadatas[0]);
  }, [data]); // Ensure the effect runs when the `data` prop changes

  console.log("Documents:", documents); // Log the documents array
  {metadatas && console.log("metadata:", metadatas)}; // Log the documents array

  return (
    <div>
      {/* Check if `documents` exists and is an array */}
      {documents && documents && Array.isArray(documents) && (
        documents.map((sentence, index) => (
          <p key={index}>{sentence}</p>  // Render each sentence inside documents[0]
        ))
      )}
    </div>
  );
};

export default Documents;
