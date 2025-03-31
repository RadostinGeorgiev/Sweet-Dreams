import { useState } from "react";
import { FileInput, Image, Group, Text, Button } from "@mantine/core";

export default function ImageUpload() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (selectedFile) => {
    setFile(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = () => {
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      console.log("Файл за качване:", file.name);
      // fetch('/api/upload', { method: 'POST', body: formData })...
    }
  };

  return (
    <div>
      <FileInput
        label="Качи снимка за статията"
        placeholder="Избери файл"
        accept="image/png,image/jpeg,image/webp"
        value={file}
        onChange={handleFileChange}
      />

      {preview && (
        <Group mt="md">
          <Text>Преглед:</Text>
          <Image
            src={preview}
            alt="Preview"
            width={200}
            height={200}
            style={{ objectFit: "cover" }}
          />
        </Group>
      )}

      <Button mt="md" onClick={handleSubmit} disabled={!file}>
        Качи снимката
      </Button>
    </div>
  );
}
