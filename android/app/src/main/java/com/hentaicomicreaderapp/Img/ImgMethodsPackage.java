package com.hentaicomicreaderapp.Img;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.hentaicomicreaderapp.ExpensiveTaskThreadPool;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import javax.annotation.Nonnull;

public class ImgMethodsPackage implements ReactPackage {
    @Nonnull
    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }

    @Nonnull
    @Override
    public List<NativeModule> createNativeModules(
            ReactApplicationContext reactContext
    ) {
        List<NativeModule> modules = new ArrayList<>();

        modules.add(new ExpensiveTaskThreadPool());

        return modules;
    }
}
