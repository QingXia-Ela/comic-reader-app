package com.hentaicomicreaderapp.Img;

import android.annotation.SuppressLint;
import android.widget.Toast;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.hentaicomicreaderapp.Utils.Decrypt;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileReader;

import javax.annotation.Nonnull;

public class ImgMethods extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;

    public ImgMethods(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    @Nonnull
    @Override
    public String getName() {
        return "ImgMethods";
    }

    @ReactMethod
    public void decryptAndWriteFile(String bufPath, String decryptedImgPath, String key) throws Exception {
        File buf = new File(bufPath);
        File dec = new File(decryptedImgPath);

        FileInputStream fis = new FileInputStream(buf);
        BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream(dec));


        byte[] res = new byte[(int) buf.length()];
        fis.read(res);

        res = Decrypt.xorDecrypt(res, key);

        bos.write(res);

        bos.close();
        fis.close();
    }
}
