/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";

const getColor = (props) => {
  if (props.isDragAccept) {
    return "#00e676";
  }
  if (props.isDragReject) {
    return "#ff1744";
  }
  if (props.isDragActive) {
    return "#2196f3";
  }
  return "#eeeeee";
};

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${(props) => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
`;

const ListingImageUpload = ({ onDrop }) => {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png",
    maxSize: 2000000,
  });

  return (
    <Container {...getRootProps({ isDragActive, isDragAccept, isDragReject })}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className="my-0 py-4">Drop the files here ...</p>
      ) : (
        <p className="my-0 py-4">
          Drag n drop some files here, or click to select files (Max 2MB per
          file)
        </p>
      )}
    </Container>
  );
};

export default ListingImageUpload;
