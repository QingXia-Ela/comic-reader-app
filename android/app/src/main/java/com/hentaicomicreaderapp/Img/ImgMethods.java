package com.hentaicomicreaderapp.Img;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileReader;

import javax.annotation.Nonnull;

public class ImgMethods extends ReactContextBaseJavaModule {
    @Nonnull
    @Override
    public String getName() {
        return "ImgMethods";
    }

    @ReactMethod
    public void decryptAndWriteFile(String bufPath, String decryptedImgPath, String key) throws Exception {
        File buf = new File(bufPath);
        File dec = new File(decryptedImgPath);

        BufferedInputStream bis = new BufferedInputStream(new FileInputStream(buf));
        BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream(dec));

        byte[] buffer = new byte[16 * key.length()];

        int len;
        while ((len=bis.read(buffer)) != -1) {
            bos.write(buffer, 0, len);
        }

        bos.close();
        bis.close();
    }
}
