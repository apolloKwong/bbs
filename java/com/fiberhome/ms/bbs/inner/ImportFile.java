package com.fiberhome.ms.bbs.inner;

import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang3.time.DateFormatUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.fiberhome.ms.bbs.entity.Resource;
import com.fiberhome.smartms.upload.MultipartFormData;
import com.fiberhome.smartms.upload.UpLoadStatus;
import com.fiberhome.smartms.upload.impl.BaseUpLoadConsumer;

@Component
public class ImportFile extends BaseUpLoadConsumer<Resource> {
	@Autowired
	private Environment environment;

	@Override
	public String getType() {
		// TODO Auto-generated method stub
		return "File";
	}

	@Override
	protected UpLoadStatus doUpload(MultipartFormData data) throws IOException {

		List<MultipartFile> files = data.getFiles();
		ArrayList<File> batchFiles = new ArrayList<File>(files.size());
		String dirPath = this.getDirPath();
		URL dirUrl = new URL(FilenameUtils.normalize(dirPath));
		File dirFile = FileUtils.toFile(dirUrl);
		dirFile.setReadable(true, false);
		dirFile.setWritable(true, false);
		dirFile.setExecutable(true, false);
		dirFile.mkdirs();
		UpLoadStatus us = new UpLoadStatus();
		try {
			for (MultipartFile multipartFile : files) {			
				String uuid = UUID.randomUUID().toString();
				String fileName = multipartFile.getOriginalFilename();
				int index = fileName.lastIndexOf(".");
				String fileType = fileName.substring(index + 1, fileName.length());
				URL file1 = new URL(dirPath + uuid + "." + fileType);
				File filePath = FileUtils.toFile(file1);
				multipartFile.transferTo(filePath);
				batchFiles.add(filePath);
				us.setEntity(DateFormatUtils.format(new Date(), "yyyy-MM-dd") + "/" + uuid + "." + fileType);
			}
		} catch (Exception arg13) {

			for (File file : batchFiles) {
				file.delete();
			}
			us.setEntity("error|服务器端错误!");
			us.setSucess(false);
			return us;
		}

		us.setSucess(true);
		return us;

	}

	private String getDirPath() {
		String rootPath = "D:/file";
		StringBuilder dirPath = new StringBuilder("file:" + rootPath);
		dirPath.append("/" + DateFormatUtils.format(new Date(), "yyyy-MM-dd")).append("/");
		return dirPath.toString();
	}

}
