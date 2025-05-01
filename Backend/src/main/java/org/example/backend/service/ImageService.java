package org.example.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;
@Service
public class ImageService {
    public String saveFile(MultipartFile file) {
        String fileName= UUID.randomUUID()+ "_"+file.getOriginalFilename();
        String uploadDir="assets/";
        File dir=new File(uploadDir);
        if(!dir.exists()){
            dir.mkdirs();
        }
        Path path= Paths.get(uploadDir+fileName);
        try {
            Files.write(path,file.getBytes());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return fileName;
    }

    public boolean deleteFile(String fileName) {
        String pathFile="assets/"+fileName;
        File file=new File(pathFile);
        if(file.exists()){
            return file.delete();
        }
        return false;
    }

}
