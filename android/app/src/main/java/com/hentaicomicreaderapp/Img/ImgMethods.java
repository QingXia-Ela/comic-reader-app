package com.hentaicomicreaderapp.Img;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import javax.annotation.Nonnull;

public class ImgMethods extends ReactContextBaseJavaModule {
    @Nonnull
    @Override
    public String getName() {
        return "ExpensiveTaskThreadPool";
    }

    @ReactMethod
    public void run(Callback task) {

    }
}
